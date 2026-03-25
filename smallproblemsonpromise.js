//1.Parallel waiters
// Make three promises that resolve after 100ms, 200ms, and 300ms with values 1, 2, 3.
// Use Promise.all to log [1, 2, 3].
const p1 = new Promise(resolve => setTimeout(()=>resolve('1'),100 ));
const p2 = new Promise(resolve => setTimeout(()=>resolve('2'),200));
const p3 = new Promise(resolve => setTimeout(()=>resolve ('3'),300));

Promise.all([p1,p2,p3])
.then(values => {
    console.log(values)
})

.catch(err => {
    console.error('Failed:', err);
});




//2.fail-fast
// Make two resolve and one reject after 150ms.
// Observe the catch firing and confirm the error message.

const ok = Promise.resolve('ok');

const failed = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('failed')), 500) // ← FIXED parentheses
);



const worked = Promise.resolve("worked");

// Promise.all([ok,failed,worked])
// .then(values => {
//     console.log(values);
// })
// .catch(err => {
//     console.log("Failed with error messages", err.message);
// })
//alternate
ok.then(v => console.log('ok settled with:', v));
failed.catch(v => console.log('failed sucessfully:',v.message));
worked.then(v => console.log('worked settled with:', v));

Promise.all([ok, failed, worked])
  .then(values => console.log('all resolved:', values))
  .catch(err => console.log('all rejected with:', err.message));

   


//3.Batch json parsing
// // Fetch two URLs and parse both JSON bodies in parallel with a second Promise.all.

// Two endpoints we want to fetch
const url1 = 'https://jsonplaceholder.typicode.com/users/1';
const url2 = 'https://jsonplaceholder.typicode.com/users/1/posts';

async function getUserAndPosts() {
  // 1) Start both fetches at the same time (parallel)
  const fetchUser = fetch(url1);
  const fetchPosts = fetch(url2);

  // 2) Wait for both HTTP responses (still in parallel)
  const [resUser, resPosts] = await Promise.all([fetchUser, fetchPosts]);

  // Optional: check HTTP status
  if (!resUser.ok || !resPosts.ok) {
    throw new Error(`HTTP error. user=${resUser.status}, posts=${resPosts.status}`);
  }

  // 3) Parse both bodies as JSON in parallel
  const [user, posts] = await Promise.all([resUser.json(), resPosts.json()]);

  return { user, posts };
}

getUserAndPosts()
  .then(({ user, posts }) => {
    console.log('User:', user);
    console.log('Posts:', posts.slice(0, 2)); // show first 2
  })
  .catch(err => {
    console.error('Something failed:', err.message);
  });
``