document.addEventListener('DOMContentLoaded', function () {
    let string = "";
    let input = document.querySelector('.input');

    // Select all buttons
    let buttons = document.querySelectorAll('.button, .zero, .equal, .plus, .minus, .multiply, .divide, .ac, .backspace, .percent');

    // Add click event listener to each button
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            handleButtonClick(e.target.innerHTML);
        });
    });

    // Add keydown event listener to the document
    document.addEventListener('keydown', (e) => {
        // Check if the pressed key corresponds to a button on the calculator
        const keyMappings = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '+': '+', '-': '-', '*': '*', '/': '/', '.': '.',
            'Enter': '=', 'Backspace': '←'
        };
        const keyPressed = keyMappings[e.key];

        if (keyPressed) {
            // Prevent default behavior to avoid unintended effects (e.g., form submission)
            e.preventDefault();

            // Call the function to handle the button click with the corresponding key
            handleButtonClick(keyPressed);
        }
    });

    function handleButtonClick(buttonText) {
        // Check for special buttons
        if (buttonText === 'AC') {
            // Handle clear
            string = "";
        } else if (buttonText === '←') {
            // Handle backspace
            string = string.slice(0, -1);
        } else if (buttonText === '%') {
            // Handle percentage
            string = parseFloat(string) / 100;
        } else if (buttonText === '=') {
            // Evaluate and update the result
            try {
                // Explicitly use '*' for multiplication
                string = eval(string.replace(/x/g, '*')).toString();
            } catch (error) {
                string = "Error";
            }
        } else {
            // Concatenate the button value to the string
            string += buttonText;
        }

        // Update the input field
        input.value = string;
    }
});
