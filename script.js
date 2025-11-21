import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase Initialization (MANDATORY for Canvas environment)
setLogLevel('debug');
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Application Logic ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Authentication Logic
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("Firebase Auth failed:", error);
    }


    // 2. Character sets
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+=-[]{};:.,<>/';

    // 3. DOM elements
    const resultSpan = document.getElementById('result');
    const lengthText = document.getElementById('lengthText');
    const lengthOptionsContainer = document.getElementById('lengthOptionsContainer');
    const generateBtn = document.getElementById('generateBtn');
    const resultBox = document.getElementById('resultBox');
    const messageBox = document.getElementById('messageBox');

    // Settings Toggles (Numbers and Symbols)
    const btnNumbers = document.getElementById('btnNumbers');
    const btnSymbols = document.getElementById('btnSymbols');
    
    // Initial state
    let passwordLength = 4;
    let includeNumbers = false;
    let includeSymbols = false;
    // Lowercase and Uppercase are always included (implicit in logic)

    /**
     * Toggles the state of a setting button and updates the corresponding state variable.
     * This function uses classList.toggle(), which returns a boolean indicating the new state.
     * @param {HTMLElement} btn The toggle button element.
     * @param {string} stateName The name of the global state variable to update ('includeNumbers' or 'includeSymbols').
     */
    function handleToggle(btn, stateName) {
        // Toggle the visual state and get the resulting state (true/false)
        const isActive = btn.classList.toggle('active');
        
        btn.setAttribute('data-active', isActive);

        // Update the JS state variable
        if (stateName === 'includeNumbers') {
            includeNumbers = isActive;
        } else if (stateName === 'includeSymbols') {
            includeSymbols = isActive;
        }
        // Generate new password when settings change
        generatePassword();
    }

    /**
     * Generates the password based on current settings.
     */
    function generatePassword() {
        let charPool = lower + upper;

        if (includeNumbers) {
            charPool += numbers;
        }
        if (includeSymbols) {
            charPool += symbols;
        }

        // Enforce at least one character set (though we default to lower+upper)
        if (charPool.length === 0) {
            resultSpan.textContent = 'Error: No characters selected.';
            return;
        }

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }

        resultSpan.textContent = password;
    }

    /**
     * Handles the selection of a password length option.
     * @param {Event} event The click event object.
     */
    function handleLengthSelection(event) {
        const target = event.target;
        if (target.classList.contains('length-option')) {
            // Remove active class from all options
            document.querySelectorAll('.length-option').forEach(opt => opt.classList.remove('active'));

            // Add active class to the clicked option
            target.classList.add('active');

            // Update state and display
            passwordLength = parseInt(target.getAttribute('data-length'), 10);
            lengthText.textContent = passwordLength;

            // Generate a new password immediately after changing length
            generatePassword();
        }
    }

    /**
     * Copies the password to the clipboard and shows a temporary success message.
     */
    function copyToClipboard() {
        const password = resultSpan.textContent;
        if (password === 'Click Generate' || password.startsWith('Error')) {
            return;
        }

        // Use document.execCommand('copy') for better compatibility in iframe
        const tempInput = document.createElement('textarea');
        tempInput.value = password;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show confirmation message
        messageBox.classList.add('show');
        
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 1500);
    }

    // --- Event Listeners ---
    
    // 1. Generate Button
    generateBtn.addEventListener('click', generatePassword);
    
    // 2. Length Options (The line in question)
    lengthOptionsContainer.addEventListener('click', handleLengthSelection);

    // 3. Setting Toggles
    btnNumbers.addEventListener('click', () => handleToggle(btnNumbers, 'includeNumbers'));
    btnSymbols.addEventListener('click', () => handleToggle(btnSymbols, 'includeSymbols'));
    
    // 4. Result Box (Copy)
    resultBox.addEventListener('click', copyToClipboard);

    // Initial generation
    generatePassword();
});
