from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas
import time
import os

class MercadoLivreScrapy():
    def __init__(self, product_name: str, headless: bool=True):
        options = Options()
        if headless == True:
            # > 112 --headless
            # < 112 --headless=new 
            options.add_argument("--headless=new")
        service = Service("chromedriver.exe")
        self.product_name = product_name
        self.driver = webdriver.Chrome(service=service, options=options)

    def navigate(self, link:str="https://www.mercadolivre.com.br/"):
        """
        link: str - serve para navegar entre as pastas
        """
        self.driver.get(link)

    def search(self):
        """
        pesquisa o produto desejado
        """
        self.driver.find_element(By.XPATH, '//input[@class="nav-search-input"]').send_keys(self.product_name)
        self.driver.find_element(By.XPATH, '//button[@class="nav-search-btn"]').click()

    def results(self, depth:int=False):
            """
            depth: int - define a profundidade da busca 
            (False) busca todos os elementos
            """
            if depth == False:
                self.driver.find_element(By.TAG_NAME, "html").send_keys(Keys.END)
                pages_number = self.driver.find_element(By.XPATH, '//li[@class="andes-pagination__page-count"]').text[3:]
            else:
                pages_number = depth

            name_list = []
            link_list = []
            price_list = []
            discount_list = []

            for page in range(int(pages_number)):
                WebDriverWait(self.driver, 5).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'body')))
                self.driver.find_element(By.TAG_NAME, "html").send_keys(Keys.END)
                products = self.driver.find_elements(By.XPATH, '//section[@class="ui-search-results ui-search-results--without-disclaimer shops__search-results"]/ol/li')
                for product in products:
                    name = product.find_element(By.XPATH, './/a[@class="ui-search-item__group__element shops__items-group-details ui-search-link"]').text
                    link = product.find_element(By.XPATH, './/a[@class="ui-search-item__group__element shops__items-group-details ui-search-link"]').get_attribute("href")
                    price = product.find_element(By.XPATH, './/span[@class="andes-money-amount ui-search-price__part shops__price-part andes-money-amount--cents-superscript"]/span[@class="andes-money-amount__fraction"]').text
                    discount = product.find_elements(By.XPATH, './/span[@class="ui-search-price__discount shops__price-discount"]')
                    if not discount:
                        discount = 0
                    else:
                        discount = discount[0].text
                    name_list.append(name.replace(",", ""))
                    link_list.append(link)
                    price_list.append(price)
                    discount_list.append(discount)
                if int(pages_number) > 0:
                    back_next = self.driver.find_elements(By.XPATH, '//a[@class="andes-pagination__link shops__pagination-link ui-search-link"]')
                    for button in back_next:
                        if button.get_attribute("title") == "Seguinte":
                            button.click()
                self.log(pages_number, len(name_list), page+1)
            self.excel(name_list, link_list, price_list, discount_list)

    def excel(self, name:str, link:str, price:int, discount:int):
        data = []
        for index in range(len(name)):
            data.append({"Nome": name[index],"Link": link[index],"Price": price[index],"Discount": discount[index]})
        df = pandas.DataFrame(data=data)
        df.to_csv(f"{round(time.time())}.csv", index=False)

    def log(self, pages, products, current_page):
        os.system("cls")
        print("-"*30)
        print(f"Produto {self.product_name}")
        print(f"Paginas : {current_page}/{pages}")
        print(f"Produtos coletados : {products}")
        print("-"*30)

    def close(self):
        """
        fecha o webdriver
        """
        self.driver.close()

if __name__ == "__main__":
    while True:
        os.system("cls")
        Scrapy = MercadoLivreScrapy(product_name=input("Qual produto deseja ? : "))
        Scrapy.navigate()
        Scrapy.search()
        Scrapy.results()
        Scrapy.close()
        break
