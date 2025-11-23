// --- DOM Elements ---
const resultBoxDom = document.querySelector('.result-box span');
const allLengthChoices = document.querySelectorAll('.length-choices-box span');
const lengthBadge = document.querySelector('.length-box .badge span');
const generateBtn = document.querySelector('.generateBtn');

// Select the BUTTON DIVS, not the empty spans inside them
const btnNumbers = document.querySelector('#include_numbers').parentElement;
const btnSymbols = document.querySelector('#include_symbols').parentElement;

// --- Configuration Data ---
const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
const numbers = '1234567890';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Default State
let passwordLength = 4;

// --- Event Listeners ---

// 1. Length Selection
allLengthChoices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        // Remove active class from all
        allLengthChoices.forEach(el => el.classList.remove('active'));
        
        // Add active class to clicked element
        e.target.classList.add('active');
        
        // Update state
        passwordLength = parseInt(e.target.innerText);
        lengthBadge.innerText = passwordLength;
    });
});

// 2. Settings Toggles (Numbers & Symbols)
// We attach the listener to the button container so it is easy to click
function toggleButton(element) {
    element.classList.toggle('active');
}

btnNumbers.addEventListener('click', () => toggleButton(btnNumbers));
btnSymbols.addEventListener('click', () => toggleButton(btnSymbols));

// 3. Generate Password
generateBtn.addEventListener('click', generatePassword);

// --- Core Function ---

function generatePassword() {
    // 1. Build the pool of characters based on CURRENT active classes
    let currentPool = letters; // Always include letters
    
    // Check if the buttons have the class 'active'
    if (btnNumbers.classList.contains('active')) {
        currentPool += numbers;
    }
    
    if (btnSymbols.classList.contains('active')) {
        currentPool += symbols;
    }

    // 2. Generate the random string
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * currentPool.length);
        result += currentPool.charAt(randomNumber);
    }

    // 3. Display Result
    resultBoxDom.innerText = result;
}
