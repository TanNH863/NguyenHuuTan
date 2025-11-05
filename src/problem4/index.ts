// Naive approach
// Time complexity: O(n)
// Efficient for small value of n
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Recursive approach
// Time complexity: O(n)
// Efficient for small value of n
function sum_to_n_b(n: number): number {
    if (n == 1) return n;
    return n + sum_to_n_b(n - 1);
}

// Formula approach
// Time complexity: O(1)
// Efficient for any value of n
function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}
console.log("Naive approach:", sum_to_n_a(5))
console.log("Recursive approach:", sum_to_n_b(6))
console.log("Formula approach:", sum_to_n_b(7))