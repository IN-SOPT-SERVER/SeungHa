if (true) {
  var test = 'var !';
  console.log(test);
}

console.log(test); // 됨

if (true) {
  let test2 = "let !";
  console.log(test2);
}

console.log(test2); // 안됨

/* function scope var

function fun() {
  var test = 'var';
  if (true) {
    console.log(test);
  }
  console.log(test)
}

fun()
console.log(test) // 정의되어있지 않았다고 뜸

*/

