//Promise.race() returns the result of the first settled promise
// (first promise to resolve OR reject).
// If the first promise resolves → it resolves
// If the first promise rejects → it rejects

//example
const p1 = new Promise((resolve) => {
    setTimeout(()=> resolve("P1 done"),3000)
});
const p2 = new Promise((resolve) => {
    setTimeout(()=> resolve("P2 done"),1000)
});
const p3= new Promise((resolve) => {
    setTimeout(()=> resolve("P3 done"),5000)
});

Promise.race([p1,p2,p3])
.then(values => {
    console.log(values);
})


