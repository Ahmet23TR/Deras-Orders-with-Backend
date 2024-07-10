// orders.js
import { updateProductDisplay, updateOrderTotal, resetOrderInputs, updateProductItemColor } from './dom.js';

let orderTable = {};
let orders = [];

export function addOrder() {
  const selectedProductName = document.getElementById("selected-product-name").innerText;
  const quantityInput = document.getElementById("quantity");
  const quantity = parseFloat(quantityInput.value);

  if (!isValidOrder(selectedProductName, quantity)) return;

  const newOrder = { product: selectedProductName, quantity };
  orders.unshift(newOrder);

  if (orders.length > 3) {
    orders.pop();
  }

  orderTable[selectedProductName] = (orderTable[selectedProductName] || 0) + quantity;
  updateProductDisplay(selectedProductName, orderTable[selectedProductName]);
  updateOrderTotal(orderTable);
  resetOrderInputs();
  updateLastOrders();
}

function isValidOrder(productName, quantity) {
  if (productName === "---" || isNaN(quantity)) {
    alert("Lütfen geçerli bir ürün seçin ve miktar giriniz.");
    return false;
  }
  return true;
}

function updateLastOrders() {
  const lastAddedItems = document.getElementById("last-added-item");
  lastAddedItems.innerHTML = "";

  orders.slice(0, 3).forEach((order, index) => {
    const orderElement = document.createElement("div");
    orderElement.textContent = `${index + 1}. Ürün: ${order.product}, Adet: ${order.quantity}`;
    lastAddedItems.appendChild(orderElement);
  });
}
