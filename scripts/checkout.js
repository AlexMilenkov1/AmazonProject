import {renderOrderSummary}  from './checkout-folder/order.js'
import {renderPaymentSummary} from './checkout-folder/payment.js'
import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

loadProducts((products) => {
    renderOrderSummary(products);
    renderPaymentSummary(products);
});
