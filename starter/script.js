// ============================================================
// Project 2 · Interactive booking website (starter)
//
// The HTML and CSS are ready. Your job is the JavaScript.
// Do the steps in order. After each step, refresh the page
// and check the Console (F12): it must show no errors.
//
// Rules: vanilla JavaScript only, no libraries.
// Write your own code and be ready to explain every line.
// ============================================================

// The WhatsApp number that receives the booking.
// International format, no "+", no spaces. Change it to yours.
const WHATSAPP_NUMBER = "212600000000";

// The key to use with localStorage.
const STORAGE_KEY = "booking-draft";

// ---------- STEP 1 · The data ----------
// Change these services to match YOUR business.
// Keep the same shape: an array of objects with name and price.

const services = [
  { name: "Haircut", price: 60 },
  { name: "Beard trim", price: 30 }
  // TODO: add at least 3 more services
];

// The names of the services the visitor has selected.
let selectedNames = [];

// ---------- STEP 2 · Get the elements ----------
// Look in index.html for the ids. One is done for you.

const servicesBox = document.querySelector("#services");
// TODO: get the form, the 4 inputs, #selected-list, #total,
//       #success and the #clear button.

// ---------- STEP 3 · Create the cards from the array ----------
// For each service, create a <button type="button" class="service">
// with two <span> inside:
//   <span class="service-name">Haircut</span>
//   <span class="service-price">60 MAD</span>
// and add it to servicesBox.
// Hint: forEach, document.createElement, textContent, append.

function showServices() {
  // TODO
}

// ---------- STEP 4 · Select and unselect ----------
// When a card is clicked:
//   - if its name is in selectedNames, remove it
//   - if not, add it
// A selected card gets the class "selected" (the CSS is ready)
// and aria-pressed="true".
// Hint: includes, push, filter, classList.toggle.

function toggleService(name) {
  // TODO
}

// ---------- STEP 5 · The total, live ----------
// total = (sum of the selected prices) x (number of people)
// Show it in #total, and show the selected names in #selected-list.
// It must update when a card is clicked AND when the quantity changes.

function showTotal() {
  // TODO
}

// ---------- STEP 6 · Validation ----------
// Each field has an empty <p class="error"> under it:
//   #name-error, #email-error, #phone-error,
//   #quantity-error, #services-error
// Rules:
//   - name: at least 2 characters
//   - email: looks like name@mail.com
//   - phone: 10 to 13 digits
//   - quantity: a whole number from 1 to 10
//   - services: at least one selected
// Write the message in the right <p>, and add the class "invalid"
// to the input. Return true only when everything is valid.
// Hint: trim, length, Number, a regular expression for the email.

function validateForm() {
  // TODO
}

// ---------- STEP 7 · localStorage ----------
// saveDraft: save selectedNames and the 4 input values.
// restoreDraft: when the page loads, put them back.
// Test: fill half the form, refresh the page. Is it still there?
// Hint: JSON.stringify, JSON.parse, setItem, getItem.

function saveDraft() {
  // TODO
}

function restoreDraft() {
  // TODO
}

// ---------- STEP 8 · The WhatsApp link ----------
// Build a message with the name, phone, people, services and total.
// The link looks like:
//   https://wa.me/NUMBER?text=YOUR_MESSAGE
// Hint: the message must go through encodeURIComponent.

function buildWhatsAppLink() {
  // TODO
}

// ---------- STEP 9 · Events ----------
// 1. "input" on the form: update the total and save the draft.
// 2. "submit" on the form:
//      - event.preventDefault()
//      - if the form is not valid, stop
//      - if it is valid: show a success message in #success,
//        open the WhatsApp link, and remove the saved draft
// 3. "click" on #clear: empty everything.

// TODO

// ---------- STEP 10 · Start ----------
// Call your functions so the page is ready when it loads.

// TODO
