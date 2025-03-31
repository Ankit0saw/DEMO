console.log("this is an example");
console.log("import to other js file");

var age=25;

function add(a,b){
    return a+b;
}

//always write in the last (to import variables)
module.exports = {
    age,
    add
}