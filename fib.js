function fib(n) {
	console.log("fib");
	if (n <= 0) {
		return -1;
	}
	if(n < 3) {
		return 1;
	}
	fib.cache = fib.cache || [];
	if(!fib.cache[n]) {
		fib.cache[n] = fib(n - 1) + fib(n - 2);
	}
	return fib.cache[n];
}

console.log(fib(5));
console.log(fib(6));
console.log(fib(5));
