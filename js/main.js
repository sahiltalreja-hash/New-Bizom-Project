// ==========================================================================
// Bizom Help Center — shared behaviour + nav data model
//
// Adding a new guide? Add ONE entry to GUIDES below (and optionally a
// RELATED_GUIDES / SEARCH_INDEX entry). The header mega-menu, the guide
// sidebar, the homepage directory and search all render from this single
// source of truth — no per-page HTML edits needed.
// ==========================================================================

const CATEGORY_ORDER = [
  "Outlets & Geography",
  "Product & Master Data",
  "Sales & Field Force",
  "Distribution & Inventory",
  "Schemes & Promotions",
  "Reports & Analytics",
];

const GUIDES = [
  { id: "outlet-management", title: "Outlet Management", url: "guides/outlet-management.html", category: "Outlets & Geography", desc: "Add & edit outlets via app, web and MDM." },
  { id: "distributor-warehouse", title: "Distributor & Warehouse", url: "guides/distributor-warehouse.html", category: "Outlets & Geography", desc: "Create distributors and warehouses." },
  { id: "geography-master", title: "Zones, Cities, States & Districts", url: "guides/geography-master.html", category: "Outlets & Geography", desc: "The location masters everything else maps to." },
  { id: "area-creation", title: "Area Creation & Assigning", url: "guides/area-creation.html", category: "Outlets & Geography", desc: "Set up zones, subzones and areas." },
  { id: "beat-creation", title: "Beat Creation & Assigning", url: "guides/beat-creation.html", category: "Outlets & Geography", desc: "Build sales routes and map them to areas." },
  { id: "outlet-categories", title: "Outlet Categories", url: "guides/outlet-categories.html", category: "Outlets & Geography", desc: "Classify outlets by business type." },

  { id: "sku-management", title: "SKU Upload & Update", url: "guides/sku-management.html", category: "Product & Master Data", desc: "Add, edit and price SKUs." },
  { id: "sizes-variants-categories", title: "Sizes, Variants & Categories", url: "guides/sizes-variants-categories.html", category: "Product & Master Data", desc: "Core product master attributes." },
  { id: "designations", title: "Designations", url: "guides/designations.html", category: "Product & Master Data", desc: "Job titles like TSI, ASM, RSM." },
  { id: "user-management", title: "User Creation & Update", url: "guides/user-management.html", category: "Product & Master Data", desc: "Add field reps, managers & admins." },
  { id: "user-workflows", title: "User Workflows", url: "guides/user-workflows.html", category: "Product & Master Data", desc: "Platform-level feature toggles per user." },

  { id: "attendance", title: "Attendance & Shift Timing", url: "guides/attendance.html", category: "Sales & Field Force", desc: "Configure login/logout windows." },
  { id: "pjp", title: "PJP — Journey Planning", url: "guides/pjp.html", category: "Sales & Field Force", desc: "Pre-defined outlet visit schedules." },
  { id: "user-targets", title: "User Targets", url: "guides/user-targets.html", category: "Sales & Field Force", desc: "Set and track sales targets per user." },
  { id: "generic-forms", title: "Generic Forms", url: "guides/generic-forms.html", category: "Sales & Field Force", desc: "Custom data-capture forms." },
  { id: "activity-forms", title: "Activity Forms", url: "guides/activity-forms.html", category: "Sales & Field Force", desc: "Capture activities during outlet visits." },
  { id: "pops", title: "POPs (Marketing Collateral)", url: "guides/pops.html", category: "Sales & Field Force", desc: "Push images, videos & PDFs to the app." },

  { id: "inventory", title: "Inventory", url: "guides/inventory.html", category: "Distribution & Inventory", desc: "View stock, pricing, audits & uploads." },
  { id: "grn", title: "GRN (Goods Received Note)", url: "guides/grn.html", category: "Distribution & Inventory", desc: "Approve stock transfers into a warehouse." },
  { id: "sale-returns", title: "Sale Returns", url: "guides/sale-returns.html", category: "Distribution & Inventory", desc: "Primary & secondary return flows." },
  { id: "orders-payments", title: "Orders & Payments", url: "guides/orders-payments.html", category: "Distribution & Inventory", desc: "Manage primary, secondary & direct orders." },

  { id: "schemes", title: "Schemes", url: "guides/schemes.html", category: "Schemes & Promotions", desc: "Quantity, value & multi-slab schemes." },

  { id: "reports-dashboards", title: "Request a Report or Dashboard", url: "guides/reports-dashboards.html", category: "Reports & Analytics", desc: "How to submit an FSD for a new report or dashboard." },
];

