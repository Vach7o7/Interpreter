function fc(n) {
	console.log("a");
	if(n <= 1) {
		return 1;
	}
	fc.cache = fc.cache || [];
	if(!fc.cache[n]) {
		fc.cache[n] = n * fc(n - 1);
	}
		return fc.cache[n]; 
}

console.log(fc(5));
console.log(fc(6));
console.log(fc(5));



