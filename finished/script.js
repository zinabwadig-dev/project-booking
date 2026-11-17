// ============================================================
// Project 2 · Interactive booking website (finished version)
// Vanilla JavaScript only: arrays, the DOM, events, forms,
// localStorage.
// ============================================================

// The WhatsApp number that receives the booking.
// International format, no "+", no spaces. Change it to yours.
const WHATSAPP_NUMBER = "212600000000";

// The key we use to save the booking in localStorage.
const STORAGE_KEY = "booking-draft";

// ---------- 1. The data: an array of objects ----------

const services = [
  { name: "Haircut", price: 60 },
  { name: "Beard trim", price: 30 },
  { name: "Haircut + beard", price: 80 },
  { name: "Kids haircut", price: 40 },
  { name: "Hair wash", price: 20 }
];

// The names of the services the visitor has selected.
let selectedNames = [];

// ---------- 2. The elements we need from the page ----------

const servicesBox = document.querySelector("#services");
const form = document.querySelector("#booking-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const quantityInput = document.querySelector("#quantity");
const selectedList = document.querySelector("#selected-list");
const totalText = document.querySelector("#total");
const successText = document.querySelector("#success");
const clearButton = document.querySelector("#clear");

// ---------- 3. Create the service cards from the array ----------

function showServices() {
  servicesBox.innerHTML = "";

  services.forEach(function (service) {
    // A <button> works with the mouse, the keyboard and touch.
    const card = document.createElement("button");
    card.type = "button";
    card.className = "service";

    const name = document.createElement("span");
    name.className = "service-name";
    name.textContent = service.name;

    const price = document.createElement("span");
    price.className = "service-price";
    price.textContent = service.price + " MAD";

    card.append(name, price);

    // Show the card as selected if its name is in selectedNames.
    const isSelected = selectedNames.includes(service.name);
    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-pressed", isSelected);

    card.addEventListener("click", function () {
      toggleService(service.name);
    });

    servicesBox.append(card);
  });
}

// ---------- 4. Select or unselect a service ----------

function toggleService(name) {
  if (selectedNames.includes(name)) {
    // Already selected: remove it.
    selectedNames = selectedNames.filter(function (item) {
      return item !== name;
    });
  } else {
    // Not selected yet: add it.
    selectedNames.push(name);
  }

  showServices();
  showTotal();
  showError("services", "");
  saveDraft();
}

// ---------- 5. The total, updated live ----------

function getTotal() {
  let sum = 0;

  services.forEach(function (service) {
    if (selectedNames.includes(service.name)) {
      sum = sum + service.price;
    }
  });

  // Number("") is 0, so an empty quantity counts as 1 person here.
  const people = Number(quantityInput.value) || 1;
  return sum * people;
}

function showTotal() {
  totalText.textContent = getTotal();

  if (selectedNames.length === 0) {
    selectedList.textContent = "nothing yet";
  } else {
    selectedList.textContent = selectedNames.join(", ");
  }
}

// ---------- 6. Validation ----------

// Show (or clear) the message under one field.
function showError(fieldName, message) {
  const errorText = document.querySelector("#" + fieldName + "-error");
  errorText.textContent = message;

  const input = document.querySelector("#" + fieldName);
  if (input) {
    input.classList.toggle("invalid", message !== "");
  }
}

// Check every field. Returns true when everything is valid.
function validateForm() {
  let isValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const quantity = Number(quantityInput.value);

  if (name.length < 2) {
    showError("name", "Please write your name.");
    isValid = false;
  } else {
    showError("name", "");
  }

  // Simple check: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("email", "Please write a valid email, like name@mail.com.");
    isValid = false;
  } else {
    showError("email", "");
  }

  // Keep only the digits, then count them.
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    showError("phone", "Please write a valid phone number, like 06 12 34 56 78.");
    isValid = false;
  } else {
    showError("phone", "");
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    showError("quantity", "Choose a number of people from 1 to 10.");
    isValid = false;
  } else {
    showError("quantity", "");
  }

  if (selectedNames.length === 0) {
    showError("services", "Pick at least one service.");
    isValid = false;
  } else {
    showError("services", "");
  }

  return isValid;
}

// ---------- 7. localStorage: save and restore ----------

function saveDraft() {
  const draft = {
    selectedNames: selectedNames,
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    quantity: quantityInput.value
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

function restoreDraft() {
  const saved = localStorage.getItem(STORAGE_KEY);

  // Nothing saved yet: keep the empty form.
  if (saved === null) {
    return;
  }

  try {
    const draft = JSON.parse(saved);

    // Keep only names that still exist in the services array.
    selectedNames = draft.selectedNames.filter(function (name) {
      return services.some(function (service) {
        return service.name === name;
      });
    });

    nameInput.value = draft.name;
    emailInput.value = draft.email;
    phoneInput.value = draft.phone;
    quantityInput.value = draft.quantity;
  } catch (error) {
    // The saved text was broken: forget it and start fresh.
    localStorage.removeItem(STORAGE_KEY);
    selectedNames = [];
  }
}

// ---------- 8. The WhatsApp link ----------

function buildWhatsAppLink() {
  const message =
    "Hello, I would like to book.\n" +
    "Name: " + nameInput.value.trim() + "\n" +
    "Email: " + emailInput.value.trim() + "\n" +
    "Phone: " + phoneInput.value.trim() + "\n" +
    "People: " + quantityInput.value + "\n" +
    "Services: " + selectedNames.join(", ") + "\n" +
    "Total: " + getTotal() + " MAD";

  // encodeURIComponent makes the text safe to put in a link.
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// ---------- 9. Events ----------

// Save the draft and update the total while the visitor types.
form.addEventListener("input", function () {
  successText.textContent = "";
  showTotal();
  saveDraft();
});

form.addEventListener("submit", function (event) {
  // Stop the page from reloading.
  event.preventDefault();

  if (!validateForm()) {
    successText.textContent = "";

    // Move the cursor to the first field with a problem.
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  const link = buildWhatsAppLink();

  successText.textContent = "";
  const text = document.createTextNode("Thank you! Your booking is ready. ");
  const openLink = document.createElement("a");
  openLink.href = link;
  openLink.target = "_blank";
  openLink.rel = "noopener";
  openLink.textContent = "Open WhatsApp to send it";
  successText.append(text, openLink);

  // The booking is finished, so the draft is no longer needed.
  localStorage.removeItem(STORAGE_KEY);

  window.open(link, "_blank", "noopener");
});

clearButton.addEventListener("click", function () {
  form.reset();
  selectedNames = [];
  successText.textContent = "";

  ["name", "email", "phone", "quantity", "services"].forEach(function (field) {
    showError(field, "");
  });

  localStorage.removeItem(STORAGE_KEY);
  showServices();
  showTotal();
});

// ---------- 10. Start ----------

restoreDraft();
showServices();
showTotal();
