import { ItemType } from '../../types';
import Item from './Item';

export default function ItemList({ itemList }: { itemList: ItemType[] }) {
  return (
    <main>
      {itemList &&
        itemList.map((item, index) => <Item item={item} key={index} />)}
    </main>
  );
}
