import { ItemType } from '../types';

const host = './resources/sample.json';

export async function getItemList() {
  const itemList = await request<ItemType[]>(host);
  // console.log(itemList);

  return itemList;
}

// export async function getItemListByFilterId(filterId = 0) {
//   const itemList = await request(host);
//   return itemList;
// }

async function request<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    console.log(response);

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
