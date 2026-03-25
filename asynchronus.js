//Promise : a promise is a object that represents an operation 
// that might a finish in the future either successfully or with an error.
//Anonymous function = a function without a name, usually used as a one-time callback.

// Think of it like a delivery promise:
// Pending (package on the way)
// Fulfilled/Resolved (delivered ✅)
// Rejected (delivery failed ❌)

// 🔷 Promise States & Flow
// Pending → initial state
// Fulfilled → operation completed successfully
// Rejected → operation failed
// When the promise settles (fulfilled or rejected), you handle the result using:
// .then(onFulfilled) for success
// .catch(onRejected) for errors
// .finally(onFinally) for cleanup (runs in both cases)

//A Promise represents a future value.
//Use .then for success, .catch for errors, .finally for cleanup.

//resolve(value) --> this function helps to tell that "Task is completed"--> .then() method
//reject(error) --> this function helps to tell that "Task is failed" --> .catch() method

// const orderfood = new Promise((resolve,reject)=> {
//     console.log("order Placed...(pending)");
//     setTimeout(() => {
//         const success = true;
//         if(success){
//           console.log("FOOD DELIVERED,THANKS FOR THE ORDER");
//         }
//         else{
//             console.log("CAN'T TAKE YOUR ORDERS");
//         }

//     },1000);
// });
//  orderfood
//     .then((message)=>{
//         console.log("THEN:",message);
//     })
//     .catch((error)=> {
//         console.log("CATCH:",Error);
//     })
//     .finally(() => {
//         console.log("THANKS FOR OREDRING!");
//     })

// //chaining Promises : Promise chaining means connecting multiple 
// // .then() calls one after another so the output of one becomes the input of the next.
// //👉 It lets you run async tasks in sequence, one after another, without callback hell.

// //example of promise chaining
// new Promise((resolve,reject) => {
//     resolve(2);
// })
// .then((val) => {
//     console.log("step 1:",val); // prints 2
//     return val + 1;      //returns 3
// })
// .then((val)=> {
//     console.log("step 2",val); //prints 3
//     return val * 2; //return 6
// })
// .then((val) => { 
//     console.log("step 3",val); //prints previous value 6

// });


//error handling and propogation in promises
// Promise.resolve("start")
//   .then((val) => {
//     console.log(val);
//     throw new Error("Something broke!");
//   })
//   .then(() => {
//     console.log("This will NOT run"); // this is in reject mode.
//   })
//   .catch((err) => {
//     console.log("Caught:", err.message);
//     return "Recovered";
//   })
//   .then((val) => {
//     console.log("After recovery:", val); // "Recovered"
//   })
//   .finally(() => console.log("Cleanup"));

//how to promisify any javascript function show with real world example in simple way
//Promisify = convert a function that uses callbacks into a function that returns a Promise.
//note : new Promise((resolve, reject) => { ... }) --> this is promise constrcutor where we can use callback function here
//resolve() → call this when the async work succeeds
//reject() → call this when it fails
// function getUserPromise() {
//     return new Promise((resolve,reject) => { // this part is callback function
//        setTimeout(()=> {
//         resolve({name : "Fakkiresh", age : "18"});
//        },2000);
//     })
// }
// getUserPromise()
//    .then(user => {
//       console.log("User", user);
//    })
//    .catch(user => {
//     console.log("Error", err);
//    });


//example : how to avoid the callback hell
// function calculatesquare(number) {
//    const promise = new Promise((resolve, reject) => {
//       setTimeout(function () {
//          if (typeof number !== 'number') {
//             return reject(new Error('argument of type number is expected'));
//          }
//          const result = number * number;
//          resolve(result);
//       }, 1000);
//    });
//    return promise;
// }
// calculatesquare(1)
//    .then(value => {
//       console.log(value);
//       return calculatesquare(2);
//    })
//    .then(value => {
//       console.log(value);
//       return calculatesquare(3);
//    })
//    .then(value => {
//       console.log(value);
//       return calculatesquare(4);
//    })
//    .then(value => {
//       console.log(value);
//       return calculatesquare("abc");
//    })
//    //Handles the promise rejections.
//    .catch(err=>{   // --> helps to handle the error in the if we give string or something instead of number
//        console.error("Error:",err.message)
//    });


//promise.resolve : creates a promise that is already resolved(fulfilled) with the value you give it
// let promise = Promise.resolve(10);
// promise.then(value => {
//       console.log("Resolved value:",value);
// });

//promise.reject: Promise.reject() creates a promise that is already rejected with an error or message you provide.
// let promise1 = Promise.reject("Something went wrong");
// promise1.catch(err => {
//         console.log("Caught error:",err);
// });


//promise.all : helps to allow you to run all promises simultaneously

// function askFirstDealer() {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => resolve(8000),3000);
//     });
// }
// function askSecondDealer() {
//     return new Promise((resolve,reject)=> {
//         setTimeout(()=> resolve(12000), 5000);
//     });
// }
// function askThirdDealer() {
//     return new Promise((resolve,reject) => {
//         setTimeout(()=> resolve(10000), 8000);
//     });
// }
// Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()])
//        .then(prices => {
//         console.log(prices)
//     });


//key point : Think of it as: “Run these tasks in parallel and give me all the results together—unless any one fails.”
// const p1= Promise.resolve(1);
// const p2 = new Promise(resolve =>  setTimeout(()=> 
// resolve(2),8000));
const p3 = Promise.resolve(3);

Promise.all([p1,p2,p3])
  .then(results => {
    console.log(results);
  })

.catch (err => {
    console.log("one failed:", err);
});

//fast fail behaviour (first rjection wins)
const ok = Promise.resolve('ok');
const boom = new Promise((_,reject)=> setTimeout(()=> reject(new Error('Boom!')),
1000));
const later = new Promise(res => setTimeout(() => res('late'),500));

Promise.all([ok,boom,later])
.then(values=> {
    console.log(values);
})
.catch(err => {
   console.log("Failed with error messages",err.message);
});

//if you give empty egde array case.
Promise.all([]).then(values => {
  console.log(values); // []
});


//promise.allsetteled() is a javascript method that waits for all the promisesto finish whether they successed(fulfilled) or fail(rejected)
//It returns a new promise that resolves to an array of results, where each result tells:

// status → "fulfilled" or "rejected"
// value → result of fulfilled promise
// reason → error of rejected promise

//exmaple
const a = Promise.resolve("Task1 completed");
const b = Promise.reject("Task2 failed");
const c = new Promise((resolve)=>setTimeout(()=> resolve("Task3 completed"),2000));

Promise.allSettled([a,b,c])
.then(res=>{
   console.log(res);
})
 
//key points 
//1. Promise.all() ==> stops immediately if any promise fails
//2.Promise.allSetteled() ==> waits for every promise,even if some fail.
