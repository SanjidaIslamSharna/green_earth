1) What is the difference between var, let, and const?
   ans:
 **  var**

1.Function-scoped (available inside the function where it is declared).
2.Can be re-declared and re-assigned.
3.Gets hoisted and initialized with undefined.

**let**

1.Block-scoped (only available inside { } where it is declared).
2.Cannot be re-declared in the same scope but can be re-assigned.
3.Hoisted but not initialized (using it before declaration gives an error).

**const**

1.Block-scoped (like let).
2.Cannot be re-declared or re-assigned.
3.Must be initialized at the time of declaration.

2) What is the difference between map(), forEach(), and filter()?
   ans:

   1. map()
Purpose: Used when you want to create a new array by transforming each element.
Returns: A new array with the transformed values.
Effect on Original Array: Does not modify the original array.
Best Use Case: When you need to apply a function to every element and keep the results.

2. forEach()
Purpose: Used to execute a function on each array element.
Returns: Nothing (undefined).
Effect on Original Array: Does not return a new array, but you can modify the original array inside it if needed.
Best Use Case: When you want to perform side effects like printing values, updating variables, or modifying an external object.

3. filter()
Purpose: Used to keep only the elements that pass a certain condition.
Returns: A new array with only the elements that satisfy the condition.
Effect on Original Array: Does not modify the original array.
Best Use Case: When you want to remove unwanted elements or extract a subset of data.

3) What are Arrow Functions in ES6?
   ans:

Arrow functions are a shorter and cleaner way to write functions introduced in ES6.
They are especially useful for writing small, one-line functions.


4) How Does Destructuring Assignment Work in ES6?
 ans:

Destructuring assignment is a feature in ES6 that allows you to unpack values from arrays or properties from objects into separate variables easily.
It makes the code shorter, cleaner, and more readable compared to traditional ways of accessing data.


5) Explain template literals in ES6. How are they different from string concatenation?
   ans:
   Template literals in ES6 are string literals enclosed by backticks (`) instead of quotes.
    They allow embedded expressions using ${expression} for easier dynamic content.
    Unlike traditional string concatenation using +, template literals support multi-line strings directly. They make code cleaner, more readable, and easier to maintain.

