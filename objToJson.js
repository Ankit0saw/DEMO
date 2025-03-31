const  jsonString= '{"name":"ankit", "age":25,"city":"surathkal"}';
const jsonObject= JSON.parse(jsonString);
console.log(jsonObject.name);


const  objectToConvert= {name:"ankit", age:25,city:"surathkal"};
const jsonStringified= JSON.stringify(objectToConvert);
console.log(jsonStringified);

