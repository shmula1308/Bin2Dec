const numberInput = document.querySelector('.number-input');
const resultContainer = document.querySelector('.result-container');
const convertBtn = document.getElementById('convert');
const resetBtn = document.getElementById('reset');
const swapBtn = document.getElementById('swap');
const formEl = document.getElementById('formEl');
const notifyWrongInput = document.getElementById('notification');

let binNumber = "";

numberInput.addEventListener('keyup', function(ev) {
    binNumber = numberInput.value;
})

convertBtn.addEventListener('mouseup', (ev) => {
    let result = bin2Dec(binNumber);
   
    if(result === undefined || binNumber === "" ) {
        resultContainer.innerText = "";
        return;
    } 
    
    displayResult(result); 
})

resetBtn.addEventListener('mouseup', (ev) => {
    resultContainer.innerHTML = "";
    binNumber = "";
    notifyWrongInput.classList.remove('active-alert');
    resultContainer.classList.remove('show-number');
})

function bin2Dec(binNumber) {
    let decNumber = 0;
    let power = binNumber.length - 1;
    for(let i = 0; i < binNumber.length; i++) {
        if(binNumber[i] !== '0' && binNumber[i] !== '1' ) {
            nonBinaryInput();
            return;
        } 
            decNumber += (binNumber[i] * 2**power);
            power--;
        
    }
    nonBinaryInput()
    return decNumber === 0 ? "" : decNumber;
}

function displayResult(result) {
    resultContainer.textContent = result;
    // resultContainer.classList.remove('show-number');
    resultContainer.classList.add('show-number');
}

function nonBinaryInput(){
    if(binNumber.split("").some(num => num != '0' && num != '1')) {
        notifyWrongInput.classList.add('active-alert');
    } else {
        notifyWrongInput.classList.remove('active-alert');
    }
}



