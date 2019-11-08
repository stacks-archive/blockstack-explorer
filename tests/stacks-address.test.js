// const url = process.env.TESTING_URL || 'https://explorer.staging.blockstack.xyz';
const url = process.env.TESTING_URL || 'http://localhost:3000';
jest.setTimeout(15000);

describe('Stacks address page', () => {
  describe('address SP1ERE1Z1MDVM100NWYR16GZZJJTZQYHG4F6GWBDM', () => {
    const address = 'SP1ERE1Z1MDVM100NWYR16GZZJJTZQYHG4F6GWBDM';
    beforeAll(async () => {
      await page.goto(`${url}/address/stacks/${address}`);
    });

    test('shows the address', async () => {
      await expect(page).toMatch(address);
    });

    test('shows the token grants', async () => {
      await expect(page).toMatch('5,245 STX');
    });

    test('shows recent transactions', async () => {
      await expect(page).toMatch('Received 2,180.654 STX');
      await expect(page).toMatch('Sent 27,714.625 STX');
      await expect(page).toMatch('Sent 100 STX');
    });
  });
});