const RELATED_GUIDES = {
  "beat-creation": ["pjp", "area-creation", "user-management"],
  "pjp": ["beat-creation", "user-management", "user-targets"],
  "area-creation": ["geography-master", "beat-creation", "distributor-warehouse"],
  "outlet-management": ["outlet-categories", "area-creation", "sku-management"],
  "outlet-categories": ["outlet-management", "sku-management", "schemes"],
  "sku-management": ["sizes-variants-categories", "inventory", "schemes"],
  "sizes-variants-categories": ["sku-management", "inventory"],
  "schemes": ["inventory", "sku-management", "orders-payments"],
  "inventory": ["grn", "sale-returns", "sku-management"],
  "grn": ["inventory", "sale-returns", "distributor-warehouse"],
  "sale-returns": ["grn", "orders-payments", "inventory"],
  "orders-payments": ["sale-returns", "inventory", "schemes"],
  "attendance": ["pjp", "user-management", "generic-forms"],
  "generic-forms": ["activity-forms", "user-management", "pops"],
  "activity-forms": ["generic-forms", "beat-creation", "pjp"],
  "pops": ["generic-forms", "attendance", "activity-forms"],
  "designations": ["user-management", "user-workflows", "attendance"],
  "user-management": ["designations", "user-workflows", "user-targets"],
  "user-workflows": ["user-management", "designations", "attendance"],
  "user-targets": ["user-management", "pjp", "reports-dashboards"],
  "geography-master": ["area-creation", "distributor-warehouse", "beat-creation"],
  "distributor-warehouse": ["geography-master", "area-creation", "inventory"],
  "reports-dashboards": ["user-targets", "inventory", "schemes"],
};

