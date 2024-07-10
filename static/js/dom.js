// dom.js
export function clearAndSelectItem(selectedItem) {
  document.querySelectorAll(".product-item.selected").forEach(el => el.classList.remove("selected"));
  selectedItem.classList.add("selected");
}

export function updateProductName(selectedItem) {
  const productName = selectedItem.textContent.trim();
  document.getElementById("selected-product-name").textContent = productName;
}

export function focusQuantityInput() {
  document.getElementById("quantity").focus();
}

export function toggleHighlight(selectedItem) {
  if (document.getElementById("quantity").value.trim() === "") return;
  selectedItem.classList.toggle("highlight");
  document.querySelectorAll(".product-item").forEach(item => {
    if (item !== selectedItem) item.classList.remove("highlight");
  });
}

export function updateProductDisplay(productName, quantity) {
  const productItems = document.querySelectorAll(".product-item");
  productItems.forEach(item => {
    if (item.textContent.trim() === productName) {
      const quantityDisplay = item.nextElementSibling.querySelector(".quantity");
      quantityDisplay.textContent = quantity;
      item.style.backgroundColor = quantity > 0 ? "#dbc310" : "";
    }
  });
}

export function updateOrderTotal(orderTable) {
  const totalOrders = Object.values(orderTable).reduce((total, quantity) => total + quantity, 0);
  document.getElementById("total-orders").textContent = totalOrders;
}

export function resetOrderInputs() {
  document.getElementById("selected-product-name").textContent = "---";
  document.getElementById("quantity").value = "";
}

export function updateProductItemColor(quantity) {
  const productItem = document.querySelector(".product-item.selected");
  if (productItem) {
    productItem.style.backgroundColor = quantity != 0 ? "#dbc310" : "";
  }
}

export function updateProductBoxColorBasedOnQuantity(productItem, quantity) {
  productItem.style.backgroundColor = quantity > 0 ? "#dbc310" : "";
}
