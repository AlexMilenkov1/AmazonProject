export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 3,
            deliveryOptionId: '2'
        }
    ];
}



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProductToCart(productId, button) {
    const existingProduct = cart.find(item => item.id == productId)

    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();

}

export function deleteProduct(productId) {
    const productIndex = cart.findIndex(item => item.id === productId)

    cart.splice(productIndex, 1)

    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
        if (cartItem.id === productId) {
            matchingItem = cartItem
        }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}