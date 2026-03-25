//async/await is a syntatic feature of programming languages that allows an asynchronous function to be structured in a way similar to an ordinary synchronus 
//async function always returns a promise 
async function f() {
    return 'hello world';
};

async function f() {
    return new Promise((resolve,reject) => {
          setTimeout => ((resolve(true)),1000);
    });
}
const var1 = f();


async function fetchData() {
  try {
    const data = await fetch("https://badurl.com");
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchData();

//✅ 2. await Keyword
// await makes JavaScript wait for a Promise to resolve.
// ✅ You can use it only inside an async function
// ✅ It pauses the function until the Promise resolves
// ✅ Then, it returns the resolved value

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        },2000);
    });
}

async function showData() {
    console.log("Fetching data.....");
    const result = await getData();

    console.log(result);
    console.log("Done!")

}
showData();