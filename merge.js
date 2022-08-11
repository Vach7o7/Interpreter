function mergeTwoArrays(arr1, arr2) {
    let target = [];
    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) {
            target.push(arr1.shift());
        } else {
            target.push(arr2.shift());
        }
    }
    return [...target, ...arr1, ...arr2];
}

function mergeArrays(arr1, arr2, arr3, arr4, arr5) {
    let arr = [...arguments];
    let newArr = [];
    while (arr.length > 1) {
        let a = arr.shift();
        let b = arr.shift();
        newArr.push(mergeTwoArrays(a, b));
    }
    let tempArr = mergeTwoArrays(...newArr);
    newArr = [];
    newArr.push(tempArr);
    return mergeTwoArrays(...newArr, ...arr);
}

let arr1 = [11, 67, 89, 92];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr3 = [2, 13];
let arr4 = [100, 766];
let arr5 = [4,7,10];
console.log(mergeArrays(arr1, arr2, arr3, arr4, arr5))
