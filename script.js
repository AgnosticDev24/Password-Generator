// Result Box 
let resultBoxDom = document.querySelector('.result-box span');

// All Length Choices Span
let allLengthChoices = document.querySelectorAll('.length-choices-box span');

// Length Badge
let lengthBadge = document.querySelector('.length-box .badge span');

// Settings Options Buttons
let includeNumbers = document.querySelector('#include_numbers');
let includeSymbols = document.querySelector('#include_symbols');

// Generate Button
let generateBtn = document.querySelector('.generateBtn');

// - - - - - Sub Variables - - - - - //

// Charaters
let characters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

// Characters Length
let charactersLength = 4;

// - - - - - Events - - - - - //

// When Click On Generate Button Call ( Generate Password ) Function
generateBtn.addEventListener('click', generatePassword);

// When Click On include Numbers And Include Symbols Buttons Call ( Settings ) Function
includeNumbers.addEventListener('click', settings);
includeSymbols.addEventListener('click', settings);

// - - - - - Functions - - - - - //

// Length Choices Function
(function lengthChoices() {
  // Loop On All The Choices
  allLengthChoices.forEach(choice => {

    // When Click On Any Choice
    choice.addEventListener('click', (e) => {
      // Call ( Remove All Actives choices ) Function
      removeAllActive(allLengthChoices);
      // Set The Target Element Inner-Text Into The charactersLength After The Confert To Number
      charactersLength = parseInt(e.target.innerText);
      // Set The Target Element Inner Text Into The lengthBadge
      lengthBadge.innerText = e.target.innerText;
      // Add Active Class On Target Element
      e.target.classList.add('active');
    });

  });
})();

// Remove All Actives choices Function
function removeAllActive(targetElements) {
  // Loop On All Target targetElements
  targetElements.forEach(activeEle => {
    // Remove Each Active From The activeEle ( targetElements )
    activeEle.classList.remove('active');
  });
};

// Settings Functions
function settings(event) {
  // Event Target Element
  let targetOption = event.target;
  // Targe Parent Element
  let targetParentElement = targetOption.parentElement;
  // Toggle Class Active On The Target-Option Parent Element
  targetParentElement.classList.toggle('active');
  // Check If The Target Parent Element Is Contains Class ( Active ) Return True Else Return False
  let isParentActive = (targetParentElement.classList.contains('active') ? true : false);

  // If The Target-Option Is Include-Numbers Button
  if(targetOption == includeNumbers){
    // If The Target Parent Element Is Active
    if(isParentActive){
      // Push The Target Option Data Into The Characters
      characters += targetOption.dataset.value;
    }else{ // else
      // Remove All The Numbers From The Characters
      characters = characters.replace(/[0-9]/gi, '');
    };
  }else{ // Else He Is Not Include-Numbers Button
    // If The Target Parent Element Is Active
    if(isParentActive){
      // Push The Target Option Data Into The Characters
      characters += targetOption.dataset.value;
    }else{  // else
      // Remove All The Symbols From The Characters
      characters = characters.replace(/[\W_]/gi, '');
    };
  };
};

// Generate Password Function
function generatePassword() {
  // Result
  let result = '';

  // Loop On All The CharachersLength Variable
  for(var i = 0; i < charactersLength; i++){
    // Get Random Number From The Characters Variable
    let randomNumber = Math.floor(Math.random() * characters.length);
    // Get Random Character From The Characters Variable Every Loop Length And Push Him Into The Result
    result += characters.slice(randomNumber, randomNumber + 1);
  };
  
  // Append The Result Data Inside The ( resultBoxDom ) dOM
  resultBoxDom.innerHTML = result;
};