// Fine-grained search entries. Base guide-level entries are generated
// automatically from GUIDES below, so this only needs sub-section entries.
const SEARCH_INDEX_EXTRA = [
  { title: "Outlet Management", section: "Bulk add / update outlets via MDM", url: "guides/outlet-management.html#mdm-outlet", tags: "mdm bulk upload outlet update csv xls", snippet: "Onboarding many outlets at once? Use the Outlets MDM upload instead of adding them one by one on the web." },
  { title: "Distributor & Warehouse", section: "Bulk add / update via MDM", url: "guides/distributor-warehouse.html#mdm-wh", tags: "mdm bulk upload warehouse distributor update", snippet: "Onboarding a whole distribution network at once? Use the Warehouse MDM upload instead of the web form." },
  { title: "Area Creation & Assigning", section: "Area MDM templates", url: "guides/area-creation.html#mdm-area", tags: "mdm bulk area beat mapping transfer", snippet: "Four MDM templates cover everything related to area management — Areas, Area Update, Beat Area Mapping and Transfer Areas." },
  { title: "Beat Creation & Assigning", section: "Beat MDM templates", url: "guides/beat-creation.html#mdm-beat", tags: "mdm bulk beat area mapping", snippet: "Two MDM templates cover beat management: Beats, and Beat Area Mapping." },
  { title: "Beat Creation & Assigning", section: "Assigning beats to users", url: "guides/beat-creation.html#assign-beats", tags: "assign beat user pjp outlet mapping", snippet: "Creating a beat is only half the job — it needs outlets mapped to it, and a salesperson assigned to cover it." },
  { title: "Schemes", section: "Quantity based schemes", url: "guides/schemes.html#quantity-schemes", tags: "quantity scheme free sku cash discount", snippet: "Quantity based schemes trigger a benefit once a certain number of units is purchased — Free SKU, Free Cash and Discount (%) schemes." },
  { title: "Schemes", section: "Value based schemes", url: "guides/schemes.html#value-schemes", tags: "value scheme amount purchase free sku", snippet: "Value based schemes work the same way as quantity based schemes, except eligibility is based on order value." },
  { title: "Schemes", section: "Multi / slab schemes", url: "guides/schemes.html#multi-schemes", tags: "multi scheme slab benefit", snippet: "Multi schemes let you configure several purchase slabs with different benefits under one scheme." },
  { title: "Schemes", section: "Assigning schemes", url: "guides/schemes.html#assign-schemes", tags: "assign scheme warehouse distributor outlet zone", snippet: "A scheme isn't visible to anyone until you assign it to a warehouse, distributor or outlet." },
  { title: "Schemes", section: "Scheme MDM templates", url: "guides/schemes.html#mdm-schemes", tags: "mdm bulk scheme upload holder budget", snippet: "Setting up dozens of schemes at once? Four MDM templates cover bulk scheme management." },
  { title: "Inventory", section: "Depot wise price upload", url: "guides/inventory.html#depot-price", tags: "depot price mrp vat mdm", snippet: "Set a different MRP, price and VAT for the same SKU across different warehouses or distributors." },
  { title: "Inventory", section: "Inventory audit", url: "guides/inventory.html#inventory-audit", tags: "audit closing stock current incoming outgoing", snippet: "Inventory audit reconciles what Bizom shows against physical stock, at the current, incoming, outgoing and closing levels." },
  { title: "Inventory", section: "Adding inventory", url: "guides/inventory.html#add-inventory", tags: "add inventory batch submit invoice", snippet: "Use this when new stock physically arrives and needs to be added against a batch." },
  { title: "Inventory", section: "Bulk inventory upload via MDM", url: "guides/inventory.html#mdm-inventory", tags: "mdm bulk inventory upload warehouse", snippet: "For onboarding stock across many SKUs and warehouses at once, use the Inventory MDM upload." },
  { title: "SKU Upload & Update", section: "Bulk upload SKUs via MDM", url: "guides/sku-management.html#bulk-sku", tags: "mdm bulk sku upload skunits", snippet: "Onboarding your full catalogue? Use the SKU MDM instead of adding SKUs one by one." },
  { title: "SKU Upload & Update", section: "Update SKU pricing", url: "guides/sku-management.html#sku-pricing", tags: "mrp landing price focus sku pricing", snippet: "MRP, Landing Price, Min LP, Max LP and the Focus SKU flag are managed separately from the core SKU record, per warehouse." },
  { title: "Outlet Categories", section: "Bulk upload via MDM", url: "guides/outlet-categories.html#mdm-outlet-categories", tags: "mdm bulk outlet category upload", snippet: "Adding several outlet categories at once? Use the MDM upload instead of the web form." },
  { title: "User Creation & Update", section: "Bulk upload via MDM", url: "guides/user-management.html#mdm-users", tags: "mdm bulk user upload", snippet: "Onboarding a whole team at once? Use the Users MDM to create many users in one upload." },
  { title: "PJP — Journey Planning", section: "Bulk upload via MDM", url: "guides/pjp.html#mdm-pjp", tags: "mdm bulk pjp upload journey plan", snippet: "Setting up PJPs for a whole team? Use the PJP MDM instead of creating them one at a time." },
  { title: "PJP — Journey Planning", section: "Create a PJP", url: "guides/pjp.html#create-pjp", tags: "create pjp journey plan schedule beat day", snippet: "Assign beats to specific days of the week or month to build a salesman's journey plan." },
  { title: "Generic Forms", section: "Create a generic form", url: "guides/generic-forms.html#create-generic-form", tags: "create generic form field survey audit", snippet: "A Generic Form captures any type of field data during an outlet visit or a standalone activity — surveys, feedback, audits." },
  { title: "Activity Forms", section: "Create an activity form", url: "guides/activity-forms.html#create-activity-form", tags: "create activity form execution point call", snippet: "An Activity Form is a structured form used to capture specific activities during an outlet visit." },
  { title: "Activity Forms", section: "Activity vs Generic form", url: "guides/activity-forms.html#comparison", tags: "activity form generic form compare difference", snippet: "Activity Forms are tied to an outlet visit and can be made mandatory; Generic Forms are standalone and not enforced." },
  { title: "POPs", section: "Adding a POP", url: "guides/pops.html#adding-pops", tags: "add pop image video pdf hyperlink upload", snippet: "To show up in the app, a POP first needs to be uploaded to the Bizom portal as an image, video, PDF or hyperlink." },
  { title: "POPs", section: "Viewing POPs in the app", url: "guides/pops.html#viewing-pops", tags: "view pop app before after attendance", snippet: "Pops assigned to a level under your company are viewable in the app, either before or after marking attendance." },
  { title: "GRN (Goods Received Note)", section: "GRN approval steps", url: "guides/grn.html#grn-approval", tags: "grn approve transfer pending discard damaged", snippet: "Review SKU quantities for each pending transfer, optionally discard damaged units, then submit for approval." },
  { title: "GRN (Goods Received Note)", section: "Status indicators", url: "guides/grn.html#status-indicators", tags: "grn status yellow red amber green overdue", snippet: "Yellow means pending under 10 days, red means overdue, amber and green ticks show approved GRNs with or without discards." },
  { title: "Sale Returns", section: "Primary vs secondary returns", url: "guides/sale-returns.html#primary-vs-secondary", tags: "primary secondary sale return compare", snippet: "Primary Sale Return flows from distributor to company; Secondary Sale Return flows from retailer to distributor." },
  { title: "Attendance & Shift Timing", section: "Change attendance timing", url: "guides/attendance.html#change-timing", tags: "shift login logout window weekly off", snippet: "Attendance timing is controlled through Shift Timings — configurable differently per role or designation." },
  { title: "Zones, Cities, States & Districts", section: "Zones & Subzones", url: "guides/geography-master.html#zones-subzones", tags: "zone subzone mdm create geography", snippet: "Zones and subzones sit above everything else in the geography hierarchy — warehouses, areas and pricing all map up to them." },
  { title: "Zones, Cities, States & Districts", section: "Cities, States & Districts", url: "guides/geography-master.html#city-state-district", tags: "city state district mdm add create", snippet: "Add cities via /cities, states via /states, and districts via /districts — or upload all three in bulk via MDM." },
  { title: "User Workflows", section: "Master User Workflows", url: "guides/user-workflows.html#what-are-workflows", tags: "workflow feature toggle attendance sale order claims", snippet: "Master User Workflows are platform-level feature toggles that control which features are available across the system." },
  { title: "User Workflows", section: "Update workflows via MDM", url: "guides/user-workflows.html#mdm-workflows", tags: "mdm bulk workflow update user id", snippet: "Enter the User ID and set 1 against the workflow column to switch a feature on for that user." },
  { title: "User Targets", section: "Setting a new target", url: "guides/user-targets.html#new-target", tags: "target new sku quantity user set", snippet: "Targets can be set for users for a given period to improve their sales performance." },
  { title: "User Targets", section: "Target Achievement", url: "guides/user-targets.html#target-achievement", tags: "target achievement view date range", snippet: "Targets achieved by a user, after sale or fulfilment of orders, can be viewed from Target Achievement." },
  { title: "User Targets", section: "Bulk upload via MDM", url: "guides/user-targets.html#mdm-targets", tags: "mdm bulk target upload user sku", snippet: "Set targets for many users and SKUs at once via the User Targets MDM." },
  { title: "Request a Report or Dashboard", section: "Submitting an FSD", url: "guides/reports-dashboards.html#submit-fsd", tags: "fsd report dashboard request new test cases", snippet: "Raise a request by submitting the required details in the attached FSD format along with test cases." },
];

