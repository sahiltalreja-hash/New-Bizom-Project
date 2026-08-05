// ==========================================================================
// Bizom Help Center — access gate
//
// IMPORTANT: this is a CLIENT-SIDE gate only. This site has no backend, so
// the credentials below ship inside this file and are visible to anyone who
// opens browser dev tools or view-source. It stops casual/unintended access
// (a shared link, a search-engine crawl, a stray click) — it will NOT stop
// someone who deliberately inspects the page. Don't rely on it to protect
// genuinely sensitive data. If this site ever moves to a real server, swap
// this for server-side auth (e.g. HTTP Basic Auth via .htaccess).
//
// ROLES: "admin" (can manage users from admin.html), "mobisy" (internal
// team), "customer" (client access). Only "admin" sees the Admin link.
//
// ADDING USERS: the easiest way is to log in as an admin and use
// admin.html — but since there's no shared server, a user added there only
// exists in that one browser until you download the updated file it
// generates (from admin.html) and commit/push it. To add someone
// permanently up front instead, just add a line to SEED_USERS below.
// ==========================================================================

const SEED_USERS = {
  "admin": { password: "AdminChangeMe123", role: "admin" },
  "demo": { password: "ChangeMe123", role: "customer" },
  // "clientname": { password: "theirpassword", role: "customer" },
};

const AUTH_KEY = "bizom_help_center_auth";
const AUTH_USER_KEY = "bizom_help_center_auth_user";
const AUTH_ROLE_KEY = "bizom_help_center_auth_role";
const CUSTOM_USERS_KEY = "bizom_help_center_custom_users";

const ROLE_LABELS = { admin: "Admin", mobisy: "Mobisy", customer: "Customer" };

function getCustomUsers() {
  try {
    return JSON.parse(window.localStorage.getItem(CUSTOM_USERS_KEY) || "{}");
  } catch (e) {
    return {};
  }
}

function setCustomUsers(obj) {
  window.localStorage.setItem(CUSTOM_USERS_KEY, JSON.stringify(obj));
}

// Users added via admin.html override a seed user of the same name, so an
// admin can "edit" a seed user locally without touching this file.
function getAllUsers() {
  return Object.assign({}, SEED_USERS, getCustomUsers());
}

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

function setAuthed(username, role) {
  window.localStorage.setItem(AUTH_KEY, "1");
  window.localStorage.setItem(AUTH_USER_KEY, username);
  window.localStorage.setItem(AUTH_ROLE_KEY, role);
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

function scriptUrl() {
  return location.pathname.includes("/guides/") ? "../js/auth-guard.js" : "js/auth-guard.js";
}

// ---------------- Public API used by login.html / admin.html / main.js ----

window.bizomIsAdmin = function () {
  return isAuthed() && currentRole() === "admin";
};

window.bizomCurrentUser = function () {
  return { username: currentUsername(), role: currentRole() };
};

window.bizomLogout = function () {
  try {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
    window.localStorage.removeItem(AUTH_ROLE_KEY);
  } catch (e) {}
  window.location.href = loginUrl();
};

window.bizomTryLogin = function (username, password) {
  const users = getAllUsers();
  const u = users[username];
  if (u && u.password === password) {
    setAuthed(username, u.role || "customer");
    return true;
  }
  return false;
};

// Redirects away from admin.html if the current user isn't an admin. Call
// this at the top of any admin-only page, after auth-guard.js has loaded.
window.bizomRequireAdmin = function () {
  if (!isAuthed()) return; // runGuard() below already sends them to login
  if (currentRole() !== "admin") {
    window.location.replace(homeUrl());
  }
};

window.bizomListUsers = function () {
  const seed = SEED_USERS;
  const custom = getCustomUsers();
  const all = getAllUsers();
  return Object.keys(all)
    .sort()
    .map(function (username) {
      return {
        username: username,
        role: all[username].role || "customer",
        roleLabel: ROLE_LABELS[all[username].role] || all[username].role,
        isSeed: Object.prototype.hasOwnProperty.call(seed, username),
        isCustom: Object.prototype.hasOwnProperty.call(custom, username),
      };
    });
};

window.bizomAddUser = function (username, password, role) {
  username = (username || "").trim();
  password = (password || "").trim();
  if (!username || !password) return { ok: false, error: "Username and password are both required." };
  if (!ROLE_LABELS[role]) return { ok: false, error: "Pick a valid role." };
  if (getAllUsers()[username]) return { ok: false, error: "That username already exists." };
  const custom = getCustomUsers();
  custom[username] = { password: password, role: role };
  setCustomUsers(custom);
  return { ok: true };
};

window.bizomRemoveUser = function (username) {
  if (Object.prototype.hasOwnProperty.call(SEED_USERS, username)) {
    return { ok: false, error: "This user ships with the site (in auth-guard.js) — remove it there, then commit, to delete it for everyone." };
  }
  const custom = getCustomUsers();
  if (!Object.prototype.hasOwnProperty.call(custom, username)) {
    return { ok: false, error: "User not found." };
  }
  delete custom[username];
  setCustomUsers(custom);
  return { ok: true };
};

// Fetches this very file's own live source, swaps the SEED_USERS block for
// one that includes every current user (seed + anyone added on this
// browser), and returns the full replacement file as text. Downloading it
// over js/auth-guard.js — then committing and pushing — is what makes new
// users work on other laptops/browsers, since there's no shared server to
// sync localStorage across devices.
window.bizomExportAuthGuardFile = async function () {
  const resp = await fetch(scriptUrl(), { cache: "no-store" });
  const source = await resp.text();

  const all = getAllUsers();
  const lines = Object.keys(all)
    .sort()
    .map(function (username) {
      const u = all[username];
      const uname = username.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const pwd = String(u.password).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '  "' + uname + '": { password: "' + pwd + '", role: "' + u.role + '" },';
    });
  const block = "const SEED_USERS = {\n" + lines.join("\n") + "\n};";

  return source.replace(/const SEED_USERS = \{[\s\S]*?\n\};/, block);
};

// ---------------- Guard: redirect immediately if not authenticated --------
function runGuard() {
  if (isLoginPage()) return;
  if (!isAuthed()) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    window.location.replace(loginUrl() + "?next=" + next);
  }
}
runGuard();

// Re-check on bfcache restore (e.g. clicking "back" after logging out) —
// a restored page doesn't re-run scripts on its own, so without this a
// logged-out user could hit "back" and briefly see cached protected content.
window.addEventListener("pageshow", function (e) {
  if (e.persisted) runGuard();
});
