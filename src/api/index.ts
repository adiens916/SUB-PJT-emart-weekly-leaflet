import { ItemType } from '../types';

const host = './resources/sample.json';

export async function getItemList() {
  const itemList = await request<ItemType[]>(host);
  // console.log(itemList);

  return itemList;
}

export async function getItemListByPage(category = 0, page = 1, limit = 10) {
  try {
    const itemList = await getItemListByCategory(category);
    // console.log(itemList);

    const pageLength = Math.floor(itemList.length / limit) + 1;

    const itemListGroup: ItemType[][] = Array(pageLength);
    for (let i = 0; i < pageLength; i++) {
      const start = limit * i;
      const end = limit * (i + 1);
      itemListGroup[i] = itemList.slice(start, end);
    }

    const itemListDivided = itemListGroup[page - 1];
    if (itemListDivided) {
      return itemListDivided;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getItemListByCategory(categoryId: number) {
  const itemList = await request<ItemType[]>(host);
  if (!categoryId) {
    return itemList;
  }

  const itemListFiltered = itemList.filter((item) =>
    item.categories.includes(categoryId),
  );

  return itemListFiltered;
}

// export async function getItemListByFilterId(filterId = 0) {
//   const itemList = await request(host);
//   return itemList;
// }

async function request<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    // console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      console.log('Server Error!', response);
      throw response;
    }
  } catch (error) {
    console.log('Unexpected Error!', error);
    throw error;
  }
}
