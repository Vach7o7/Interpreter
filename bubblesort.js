function bubbleSort(arr){
    for (let i = 0; i< arr.length; ++i){
        for (let j = 0; j < arr.length - 1 - i; ++j){
            if(arr[j] > arr[j + 1]){
                let c = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = c;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([1,4,7,2,9]))
