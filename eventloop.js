// ✅ Event Loop Flow (Simple Steps)

// JS runs code line by line (Call Stack)
// If it finds async code (setTimeout, fetch, promise):

// It hands the task to Browser Web API


// When async task finishes, it moves to:

// Callback Queue (for setTimeout, events)
// Microtask Queue (for promises)


// Event Loop checks:

// “Is the Call Stack empty?”
// If yes → move the next waiting task to Call Stack


// Repeat forever
console.log("A");

setTimeout(() => {
  console.log("B");
}, 2000);

console.log("C");
// ✅ Why this happens?
// Step-by-step:

// console.log("A") → prints A
// setTimeout is found
// → Timer runs in Web API (browser), NOT in JS engine
// console.log("C") → prints C
// Meanwhile, 2 seconds later:
// Browser moves the callback console.log("B") into Callback Queue
// Event Loop checks:
// “Is JS engine free now?” → YES
// Moves console.log("B") to Call Stack
// → prints B

// ✅ That’s why B comes last.