// --- Configuration ---
const CHARS = {
    letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// --- State ---
let currentLength = 4;
let useNumbers = false;
let useSymbols = false;

// --- Elements ---
const resultEl = document.getElementById('result');
const lengthTextEl = document.getElementById('lengthText');
const lengthOptions = document.querySelectorAll('.length-option');
const btnNumbers = document.getElementById('btnNumbers');
const btnSymbols = document.getElementById('btnSymbols');
const generateBtn = document.getElementById('generateBtn');

// --- Event Listeners ---

// 1. Length Selection
lengthOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all
        lengthOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked
        option.classList.add('active');
        // Update State
        currentLength = parseInt(option.getAttribute('data-length'));
        // Update Text
        lengthTextEl.textContent = currentLength;
    });
});

// 2. Toggle Numbers
btnNumbers.addEventListener('click', () => {
    btnNumbers.classList.toggle('active');
    useNumbers = btnNumbers.classList.contains('active');
});

// 3. Toggle Symbols
btnSymbols.addEventListener('click', () => {
    btnSymbols.classList.toggle('active');
    useSymbols = btnSymbols.classList.contains('active');
});

// 4. Generate Password
generateBtn.addEventListener('click', () => {
    let validChars = CHARS.letters;
    if (useNumbers) validChars += CHARS.numbers;
    if (useSymbols) validChars += CHARS.symbols;

    let password = '';
    for (let i = 0; i < currentLength; i++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        password += validChars[randomIndex];
    }

    resultEl.textContent = password;
});
  
  // Append The Result Data Inside The ( resultBoxDom ) dOM
  resultBoxDom.innerHTML = result;
};
