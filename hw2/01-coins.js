/** Exercise 01 - Coins **/

const calculateChange = function calculateChange (amount) {
  if (amount > 100) {
    return 'Error: the number is too large';
  }

  if (amount < 0 || !Number.isFinite(amount)) {
    return 'Error: invalid amount';
  }

  let cents = Math.round(amount * 100);

  const dollars = Math.floor(cents / 100);
  cents %= 100;

  const quarters = Math.floor(cents / 25);
  cents %= 25;

  const dimes = Math.floor(cents / 10);
  cents %= 10;

  const nickels = Math.floor(cents / 5);
  cents %= 5;

  const pennies = cents;

  const coins = [
    [dollars, 'dollar'],
    [quarters, 'quarter'],
    [dimes, 'dime'],
    [nickels, 'nickel'],
    [pennies, 'penny'],
  ];

  const result = coins
    .filter(([count]) => count > 0)
    .map(([count, coin]) => {
      const plural = coin == 'penny' ? 'pennies' : `${coin}s`;
      return `${count} ${count == 1 ? coin : plural}`;
    });

  return result.length > 0 ? result.join(', ') : '0 coins';
};


// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(0));
console.log(calculateChange(0.01));
console.log(calculateChange(0.99));
console.log(calculateChange(1));
console.log(calculateChange(100));
console.log(calculateChange(-1));
