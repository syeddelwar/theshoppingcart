// app.js

import { products } from './product.js';
import { addToCart, removeCartItem, clearCart, calculateTotal, getCartItems } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const shoppingCart = document.getElementById('shopping-cart');
  const clearCartButton = document.getElementById('clear-cart');

  // Display product list
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    productElement.classList.add('card');
    productElement.innerHTML = `
    <img src="${product.image}"  class="image" alt="${product.name}">
      <p>${product.name}</p>
      <p>$${product.price}</p>
      <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productElement);
  });

  // Attach event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-product-id'));
      const quantity = 1; // You can modify this to support variable quantities

      const product = products.find((p) => p.id === productId);
      addToCart(product, quantity);
      displayCartItems();
    });
  });

  // Attach event listener to "Clear Cart" button
  clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCartItems();
  });

  // Display cart items
  function displayCartItems() {
    shoppingCart.innerHTML = '';
    const cartItems = getCartItems();
    cartItems.forEach((item) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `

       <img src="${item.product.image}"  class="image" alt="${item.product.name}">
        <p>${item.product.name} (Quantity: ${item.quantity})</p>
        <p>$${item.product.price} each</p>
        <p>Total: $${item.product.price * item.quantity}</p>
        <button class="btn btn-danger remove-item" data-item-id="${item.product.id}">Remove</button>
      `;
      shoppingCart.appendChild(cartItemElement);
    });

    const totalAmount = document.createElement('p');
    totalAmount.classList.add('total-amount');
    totalAmount.textContent = `Total Amount: $${calculateTotal()}`;
    shoppingCart.appendChild(totalAmount);

    // Attach event listeners to "Remove" buttons
    const removeItemButtons = document.querySelectorAll('.remove-item');
    removeItemButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const itemId = parseInt(button.getAttribute('data-item-id'));
        removeCartItem(itemId);
        displayCartItems();
      });
    });
  }

  // Initial display of cart items
  displayCartItems();
});
