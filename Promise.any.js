// Promise.any() returns the first fulfilled (resolved) promise.

// Ignores rejected promises ❌
// Returns as soon as ONE promise resolves ✅
// If all promises reject, it returns an AggregateError

//example
const p1 = new Promise((_, reject) => {
  setTimeout(() => reject("P1 failed"), 500);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => resolve("P2 success"), 2000);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => resolve("P3 success"), 3000);
});

Promise.any([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.error(err));