document.addEventListener("DOMContentLoaded", () => {
  renderMainNav();
  renderSidebar();
  renderRelatedGuides();
  renderDirectory();
  initGuidesDropdown();
  initSidebarCategories();
  initNavToggle();
  initReadingProgress();
  initSearch("header-search-input", "header-search-panel");
  initSearch("hero-search-input", "hero-search-panel");
  initHeroSearchButton();
  initLightbox();
  initScrollspy();
  initHelpfulBox();
  initBackToTop();
  initSearchResultsPage();
  initLogout();
});

function isGuidePage() {
  return location.pathname.includes("/guides/");
}

function resolveUrl(url) {
  if (isGuidePage()) {
    return url.startsWith("guides/") ? url.replace("guides/", "") : "../" + url;
  }
  return url;
}

function guideRelativeHref(url) {
  return url.replace(/^guides\//, "");
}

function currentGuideId() {
  return document.body.getAttribute("data-guide") || "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------------- Header mega menu ----------------
function renderMainNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  const current = currentGuideId();

  const cols = CATEGORY_ORDER.map(cat => {
    const items = GUIDES.filter(g => g.category === cat);
    const links = items.map(g =>
      `<a href="${resolveUrl(g.url)}"${g.id === current ? ' class="active"' : ''}>${escapeHtml(g.title)}</a>`
    ).join("");
    return `<div class="mega-col"><h5>${escapeHtml(cat)}</h5>${links}</div>`;
  }).join("");

  const isAdminPage = /\/?admin\.html$/.test(location.pathname);
  const isCaseStudiesPage = /\/?case-studies\.html$/.test(location.pathname);
  const showAdminNavItems = !!(window.bizomIsAdmin && window.bizomIsAdmin());
  const caseStudiesLink = showAdminNavItems
    ? `<a href="${resolveUrl("case-studies.html")}"${isCaseStudiesPage ? ' class="active"' : ""}>Case Studies</a>`
    : "";
  const adminLink = showAdminNavItems
    ? `<a href="${resolveUrl("admin.html")}"${isAdminPage ? ' class="active"' : ""}>Admin</a>`
    : "";

  nav.innerHTML = `
    <a href="${resolveUrl("index.html")}"${isGuidePage() || isAdminPage || isCaseStudiesPage ? "" : ' class="active"'}>Home</a>
    <div class="nav-item">
      <button type="button" class="nav-trigger" id="guides-trigger">
        Guides
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="mega-menu" id="guides-menu">
        ${cols}
        <div class="mega-menu-footer">
          <span>${GUIDES.length} guides and counting</span>
          <a href="mailto:sahil.talreja@mobisy.com">Request a guide →</a>
        </div>
      </div>
    </div>
    ${caseStudiesLink}
    ${adminLink}
  `;
}

function initGuidesDropdown() {
  const trigger = document.getElementById("guides-trigger");
  const menu = document.getElementById("guides-menu");
  if (!trigger || !menu) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("open");
    trigger.classList.toggle("open", open);
  });
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== trigger) {
      menu.classList.remove("open");
      trigger.classList.remove("open");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("open");
      trigger.classList.remove("open");
    }
  });
}

