export let cart = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        quantity: 2
    }
];

export function addProductToCart(productId, button) {
    const existingProduct = cart.find(item => item.id == productId)

    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

}
