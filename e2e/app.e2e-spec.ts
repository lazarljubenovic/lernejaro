import { LernejaroPage } from './app.po';

describe('lernejaro App', function() {
  let page: LernejaroPage;

  beforeEach(() => {
    page = new LernejaroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
