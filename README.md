1) What is the difference between var, let, and const?

Ans: Difference by definition :
        var => glabal scope
        let => block scope
        const => block scope

2) What is the difference between map(), forEach(), and filter()? 

Ans: Difference by definition :
        map() => this method create new array
        forEach() => this method work as like for of loop but not returns new array
        filter() => this method is condition based with applicable all elements and returns new array

3) What are arrow functions in ES6?

Ans: Those fucntion are defined like 'let or, const function Name = () => {}' is called arrow functions in ES6.

4) How does destructuring assignment work in ES6?

Ans: Described by example: (Object and Array Destructuring)

Object destructuring:
        let product = {prodcutName: 'Xiomi', model: 'A2 Lite', price: 17500};

        let {prodcutName, model, price} = product;

Array destructuring:
        let numbers = [44, 56, 98];

        let [num1 , num2] = numbers;

5) Explain template literals in ES6. How are they different from string concatenation?

Ans: 
  Explanation:  Template literals are define by ` ` (backticks)  
        let poem2 = `
                A quiet breeze, a fleeting song,
                The day is short, the night is long.
                Yet in the dark, the stars still glow,
                A gentle guide for hearts that roam.
        `

  Difference: 
  Template literals => easily can write multi line text

        let poem2 = `
                A quiet breeze, a fleeting song,
                The day is short, the night is long.
                Yet in the dark, the stars still glow,
                A gentle guide for hearts that roam.
        `
  String concatenation => not easily can write multi line text

        let poem1 = 'A quiet breeze, a fleeting song, \n' +
                'The day is short, the night is long. \n' +
                'Yet in the dark, the stars still glow, \n' +
                'A gentle guide for hearts that roam. \n'

Same output on both process but template literals process is more easy.