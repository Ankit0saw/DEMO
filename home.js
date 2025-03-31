var imported=require('./importEg');
console.log("additional line");

var age=imported.age;
var add=imported.add(2,3);

console.log('age: ',age);
console.log('add: ',add);