import { ItemType } from '../types';

const host = './resources/sample.json';

export class ItemListLoader {
  private categoryId;
  private limit;
  private isLoadingFinished;
  private itemListOriginal: ItemType[] = [];
  private itemListFiltered: ItemType[] = [];

  constructor() {
    this.categoryId = 0;
    this.limit = 10;
    this.isLoadingFinished = false;
  }

  setCategory(categoryId: number) {
    this.categoryId = categoryId;
    this.isLoadingFinished = false;
    this.itemListFiltered = [];
  }

  async getMore() {
    if (this.isLoadingFinished) {
      return [];
    }

    if (this.itemListFiltered.length === 0) {
      this.itemListFiltered = await this.getFilteredList();
    }

    const itemList = this.itemListFiltered.splice(0, this.limit);
    if (this.itemListFiltered.length === 0) {
      this.isLoadingFinished = true;
    }
    return itemList;
  }

  private async getFilteredList() {
    await this.loadItem();

    if (!this.categoryId) {
      return this.itemListOriginal;
    } else {
      return this.itemListOriginal.filter((item) =>
        item.categories.includes(this.categoryId),
      );
    }
  }

  private async loadItem() {
    if (this.itemListOriginal.length === 0) {
      this.itemListOriginal = await request<ItemType[]>(host);
    }
  }
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
