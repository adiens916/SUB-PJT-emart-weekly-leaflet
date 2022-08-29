export interface ItemType {
  itemImage: string;
  itemName: string;
  priceOriginal: string;
  priceFinal: string;
  favoriteCount: string;
  reviewCount: string;
  badges: BadgeType[];
}

export interface BadgeType {
  color: string;
  text: string;
}