function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    if (open) {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
      nav.style.cssText += "position:absolute;top:var(--header-h);left:0;right:0;flex-direction:column;background:#fff;padding:16px;border-bottom:1px solid var(--border);align-items:flex-start;max-height:calc(100vh - var(--header-h));overflow-y:auto;";
    }
  });
}

// ---------------- Guide sidebar (collapsible categories) ----------------
function renderSidebar() {
  const container = document.getElementById("sidebar-nav-container");
  if (!container) return;
  const current = currentGuideId();

  container.innerHTML = CATEGORY_ORDER.map(cat => {
    const items = GUIDES.filter(g => g.category === cat);
    const containsCurrent = items.some(g => g.id === current);
    const links = items.map(g =>
      `<a href="${guideRelativeHref(g.url)}"${g.id === current ? ' class="active"' : ''}><span class="dot"></span>${escapeHtml(g.title)}</a>`
    ).join("");
    return `
      <div class="sidebar-category${containsCurrent ? " open" : ""}">
        <button type="button" class="sidebar-category-title">
          <span>${escapeHtml(cat)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>
        <div class="sidebar-category-items sidebar-nav">${links}</div>
      </div>`;
  }).join("");
}

function initSidebarCategories() {
  document.querySelectorAll(".sidebar-category-title").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".sidebar-category").classList.toggle("open");
    });
  });
}

