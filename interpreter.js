const fs = require('fs');
const txt = fs.readFileSync('./file.txt', 'utf-8');
const line = txt.split('\n');
const vals =  new Map()
let condition_brackets = false;
let istrue = false;
for (let i = 0; i < line.length; i++) {
    let words = line[i].trim().split(/\s+/);
    if(condition_brackets) {
        if(!istrue){
            continue;
        }
    }
    if(words[0] === '}'){
        condition_brackets = false;
    }
    if(words[0] === "val") {
        declare_val(words);
    } else if(words[0] === "print") {
        print_smth(words);
    } else if(words[1] === '=') {
        arithmetic(words);
    } else if(words[0] === 'cnd'){
        istrue = condition(words);
    }
}

function declare_val(words){
    if(/^\d/.test(words[1])){
        console.log("Error: Variable name started with number");
        process.exit(1);
    } else if(words.length === 2) {
        console.log("Warning: Initialize your variable!!!!");
        process.exit(1);
    } else if(words[2] !== '=') {
        console.log("Error: invalid assignment operator");
        process.exit(1);
    } else if(vals.has(words[1])){
        console.log(`Error: Variable with name ${words[1]} already exist`);
        process.exit(1);
    } else vals.set(words[1], words[3]);
}

function print_smth(words){
let str = '';
let val;
let op_in = words.indexOf('#');

words.forEach((element, index) => {
    if(index !== 0){
        if(op_in !== -1 ) {
            if (element !== '#' && index < op_in) {
                str += element + ' ';
            }
        } else str += element + ' ';
        if(element === '#'){
            if(vals.has(words[index + 1])){
                val = vals.get(words[index + 1])
            }
        }
    }
})
    if(!val){
        console.log(str);
    } else console.log(str, val);
}

function arithmetic(words) {
    let operand1;
    let operand2;
    if (!vals.has(words[0])) {
        console.log(`Error: you don't have variable with name ${words[0]}`)
        process.exit(1)
    } else if (words[1] !== '=') {
        console.log("Error: invalid assignment operator");
        process.exit(1);
    } else {
        if (words.length === 3) {
            vals.set(words[0], words[2]);
        } else {
            if (!vals.has(words[2])) {
                if (!isNaN(parseInt(words[2]))) {
                    operand1 = parseInt(words[2]);
                } else operand1 = words[2];
            } else {
                if (!isNaN(vals.get(words[2]))) {
                    operand1 = parseInt(vals.get(words[2]));
                } else operand1 = vals.get(words[2]);
            }


            if (!vals.has(words[4])) {
                if (!isNaN(parseInt(words[4]))) {
                    operand2 = parseInt(words[4]);
                } else operand2 = words[4];
            } else {
                if (!isNaN(vals.get(words[4]))) {
                    operand2 = parseInt(vals.get(words[4]));
                } else operand2 = vals.get(words[4]);
            }

            if (words[3] === "+") {
                vals.set(words[0], operand1 + operand2)
            } else if (words[3] === "-") {
                vals.set(words[0], operand1 - operand2)
            } else if (words[3] === "*") {
                vals.set(words[0], operand1 * operand2)
            } else if (words[3] === "/") {
                vals.set(words[0], operand1 / operand2)
            }else {
                console.log("Error: Unknown arithmetic operator")
                process.exit(1)
            }
        }
    }
}

function condition(words){
    if(words[6] === "{"){
        condition_brackets = true;
    } else {
        console.log("Error: open your condition brackets!!!!!!!")
        process.exit(1);
    }
    let op1;
    let op2;
    if (!vals.has(words[2])) {
        if (!isNaN(parseInt(words[2]))) {
            op1 = parseInt(words[2]);
        } else op1 = words[2];
    } else {
        if (!isNaN(vals.get(words[2]))) {
            op1 = parseInt(vals.get(words[2]));
        } else op1 = vals.get(words[2]);
    }

    if (!vals.has(words[4])) {
        if (!isNaN(parseInt(words[4]))) {
            op2 = parseInt(words[4]);
        } else op2 = words[4];
    } else {
        if (!isNaN(vals.get(words[4]))) {
            op2 = parseInt(vals.get(words[4]));
        } else op2 = vals.get(words[4]);
    }


    if(words[3] === '>'){
        return op1 > op2
    } else if(words[3] === '<'){
        return op1 < op2
    } else if(words[3] === '>='){
        return op1 >= op2
    } else if(words[3] === '<='){
        return op1 <= op2
    } else if(words[3] === '=='){
        return op1 == op2
    } else if(words[3] === '==='){
        return op1 === op2
    } else  console.log("Error: Unknown operator")
    process.exit(1)
}



