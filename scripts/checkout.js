import { cart, deleteProduct, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/delivery.js'





let itemContainerHTML = ``


cart.forEach((item) => {
  let productId = item.id

  const matchingProduct = products.find((item) => item.id === productId)

  const productImage = matchingProduct.image
  const productPrice = matchingProduct.priceCents
  const productQuantity = item.quantity
  const productName = matchingProduct.name

  const deliveyOptionId = item.deliveryOptionId;

  let deliveryOption = deliveryOptions.find((option) => option.id === deliveyOptionId)

  const today = dayjs();
    const estimatedDelivery = today.add(
      deliveryOption.deliveryDays, 'days'
    )

  const dateFormat = estimatedDelivery.format('dddd, MMMM D')

  itemContainerHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateFormat}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productImage}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productName}
                </div>
                <div class="product-price">
                  $${(productPrice / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${productQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${doDeliveryPrice(matchingProduct, item)}
                </div>
              </div>
            </div>
          </div>
    `
})

function doDeliveryPrice(matchingProduct, cartItem) {
  let deliveryHTML = ``;

  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const estimatedDelivery = today.add(
      option.deliveryDays, 'days'
    )

    const dateFormat = estimatedDelivery.format('dddd, MMMM D')
    const priceString = option.price === 0 ? 'FREE' : `$${(option.price / 100).toFixed(2)} -`

    const isChecked = option.id === cartItem.deliveryOptionId

    deliveryHTML += `
      <div 
        class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}" 
        data-delivery-option-id="${option.id}">

        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateFormat}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `});

  return deliveryHTML
};



document.querySelector('.js-order-summary').innerHTML = itemContainerHTML


const options = document.querySelectorAll('.js-delivery-option')

options.forEach((option) => {
    option.addEventListener('click', () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
    })
})

document.querySelectorAll('.js-delete-link').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.productId

    deleteProduct(id)

    const containerElement = document.querySelector(`.js-cart-item-container-${id}`)

    containerElement.remove()

  })

})

