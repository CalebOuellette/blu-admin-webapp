import { BluAdminWebappPage } from './app.po';

describe('blu-admin-webapp App', () => {
  let page: BluAdminWebappPage;

  beforeEach(() => {
    page = new BluAdminWebappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
