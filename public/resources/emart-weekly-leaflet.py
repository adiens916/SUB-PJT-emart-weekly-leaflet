import unittest
import json
import random
from pathlib import Path
from pprint import pprint
from bs4 import BeautifulSoup, Tag

html_doc = f'{Path(__file__).parent}/sample.html'
json_file = f'{Path(__file__).parent}/sample_with_categories.json'


class WeeklyLeaflet:
    soup = ''

    def __init__(self) -> None:
        self.soup = BeautifulSoup(open(html_doc, encoding='utf-8'), 'html.parser')

    def crawl(self, _from = None, _to = None):
        result = []

        products = self.soup.select('li.list')
        for product in products[_from: _to]:
            result.append(self.extract_product(product))

        return result
    
    def extract_product(self, product: Tag):
        product_info = {}

        product_info['itemName'] = self.get_item_name(product)
        product_info['itemImage'] = self.get_image(product)
        product_info['priceOriginal'] = self.get_price_original(product)
        product_info['priceFinal'] = self.get_price_final(product)
        product_info['favoriteCount'] = self.get_favorite_count(product)
        product_info['reviewCount'] = self.get_review_count(product)
        product_info['badges'] = self.get_item_badges(product)
        product_info['categories'] = self.set_categories()

        return product_info

    def get_image(self, product: Tag):
        div = product.find('div', 'box-img')
        image_url = div.img['src']
        return image_url

    def get_item_name(self, product: Tag):
        p = product.find(class_='product')
        return p.text

    def get_price_original(self, product: Tag):
        span = product.find(class_='price-ed')
        if span:
            return span.text

        _del = product.find('del')
        if _del:
            return _del.text

        return ''

    def get_price_final(self, product: Tag):
        span = product.find(class_='price-st')
        if span:
            return span.text
        
        irregular = product.find(class_='ern-prd-pirce-sale')
        if irregular:
            texts = irregular.find_all(text=True)
            if irregular.find('del'):
                return texts[1]
            else:
                return texts[0]
        
        return ''

    def get_item_badges(self, product: Tag):
        result = []

        badge_container = product.find(class_='ern-product-badge')
        if not badge_container:
            return []

        badges = badge_container.select('span')
        for badge in badges:
            # print(badge['class'])
            color_class = badge['class'][0]
            color = color_class.split('-')[1]
            text = badge.text
            result.append({'color': color, 'text': text})

        return result

    def get_favorite_count(self, product: Tag):
        btn = product.find('button', 'btn_favorite')
        if btn:
            favorite_count = btn.span.text
            return favorite_count
        else:
            return ''

    def get_review_count(self, product: Tag):
        btn = product.find(class_='btn_reply')
        if btn:
            review_count = btn.text.strip()
            return review_count
        else:
            return ''
        
    def set_categories(self):
        randoms = self.get_randoms(1, 8, 3)
        return randoms
    
    def get_randoms(self, min_range, max_range, max_pick):
        random_pick = random.randint(1, max_pick)
        randoms = random.sample(range(min_range, max_range), random_pick)
        # pprint(randoms)
        return randoms


class TestWeeklyLeaflet(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(TestWeeklyLeaflet, self).__init__(*args, **kwargs)
        
        self.crawler = WeeklyLeaflet()

        soup = BeautifulSoup(open(html_doc, encoding='utf-8'), 'html.parser')
        products = soup.select('li.list')
        self.product1 = products[0]
        self.product2 = products[1]
        self.product3 = products[2]
    
    def test_run(self):
        pprint(self.crawler.crawl(_from=-5))
    
    def test_get_image(self):
        image_url1 = self.crawler.get_image(self.product1)
        self.assertEqual(image_url1, 'https://stimg.emart.com/upload/onlineleaflet/220818/8809617945344.png')
        
        image_url2 = self.crawler.get_image(self.product2)
        self.assertEqual(image_url2, 'https://stimg.emart.com/upload/onlineleaflet/220818/8809020767595.png')

    def test_get_item_name(self):
        item_name1 = self.crawler.get_item_name(self.product1)
        self.assertEqual(item_name1, 'HBAF 시즈닝 아몬드/믹스넛/땅콩/병아리콩')

        item_name2 = self.crawler.get_item_name(self.product2)
        self.assertEqual(item_name2, '자연주의 유기농 참기름/볶음참깨')

    def test_get_price_original(self):
        price1 = self.crawler.get_price_original(self.product1)
        self.assertEqual(price1, '')

        price2 = self.crawler.get_price_original(self.product2)
        self.assertEqual(price2, '16,980/6,980')

        price3 = self.crawler.get_price_original(self.product3)
        self.assertEqual(price3, '14,980')

    def test_get_price_final(self):
        price1 = self.crawler.get_price_final(self.product1)
        self.assertEqual(price1, '')

        price2 = self.crawler.get_price_final(self.product2)
        self.assertEqual(price2, '13,584/5,584원')

        price3 = self.crawler.get_price_final(self.product3)
        self.assertEqual(price3, '11,235원')

    def test_get_item_badges(self):
        badges1 = self.crawler.get_item_badges(self.product1)
        expected1 = [
            {'color': 'blue', 'text': '※동일가격 교차구매 가능'},
            {'color': 'blue', 'text': '1+1'}
        ]
        self.assertEqual(badges1, expected1)

    def test_get_favorite_count(self):
        count = self.crawler.get_favorite_count(self.product1)
        self.assertEqual(count, '479')

    def test_get_review_count(self):
        count = self.crawler.get_review_count(self.product1)
        self.assertEqual(count, '67')


def save_dict_as_name(result: dict, file_name: str):
    with open(file_name, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)


if __name__ == '__main__':
    # unittest.main()

    result = WeeklyLeaflet().crawl()
    print(len(result))
    save_dict_as_name(result, json_file)