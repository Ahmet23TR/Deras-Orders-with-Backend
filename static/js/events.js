// events.js
import { clearAndSelectItem, updateProductName, focusQuantityInput, toggleHighlight, updateProductItemColor, updateProductBoxColorBasedOnQuantity } from './dom.js';
import { addOrder } from './orders.js';

export function setupProductItemEvents() {
  document.querySelectorAll(".product-item").forEach(item => {
    item.addEventListener("click", () => {
      clearAndSelectItem(item);
      updateProductName(item);
      focusQuantityInput();
      toggleHighlight(item);
    });
  });
}

export function setupQuantityInputListeners() {
  const selectedProductNameElement = document.getElementById("selected-product-name");
  const quantityInput = document.getElementById("quantity");

  selectedProductNameElement.addEventListener("click", () => {
    quantityInput.disabled = false;
  });

  quantityInput.addEventListener("blur", () => {
    if (selectedProductNameElement.textContent === "---") {
      quantityInput.value = "";
    }
  });

  quantityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addOrder();
  });

  quantityInput.addEventListener("input", function () {
    updateProductItemColor(this.value);
  });
}

export function setupOrderButtonListener() {
  document.querySelector(".order-button").addEventListener("click", addOrder);
}

export function setupDateChangeListener() {
  const selectedDateInput = document.getElementById("selected-date");
  selectedDateInput.addEventListener("change", () => {
    document.getElementById("selected-date-display").textContent = selectedDateInput.value;
  });
}

export function setupStickyNavigation() {
  const orderDetails = document.querySelector(".order-details");
  const headerObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        orderDetails.classList.toggle("sticky", !entry.isIntersecting);
      });
    },
    { root: null, threshold: 0 }
  );

  headerObserver.observe(document.querySelector(".header"));
}

export function setupDOMContentLoadedListener() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".product-container").addEventListener("input", e => {
      if (e.target && e.target.classList.contains("quantity")) {
        const productItem = e.target.closest(".product-quantity-table");
        const quantity = parseFloat(e.target.value);
        updateProductBoxColorBasedOnQuantity(productItem, quantity);
      }
    });
  });
}


