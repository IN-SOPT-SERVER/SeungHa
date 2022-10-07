let str: any = "성이름";
let strLength: number = (<string>str).length;
console.log(`${typeof strLength}, ${strLength}`);

let str2: any = "이름성";
let str2Length: number = (str2 as string).length;
console.log(`${typeof str2Length}, ${str2Length}`);


// Anyscript,,,
const anyScript: any = {
    name: "애니스크립트",
    age: 500000
};