// ---------------- Related guides ----------------
function renderRelatedGuides() {
  const container = document.getElementById("related-guides");
  if (!container) return;
  const current = currentGuideId();
  if (!current) return;

  let relatedIds = RELATED_GUIDES[current] || [];
  if (!relatedIds.length) {
    const me = GUIDES.find(g => g.id === current);
    if (me) {
      relatedIds = GUIDES.filter(g => g.category === me.category && g.id !== me.id).slice(0, 3).map(g => g.id);
    }
  }

  const cards = relatedIds.slice(0, 3).map(id => {
    const g = GUIDES.find(x => x.id === id);
    if (!g) return "";
    return `
      <a class="related-card" href="${guideRelativeHref(g.url)}">
        <span class="cat">${escapeHtml(g.category)}</span>
        <h4>${escapeHtml(g.title)}</h4>
        <p style="margin:0;font-size:13.5px;">${escapeHtml(g.desc)}</p>
        <span class="arrow-row">Read guide <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
      </a>`;
  }).join("");

  if (!cards) return;
  container.innerHTML = `<div class="related-guides"><h3>You might also need</h3><div class="related-grid">${cards}</div></div>`;
}

// ---------------- Homepage full directory ----------------
const CATEGORY_ACCENTS = {
  "Outlets & Geography": "var(--blue)",
  "Product & Master Data": "var(--indigo)",
  "Sales & Field Force": "var(--violet)",
  "Distribution & Inventory": "var(--sky)",
  "Schemes & Promotions": "#0f9c7d",
  "Reports & Analytics": "#b38f00",
};

function renderDirectory() {
  const container = document.getElementById("guide-directory");
  if (!container) return;

  container.innerHTML = CATEGORY_ORDER.map(cat => {
    const items = GUIDES.filter(g => g.category === cat);
    const links = items.map(g => `
      <a href="${g.url}">
        ${escapeHtml(g.title)}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>`).join("");
    return `
      <div class="directory-card">
        <h3><span class="swatch" style="background:${CATEGORY_ACCENTS[cat] || "var(--indigo)"}"></span>${escapeHtml(cat)}</h3>
        <ul>${links}</ul>
      </div>`;
  }).join("");
}

// ---------------- Reading progress ----------------
function initReadingProgress() {
  const bar = document.querySelector(".reading-progress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = (scrolled || 0) + "%";
  });
}

// ---------------- Search ----------------
function categoryForTitle(title) {
  const g = GUIDES.find(x => x.title === title);
  return g ? g.category : "";
}

function buildSearchIndex() {
  const base = GUIDES.map(g => ({ title: g.title, section: g.title, url: g.url, tags: g.desc + " " + g.category, snippet: g.desc, category: g.category }));
  const extra = SEARCH_INDEX_EXTRA.map(item => ({ ...item, category: categoryForTitle(item.title) }));
  return base.concat(extra);
}
const SEARCH_INDEX = buildSearchIndex();

// Matches if every word in the query appears somewhere in the haystack —
// so "add outlet" matches text containing "Add" ... "outlets" in any order.
function matchesQuery(haystack, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return false;
  const hay = haystack.toLowerCase();
  return words.every(w => hay.includes(w));
}

function searchIndexUrl() {
  return resolveUrl("search.html");
}

function goToSearchPage(query) {
  const q = (query || "").trim();
  if (!q) return;
  window.location.href = searchIndexUrl() + "?q=" + encodeURIComponent(q);
}

function initSearch(inputId, panelId) {
  const input = document.getElementById(inputId);
  const panel = document.getElementById(panelId);
  if (!input || !panel) return;

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) { panel.classList.remove("open"); panel.innerHTML = ""; return; }
    const results = SEARCH_INDEX.filter(item =>
      matchesQuery(item.title + " " + item.section + " " + item.tags, q)
    ).slice(0, 6);

    let html = "";
    if (!results.length) {
      html = '<div class="empty">No results for "' + escapeHtml(query) + '". Try a different term or contact support.</div>';
    } else {
      html = results.map(r =>
        `<a href="${resolveUrl(r.url)}"><b>${escapeHtml(r.section)}</b><span>${escapeHtml(r.title)}</span></a>`
      ).join("");
    }
    html += `<a class="search-panel-viewall" href="${searchIndexUrl()}?q=${encodeURIComponent(query.trim())}">See all results for &ldquo;${escapeHtml(query.trim())}&rdquo; <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></a>`;
    panel.innerHTML = html;
    panel.classList.add("open");
  }

  input.addEventListener("input", (e) => render(e.target.value));
  input.addEventListener("focus", (e) => { if (e.target.value) render(e.target.value); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearchPage(input.value);
    }
  });
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && e.target !== input) panel.classList.remove("open");
  });
}

