const promiseAll = (arrayOfPromises) => {
    if (arrayOfPromises.length === 0) {
        return Promise.resolve([]);
    }

    const promiseValues = [];
    let settledPromisesCount = 0;

    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise, index) => {
            promise
                .then((result) => {
                    settledPromisesCount += 1;
                    promiseValues[index] = result;

                    if (settledPromisesCount === arrayOfPromises.length) {
                        resolve(promiseValues);
                    }
                })
                .catch((reason) => {
                    reject(reason); 
                });
        });
    });
};

// ✅ Rejects after 1 second
const getOneModified = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(1), 1000);
    });
};

// ✅ Resolves after 2 seconds
const getTwo = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(2), 2000);
    });
};

// ✅ Corrected version → Returns a real Promise
const getThree = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(3), 3000);
    });
};

// ✅ Test: This will reject because getOneModified() rejects
promiseAll([getThree(), getTwo(), getOneModified()])
    .then((values) => {
        console.log(values);
    })
    .catch((err) => {
        console.error("Rejected because:", err);
    });
