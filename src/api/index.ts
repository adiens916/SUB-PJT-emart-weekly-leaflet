import { ItemType } from '../types';

const host = 'http://localhost:3000';
const resource = 'items';

export async function fetchItems(
  page: number,
  category: number,
): Promise<ItemType[]> {
  let query = `_page=${page}`;
  if (category) query += `&categories_like=${category}`;
  return await request(`${host}/${resource}?${query}`);
}

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
