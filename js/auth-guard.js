// ==========================================================================
// Bizom Help Center — access gate (Supabase-backed)
//
// Real authentication: usernames map to a placeholder email
// (<username>@bizom.local) and sign in via Supabase Auth. Roles live in a
// `profiles` table, protected by Row Level Security. Admin-only actions
// (create user, reset password, remove user) go through the "manage-users"
// Edge Function, which holds the service-role key server-side — that key
// never reaches the browser.
//
// The anon key below is PUBLIC by design (like a Firebase config) — it can
// only do what Row Level Security allows. It is not a secret.
//
// SYNC CACHE: isAuthed()/currentRole()/currentUsername()/bizomGetSettings()
// read from a local cache (localStorage) so page guards + nav rendering can
// stay synchronous, exactly like before. The cache is populated on login
// and kept honest by a background revalidation against the real Supabase
// session/settings on every page load — if it's ever stale, this self-heals
// within moments (logged out locally if the real session is gone, nav
// re-rendered if a site setting changed elsewhere). The cache is a UX
// convenience only; real enforcement is Supabase RLS + the Edge Function.
//
// ROLES: "admin" (can manage users from admin.html), "mobisy" (internal
// team), "customer" (client access). Only "admin" sees the Admin link.
// ==========================================================================

const SUPABASE_URL = "https://zgkphsemuunmwjdjvrle.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpna3Boc2VtdXVubXdqZGp2cmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDM4MjgsImV4cCI6MjEwMTUxOTgyOH0.QSsSpz6XYcSC_oh7iZ1OJeSBfimGh0jZcY0lMxvBvhY";
const EMAIL_DOMAIN = "bizom.local";

const AUTH_KEY = "bizom_help_center_auth";
const AUTH_USER_KEY = "bizom_help_center_auth_user";
const AUTH_ROLE_KEY = "bizom_help_center_auth_role";
const SETTINGS_CACHE_KEY = "bizom_help_center_settings_cache";

const ROLE_LABELS = { admin: "Admin", mobisy: "Mobisy", customer: "Customer" };

