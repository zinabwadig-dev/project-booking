# Project 2 · Interactive booking website (finished reference)

Instructor reference for the Week 4 Code Gym project. Do not share before the deadline.

## What it shows

| Checklist item | Where in `script.js` |
|---|---|
| Services as an array of objects | section 1 |
| Cards created from the array | section 3, `showServices` |
| Select or unselect on click | section 4, `toggleService` |
| Total updates live | section 5, `getTotal` and `showTotal` |
| Form with name, email, phone, quantity | `index.html` |
| Validation blocks wrong input | section 6, `validateForm` |
| Errors next to the right field | section 6, `showError` |
| Success message | section 9, submit event |
| Saved in localStorage, restored on reload | section 7 |
| WhatsApp link | section 8, `buildWhatsAppLink` |
| Mouse, keyboard, phone | cards are `<button>` elements; one column under 800px |

## Before using it

Change `WHATSAPP_NUMBER` at the top of `script.js`. The number in the file is a placeholder.

## Things to ask students in review

- Why is each card a `<button>` and not a `<div>`?
- What does `event.preventDefault()` do, and what happens without it?
- Why does the message go through `encodeURIComponent`?
- What is stored in localStorage, and when is it removed?
- What happens to the total if the quantity field is empty?
