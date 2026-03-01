# 📌 Events Publishing Guide

All events are already predefined inside their respective category arrays.

Only the images need to be imported and their corresponding files and links.

---

# 📁 Initial State (Default Setup)

* All event objects remain **commented out**.
* The arrays effectively contain **no active elements** until uncommented.
* This ensures no event is visible on the website by default.

Example (Initial State):

```ts
/*
{
  id: "m7",
  slug: "pixellense",
  title: "Pixellense",
  ...
}
*/
```

---

# 🚦 Event Status System

Each event contains a `status` field:

* `Open`
* `Closed`

### Important Rule

* Initially all the events should be commented out until all the details and assests are collected for the same.
* `Open` or `Closed` events should be uncommented when ready to publish.

---

# ✅ How to Publish an Event

### Steps:

1. Locate the corresponding event object (use ctrl+F or cmd+F to search for the event using their id or name).
2. Remove the comment block surrounding the entire object.
3. Ensure the `status` is correctly set (`Open` or `Closed`).
4. Do **not** modify any other property.

---

# ✅ Status Update (Open / Closed only)

1. Locate the corresponding event object (use ctrl+F or cmd+F to search for the event using their id or name).
2. Change the status to `Closed`, by default all the events are set to `Open`. Or Vice Versa.
3. Do **not** modify any other property.

---

# ❌ Strict Rules

* Do not edit `id`
* Do not create new IDs
* Do not duplicate event objects
* Do not partially uncomment fields
* Do not publish incomplete event data

---


This ensures a clean, predictable, and safe publishing workflow for all events.