// ---------------- Supabase client (loaded on demand, non-blocking) --------
let supabaseClientPromise = null;
function getSupabaseClient() {
  if (supabaseClientPromise) return supabaseClientPromise;
  supabaseClientPromise = new Promise(function (resolve, reject) {
    if (window.supabase && window.supabase.createClient) {
      resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
    script.onload = function () {
      resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
    };
    script.onerror = function () {
      reject(new Error("Couldn't load the Supabase client library."));
    };
    document.head.appendChild(script);
  });
  return supabaseClientPromise;
}

function emailFor(username) {
  const slug = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return slug + "@" + EMAIL_DOMAIN;
}

// ---------------- Sync cache (backs isAuthed/currentRole/etc.) ------------
function isAuthed() {
  try {
    return window.localStorage.getItem(AUTH_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function currentRole() {
  return window.localStorage.getItem(AUTH_ROLE_KEY) || "";
}

function currentUsername() {
  return window.localStorage.getItem(AUTH_USER_KEY) || "";
}

function setCachedAuth(username, role) {
  window.localStorage.setItem(AUTH_KEY, "1");
  window.localStorage.setItem(AUTH_USER_KEY, username);
  window.localStorage.setItem(AUTH_ROLE_KEY, role);
}

function clearCachedAuth() {
  window.localStorage.removeItem(AUTH_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
  window.localStorage.removeItem(AUTH_ROLE_KEY);
}

function getCachedSettings() {
  try {
    return JSON.parse(window.localStorage.getItem(SETTINGS_CACHE_KEY) || "{}");
  } catch (e) {
    return {};
  }
}

function setCachedSettings(obj) {
  window.localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(obj));
}

function isLoginPage() {
  return /\/?login\.html$/.test(location.pathname);
}

function loginUrl() {
  return location.pathname.includes("/guides/") ? "../login.html" : "login.html";
}

function homeUrl() {
  return location.pathname.includes("/guides/") ? "../index.html" : "index.html";
}

// ---------------- Public API used by login.html / admin.html / main.js ----

window.bizomIsAdmin = function () {
  return isAuthed() && currentRole() === "admin";
};

window.bizomCurrentUser = function () {
  return { username: currentUsername(), role: currentRole() };
};

window.bizomGetSettings = function () {
  const cached = getCachedSettings();
  return { caseStudiesVisibility: cached.caseStudiesVisibility || "admin" };
};

window.bizomLogout = async function () {
  clearCachedAuth();
  try {
    const client = await getSupabaseClient();
    await client.auth.signOut();
  } catch (e) {
    // best-effort — local cache is already cleared either way
  }
  window.location.href = loginUrl();
};

window.bizomTryLogin = async function (username, password) {
  try {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: emailFor(username),
      password: password,
    });
    if (error || !data.session) return false;

    const { data: prof, error: profErr } = await client
      .from("profiles")
      .select("username, role")
      .eq("id", data.user.id)
      .maybeSingle();
    if (profErr || !prof) {
      await client.auth.signOut();
      return false;
    }
    setCachedAuth(prof.username, prof.role);
    return true;
  } catch (e) {
    return false;
  }
};

// Redirects away from admin.html if the current user isn't an admin. Call
// this at the top of any admin-only page, after auth-guard.js has loaded.
window.bizomRequireAdmin = function () {
  if (!isAuthed()) return; // runGuard() below already sends them to login
  if (currentRole() !== "admin") {
    window.location.replace(homeUrl());
  }
};

// Redirects away from case-studies.html unless the visitor is allowed to
// see it: admins can always reach it, everyone else only when the site
// setting is "public".
window.bizomRequireCaseStudiesAccess = function () {
  if (!isAuthed()) return;
  if (currentRole() === "admin") return;
  const settings = window.bizomGetSettings();
  if (settings.caseStudiesVisibility !== "public") {
    window.location.replace(homeUrl());
  }
};

// Site settings are admin-only to change; enforced server-side by RLS too.
// Supabase's update() doesn't error when RLS silently filters out every row
// (it just affects zero rows) — check the returned row, not just `error`,
// or a non-admin's blocked write would look like a success here.
window.bizomSetSettings = async function (partial) {
  const client = await getSupabaseClient();
  const updates = {};
  if (partial.caseStudiesVisibility) updates.case_studies_visibility = partial.caseStudiesVisibility;
  const { data, error } = await client.from("site_settings").update(updates).eq("id", 1).select();
  if (error) throw new Error(error.message);
  if (!data || !data.length) throw new Error("Only an admin can change site settings.");
  setCachedSettings(Object.assign({}, getCachedSettings(), partial));
};

window.bizomListUsers = async function () {
  const client = await getSupabaseClient();
  const { data, error } = await client.from("profiles").select("username, role").order("username");
  if (error) throw new Error(error.message);
  return data.map(function (u) {
    return { username: u.username, role: u.role, roleLabel: ROLE_LABELS[u.role] || u.role };
  });
};

async function callManageUsers(action, payload) {
  const client = await getSupabaseClient();
  const { data: sessionData } = await client.auth.getSession();
  const token = sessionData && sessionData.session ? sessionData.session.access_token : "";
  const resp = await fetch(SUPABASE_URL + "/functions/v1/manage-users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(Object.assign({ action: action }, payload)),
  });
  const result = await resp.json().catch(function () { return {}; });
  if (!resp.ok || !result.ok) throw new Error(result.error || "Request failed.");
  return result;
}

window.bizomAddUser = async function (username, password, role) {
  username = (username || "").trim();
  password = (password || "").trim();
  if (!username || !password) return { ok: false, error: "Username and password are both required." };
  if (!ROLE_LABELS[role]) return { ok: false, error: "Pick a valid role." };
  try {
    await callManageUsers("create", { username: username, password: password, role: role });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

// Changes a user's password and/or role. Role changes go straight to the
// profiles table (RLS allows admins to update any row); password resets go
// through the Edge Function since only the Auth Admin API can do that.
window.bizomUpdateUser = async function (username, newPassword, newRole) {
  try {
    if (newRole) {
      const client = await getSupabaseClient();
      // .select() so a blocked RLS write (0 rows, no error) is distinguishable
      // from a real success — otherwise a non-admin's no-op looks like a win.
      const { data, error } = await client.from("profiles").update({ role: newRole }).eq("username", username).select();
      if (error) throw new Error(error.message);
      if (!data || !data.length) throw new Error("Only an admin can change roles.");
    }
    const password = (newPassword || "").trim();
    if (password) {
      await callManageUsers("reset_password", { username: username, password: password });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

window.bizomRemoveUser = async function (username) {
  try {
    await callManageUsers("delete", { username: username });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

// ---------------- Guard: redirect immediately if not authenticated --------
function runGuard() {
  if (isLoginPage()) return;
  if (!isAuthed()) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    window.location.replace(loginUrl() + "?next=" + next);
    return;
  }
  // Background: keep the local cache honest against the real session/settings.
  // Runs after the synchronous redirect decision above so it never delays it.
  revalidateSession();
  refreshSettingsCache();
}
runGuard();

async function revalidateSession() {
  try {
    const client = await getSupabaseClient();
    const { data } = await client.auth.getSession();
    if (!data.session) {
      clearCachedAuth();
      if (!isLoginPage()) {
        const next = encodeURIComponent(location.pathname + location.search + location.hash);
        window.location.replace(loginUrl() + "?next=" + next);
      }
    }
  } catch (e) {
    // offline or CDN blocked — leave the cached (optimistic) state as-is
  }
}

async function refreshSettingsCache() {
  try {
    const client = await getSupabaseClient();
    const { data, error } = await client.from("site_settings").select("case_studies_visibility").eq("id", 1).maybeSingle();
    if (!error && data) {
      const before = JSON.stringify(getCachedSettings());
      const fresh = { caseStudiesVisibility: data.case_studies_visibility };
      setCachedSettings(fresh);
      if (JSON.stringify(fresh) !== before) {
        if (window.renderMainNav) window.renderMainNav();
        if (window.initCaseStudiesCarousel) window.initCaseStudiesCarousel();
      }
    }
  } catch (e) {
    // leave the cached value in place
  }
}

// Re-check on bfcache restore (e.g. clicking "back" after logging out) —
// a restored page doesn't re-run scripts on its own, so without this a
// logged-out user could hit "back" and briefly see cached protected content.
window.addEventListener("pageshow", function (e) {
  if (e.persisted) runGuard();
});
