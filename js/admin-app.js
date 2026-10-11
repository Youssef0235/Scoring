/**
 * Bernaba el Rasol - Admin Application Controller & Tab Router
 */

window.BernabaAdminApp = {
  init: async function () {
    // Check Authentication
    if (!BernabaAuth.isLoggedIn()) {
      BernabaUtils.openModal('modal-login');
      this.setupLoginHandler();
    } else {
      this.onAuthSuccess();
    }
  },

  setupLoginHandler: function () {
    const form = document.getElementById('form-admin-login');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const uInput = document.getElementById('login-username').value;
      const pInput = document.getElementById('login-password').value;

      try {
        await BernabaAuth.login(uInput, pInput);
        BernabaUtils.closeModal('modal-login');
        BernabaUtils.showToast('Login successful! Welcome to Bernaba el Rasol.', 'success');
        this.onAuthSuccess();
      } catch (err) {
        BernabaUtils.showToast(err.message || 'Login failed', 'error');
      }
    });
  },

  onAuthSuccess: async function () {
    BernabaAuth.enforceRoleUI();
    this.setupTabNavigation();

    // Default tab based on role
    let defaultTab = 'kashf';
    if (BernabaAuth.isAttendanceAdmin()) {
      defaultTab = 'attendance';
    } else if (BernabaAuth.isTDashAdmin()) {
      defaultTab = 'score';
    }

    this.switchTab(defaultTab);
  },

  toggleMobileSidebar: function () {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
  },

  closeMobileSidebar: function () {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  },

  setupTabNavigation: function () {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabTarget = item.getAttribute('data-tab');
        
        // Auto-close sidebar on mobile when a tab is clicked
        this.closeMobileSidebar();

        // Block unauthorized access for Attendance Admin
        if (BernabaAuth.isAttendanceAdmin() && tabTarget !== 'attendance') {
          BernabaUtils.showToast('Access restricted to Attendance Admin.', 'warning');
          return;
        }

        // Block unauthorized access for T-dash Admin
        if (BernabaAuth.isTDashAdmin() && tabTarget !== 'score') {
          BernabaUtils.showToast('Access restricted to T-dash Admin.', 'warning');
          return;
        }

        this.switchTab(tabTarget);
      });
    });
  },

  switchTab: async function (tabId) {
    // Auto-close mobile sidebar
    this.closeMobileSidebar();

    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    // Show target panel
    const targetPanel = document.getElementById(`tab-${tabId}`);
    const targetNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);

    if (targetPanel) targetPanel.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    // Update Header Title
    const titleElem = document.getElementById('active-tab-title');
    if (titleElem && targetNav) {
      titleElem.textContent = targetNav.textContent.trim();
    }

    // Trigger tab specific data initializers
    switch (tabId) {
      case 'kashf':
        await BernabaChildren.init();
        break;
      case 'leaderboard':
        await BernabaLeaderboard.initAdmin();
        break;
      case 'score':
        await BernabaPointsEngine.initScoreTab();
        break;
      case 'points_system':
        await BernabaPointsEngine.initRulesTab();
        break;
      case 'attendance':
        await BernabaAttendance.init();
        break;
      case 'attendance_history':
        await BernabaAttendance.renderAttendanceHistory();
        break;
      case 'eftkad_entry':

        await BernabaEftkad.init();
        break;
      case 'eftkad_history':
        await BernabaEftkad.renderEftkadHistory();
        break;
      case 'birthdays':
        await BernabaBirthdays.initAdmin();
        break;
      case 'store':
        await BernabaStore.initAdmin();
        break;
    }
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  BernabaAdminApp.init();
});
