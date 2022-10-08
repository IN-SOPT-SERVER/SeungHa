const condition: boolean = true;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("promise resolved");
    } else {
        reject(new Error("promise rejected"));
    }
});

promise
.then((resolvedData): void => console.log(resolvedData))
.catch((error): void => console.log(error));

