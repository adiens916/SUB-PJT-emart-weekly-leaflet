import { ItemType } from '../../../types';

export default function Item({ item }: { item: ItemType }) {
  return (
    <div>
      {item && (
        <div>
          <p>{item.itemName}</p>
          {/* <img src={item.itemImage}></img> */}
          <del>{item.priceOriginal}</del>
          <p>{item.priceFinal}</p>
        </div>
      )}
    </div>
  );
}
