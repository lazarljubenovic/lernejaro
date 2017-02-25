import {LernejaroPage} from './app.po';

describe('lernejaro App', function () {
    let page: LernejaroPage;

    beforeEach(() => {
        page = new LernejaroPage();
    });

    it('should not throw while loading', () => {
        page.navigateTo();
        expect(true).toBe(true);
    });
});
