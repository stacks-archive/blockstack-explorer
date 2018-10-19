import { fetchName, fetchAddress, fetchTX, fetchNameOps } from '../lib/client/core-api';

describe('fetchName', () => {
  test('fetches a profile', async (t) => {
    const user = await fetchName('hankstoever');
    // console.log(user)
    expect(user.profile.name).toBe('Hank Stoever');
    t();
  });

  test('it works with .id', async (t) => {
    const user = await fetchName('hankstoever');
    // console.log(user)
    expect(user.profile.name).toBe('Hank Stoever');
    t();
  });

  test('resolves to null when no match', async (t) => {
    const user = await fetchName('notarealid');
    expect(user).toBeNull();
    t();
  });
});

describe('fetchAddress', () => {
  test('fetches an address', async (t) => {
    const address = await fetchAddress('1G8XTwZkUzu7DJYDW4oA4JX5shnW8LcpC2');
    expect(address.names[0]).toEqual('hankstoever.id');
    t();
  });
});

test('fetches a TX', async (t) => {
  const tx = await fetchTX('b5eec33c42920752d60203eae6b1a9bddab18f1f88ba9999352b93589d70e530');
  expect(tx.blockheight).toBe(517739);
  expect(tx.vout[0].scriptPubKey.hex).toBe(
    '6a3c69643a68616e6b73746f657665722e69640000000000000000000000000000000000000000000000daa4437cd303d5c751b62a4c25ece524889b0b81',
  );
  t();
});

test(
  'fetches all recent name ops',
  async (t) => {
    const nameOps = await fetchNameOps();
    console.log(nameOps[0]);
    expect(nameOps[0].name).not.toBeFalsy();
    expect(nameOps[0].time).not.toBeFalsy();
    expect(nameOps[0].timeAgo).not.toBeFalsy();
    t();
    // console.log(nameOps.length)
  },
  30000,
);
