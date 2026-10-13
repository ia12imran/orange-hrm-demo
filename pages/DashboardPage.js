
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', {
      name: 'Dashboard',
    });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
  }

  async verifyDashboardVisible() {
    await this.dashboardHeading.waitFor({
      state: 'visible',
    });
  }

  async logout() {
    await this.userMenu.click();
    await this.page.getByRole('menuitem', {
      name: 'Logout',
    }).click();
  }
}

module.exports = { DashboardPage };
