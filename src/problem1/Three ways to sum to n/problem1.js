var sum_to_n_a = function(n) {
    // your code here
    let sum = 0; 
    for (let i = 0; i < n; i++) {
        sum += i + 1;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // your code here
    return Array(n).fill().reduce((sum,x,i)=> sum += i + 1, 0);
};

var sum_to_n_c = function(n) {
    // your code here
    if (n == 0) return 0;
    else return n + sum_to_n_c(n - 1);
};