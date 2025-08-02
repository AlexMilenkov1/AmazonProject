import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/delivery.js";

export function renderPaymentSummary() {
    let totalPrice = 0;
    let shippingPrice = 0;

    cart.forEach((cartItem) => {
        const currentProductId = cartItem.id

        const product = products.find((product) => product.id === currentProductId)

        totalPrice += product.priceCents * cartItem.quantity


        let deliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId)

        shippingPrice += deliveryOption.price;

    })

    const totalPriceBeforeTaxes = totalPrice + shippingPrice;
    const taxCents = totalPriceBeforeTaxes * 0.1;

    const totalCents = totalPriceBeforeTaxes + taxCents

    const paymentHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${(totalPrice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingPrice / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalPriceBeforeTaxes / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML

    
}
