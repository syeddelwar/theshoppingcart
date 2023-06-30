// cart.js

let cartItems = [];

export function addToCart(product, quantity) {
  const existingItem = cartItems.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ product, quantity });
  }
}

export function removeCartItem(itemId) {
  cartItems = cartItems.filter((item) => item.product.id !== itemId);
}

export function clearCart() {
  cartItems = [];
}

export function calculateTotal() {
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItems() {
  return cartItems;
}