function initHeroSearchButton() {
  const btn = document.querySelector(".hero-search button");
  const input = document.getElementById("hero-search-input");
  if (!btn || !input) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    goToSearchPage(input.value);
  });
}

// ---------------- Full search results page (search.html) ----------------
function highlightMatch(text, query) {
  const escaped = escapeHtml(text);
  const words = (query || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return escaped;
  const pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  return escaped.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
}

function initSearchResultsPage() {
  const list = document.getElementById("search-results-list");
  if (!list) return;

  const input = document.getElementById("search-page-input");
  const btn = document.getElementById("search-page-btn");
  const meta = document.getElementById("search-meta");
  const filtersEl = document.getElementById("search-filters");

  let activeCategory = "All";

  filtersEl.innerHTML = ["All"].concat(CATEGORY_ORDER).map(cat =>
    `<button type="button" class="filter-chip${cat === "All" ? " active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
  ).join("");

  function runSearch() {
    const query = (input.value || "").trim();
    const q = query.toLowerCase();

    let results = SEARCH_INDEX.filter(item => {
      const isMatch = !q || matchesQuery(item.title + " " + item.section + " " + item.tags + " " + (item.snippet || ""), q);
      const matchesCat = activeCategory === "All" || item.category === activeCategory;
      return isMatch && matchesCat;
    });

    if (meta) {
      meta.innerHTML = query
        ? `Showing <strong>${results.length}</strong> result${results.length === 1 ? "" : "s"} for &ldquo;${escapeHtml(query)}&rdquo;`
        : `Showing all <strong>${results.length}</strong> guide sections`;
    }

    if (!results.length) {
      list.innerHTML = `
        <div class="search-empty">
          <h3>No results found</h3>
          <p>Try a different term, or reach out and we'll add a guide for it.</p>
          <a href="mailto:sahil.talreja@mobisy.com" class="btn btn-primary">Request a Guide</a>
        </div>`;
      return;
    }

    list.innerHTML = results.map(r => `
      <a class="search-result-card" href="${resolveUrl(r.url)}">
        <span class="src-tag">${escapeHtml(r.category)}</span>
        <h3>${highlightMatch(r.section, query)}</h3>
        <p>${highlightMatch(r.snippet || "", query)}</p>
        <span class="src-meta">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"/></svg>
          Part of ${escapeHtml(r.title)}
        </span>
      </a>`
    ).join("");
  }

  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    filtersEl.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.cat;
    runSearch();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateUrlQuery(input.value);
      runSearch();
    }
  });
  if (btn) btn.addEventListener("click", () => { updateUrlQuery(input.value); runSearch(); });

  function updateUrlQuery(q) {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  }

  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  input.value = initialQuery;
  runSearch();
}

// ---------------- Lightbox ----------------
function initLightbox() {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="Screenshot preview">';
  document.body.appendChild(lb);
  const img = lb.querySelector("img");

  document.querySelectorAll(".shot img").forEach(shotImg => {
    shotImg.addEventListener("click", () => {
      img.src = shotImg.src;
      img.alt = shotImg.alt;
      lb.classList.add("open");
    });
  });
  lb.addEventListener("click", (e) => { if (e.target !== img) lb.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("open"); });
}

// ---------------- Scrollspy for the on-page TOC ----------------
function initScrollspy() {
  const tocLinks = document.querySelectorAll(".toc-box a");
  if (!tocLinks.length) return;
  const targets = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute("href")));

  window.addEventListener("scroll", () => {
    let currentIndex = 0;
    targets.forEach((t, i) => {
      if (t && t.getBoundingClientRect().top - 120 <= 0) currentIndex = i;
    });
    tocLinks.forEach((a, i) => a.style.color = i === currentIndex ? "var(--indigo)" : "");
  });
}

// ---------------- Was this helpful ----------------
function initHelpfulBox() {
  const box = document.querySelector(".helpful-box");
  if (!box) return;
  const buttons = box.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("picked"));
      btn.classList.add("picked");
    });
  });
}

// ---------------- Back to top ----------------
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 500));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ---------------- Logout ----------------
function initLogout() {
  const btn = document.getElementById("logout-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (window.bizomLogout) window.bizomLogout();
  });
}
