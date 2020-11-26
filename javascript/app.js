function isLeap(year) { 

    if(year % 4 != 0 || year % 4 === 0 && year % 100 != 0) {
        return false;
    } else if (year % 4 === 0 && year % 100 != 0 && year % 400 === 0) {
        return true
    } else {
        return true;
    }
}

var output = []

function fizzBuzz() {
    var num = output.length+1
    if(num % 3 == 0) {
        num = "Fizz"
    } else if (num % 5 === 0) {
        num = "Buzz"
    }
    output.push(output.length+1)
}
fizzBuzz()
fizzBuzz()
fizzBuzz()
console.log(output)

function fillArray(num) {
    for(var i = 1; i <=num; ++i) {
        output.push(i)
    }
}
