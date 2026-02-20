/* ============================================
   auth.js
   Handles: user accounts, login state,
   and rendering the navbar auth buttons.

   Loaded on EVERY page.
   ============================================ */

/* ── Read / write users from localStorage ── */
function getUsers() {
  try { return JSON.parse(localStorage.getItem('nf_users') || '[]'); }
  catch (e) { return []; }
}

function saveUsers(users) {
  localStorage.setItem('nf_users', JSON.stringify(users));
}

/* ── Read / write the currently logged-in user ── */
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('nf_currentUser') || 'null'); }
  catch (e) { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem('nf_currentUser', JSON.stringify(user));
  else       localStorage.removeItem('nf_currentUser');
}

/* ── Log out ── */
function doLogout() {
  setCurrentUser(null);
  renderNavAuth();
  showToast('Signed out. See you soon! 👋');
}

/* ── Build the right side of the navbar ──
   If logged in  → show avatar + name + logout button
   If logged out → show Sign In + Register buttons
*/
function renderNavAuth() {
  const navAuth = document.getElementById('navAuth');
  if (!navAuth) return;

  const user = getCurrentUser();

  if (user) {
    const initials = (user.first[0] || '') + (user.last[0] || '');
    navAuth.innerHTML = `
      <div class="user-greeting">
        <div class="user-avatar">${initials.toUpperCase()}</div>
        <span>Hi, <strong>${user.first}</strong>!</span>
        <button class="btn-logout" onclick="doLogout()">Sign out</button>
      </div>`;
  } else {
    /* Work out the correct path to login/register pages
       depending on which page we're currently on */
    const isRoot = window.location.pathname.endsWith('index.html')
                || window.location.pathname.endsWith('/')
                || window.location.pathname === '';

    const base = isRoot ? 'public/templates/' : '';

    navAuth.innerHTML = `
      <a href="${base}login.html" class="btn-outline">Sign In</a>
      <a href="${base}create_account.html" class="btn-solid">Register</a>`;
  }
}

/* ── Run on every page load ── */
document.addEventListener('DOMContentLoaded', renderNavAuth);
