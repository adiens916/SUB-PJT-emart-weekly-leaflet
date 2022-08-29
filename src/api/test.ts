import { getItemListByPage } from '.';
import { ItemType } from '../types';

test('get item list by page & limit', async () => {
  const itemList = await getItemListByPage(2, 2);

  const itemFourth = itemList[1] as ItemType;

  expect(itemFourth['priceFinal']).toBe('19,900/14,990원');
});
