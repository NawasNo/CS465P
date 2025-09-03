/** Exercise 01 - Coins **/

// Add your function here 

function calculateChange(dollars){
    if(dollars <= 100){
        let cents = Math.round(dollars * 100)

        const values = {
            dollars: Math.floor(cents / 100),
            quarters: 0,
            dimes: 0,
            nickels: 0,
            pennies: 0
        }

        cents %= 100;

        values.quarters = Math.floor(cents / 25);
        cents %= 25;

        values.dimes = Math.floor(cents / 10);
        cents %= 10;

        values.nickels = Math.floor(cents / 5);
        cents %= 5;
    
        values.pennies = cents;

        return values
    } else{
        return "Error: the number is too large"
    }
}


// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here 
