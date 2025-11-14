import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { Basket } from './components/Models/Basket';
import { Products } from './components/Models/Products';
import { Customer } from './components/Models/Customer';
import { Communication } from './components/API/communication';
import { apiProducts } from './utils/data'
import './scss/styles.scss';
const productsModel = new Products(apiProducts.items, null);
const basketModel = new Basket();
const customerModel = new Customer('cash', 'example@yandex.ru', '893333333333', 'Москва, Большая Садовая, 302-бис, пятый этаж, кв. № 50.');

console.log('Массив товаров из каталога: ', productsModel.getItems()); 

basketModel.addItem(productsModel.getItems()[0]);
console.log('Массив товаров из корзины: ', basketModel.getItems());
console.log('Общая сумма корзины:', basketModel.getTotalItems());
console.log('Количество товаров в корзине:', basketModel.getCountItems());
console.log('Есть ли товар в корзине:', basketModel.hasItem("123"));
/** console.log('Очищение карзины:', basketModel.clearItems()); **/

customerModel.setPayment('cash');
console.log('После установки оплаты:', customerModel.validateForm());
customerModel.setAddress('Москва, Большая Садовая, 302-бис, пятый этаж, кв. № 50.');
console.log('После установки адреса:', customerModel.validateForm());
customerModel.setPhone('2-36-85');
console.log('После установки телефона:', customerModel.validateForm());
customerModel.setEmail('example@yandex.ru');
console.log('После установки email:', customerModel.validateForm());
console.log('Форма полностью валидна:', Object.keys(customerModel.validateForm()).length === 0);

console.log('Данные покупателя:', customerModel.getData());

const api = new Api(API_URL);
const communicationModel = new Communication(api);

communicationModel.getProducts().then(products => {
  console.log('Каталог товаров c сервера: ', products);
  productsModel.setItems(products);
}).catch(error => {
    console.error("Ошибка при получении товаров с сервера: ", error);
  });
  console.log('Текущий выбранный товар:', productsModel.getSelectedItem());


const orderData = {
  ...customerModel.getData(),
  total: basketModel.getTotalItems(),
  items: basketModel.getItems().map(item => item.id)
}

communicationModel.sendOrder(orderData).then(order => {
  console.log('Заказ отправлен:', order);
}).catch(error => {
  console.log('Ошибка при отправке заказа', error);
});