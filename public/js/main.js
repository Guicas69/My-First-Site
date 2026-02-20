/* ============================================
   main.js
   Shared utilities used on every page:
   - Navbar shadow on scroll
   - Toast notification
   ============================================ */

/* ── Navbar shadow when user scrolls down ── */
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ── Toast notification ──
   Call showToast('Your message here') from anywhere.
   The toast disappears automatically after 3 seconds.
*/
let toastTimer;

function showToast(message, icon) {
  const toast   = document.getElementById('toast');
  const msgEl   = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  clearTimeout(toastTimer);
  msgEl.textContent = (icon ? icon + ' ' : '') + message;
  toast.classList.add('show');

  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 3200);
}
