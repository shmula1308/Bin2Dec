const numberInput = document.querySelector('.number-input');
const resultContainer = document.querySelector('#result-number');
const convertBtn = document.getElementById('convert');
const resetBtn = document.getElementById('reset');
const swapUnitBtn = document.getElementById('swap');
const formEl = document.getElementById('formEl');
const notifyWrongInput = document.getElementById('notification');
const allSelectBoxes = document.querySelectorAll('.select-unit');
const fromSelect = document.getElementById('from-unit');
const toSelect = document.getElementById('to-unit');
const bin2DecTitle = document.getElementById('bin2Dec-title');
const dec2BinTitle = document.getElementById('dec2Bin-title');
const binInputLabel = document.getElementById('binary-input');
const decInputLabel = document.getElementById('decimal-input');
const decResultLabel = document.getElementById('decimal-result');
const binResultLabel = document.getElementById('binary-result');
const binInput = document.getElementById('bin-input');
const decInput = document.getElementById('dec-input');
let binNumber = "";
let decNumber = "";
let fromOptionUnit = 'from-binary';
let toOptionUnit = 'to-decimal';



binInput.addEventListener('keyup', function(ev) {
    resultContainer.classList.remove('show-number');
    binNumber = binInput.value;
})

decInput.addEventListener('keyup', function(ev) {
    resultContainer.classList.remove('show-number');
    decNumber = binInput.value;
})

convertBtn.addEventListener('mouseup', (ev) => {
    
    if(fromOptionUnit === 'from-binary') {
        let result = bin2Dec(binNumber);
        if(result === undefined || binNumber === "" ) {
            resultContainer.innerText = "";
            return;
        } 
        displayResult(result);
    } else {
        console.log('hello');
        return;
    }
    
    
    // displayResult(result); 
})



resetBtn.addEventListener('mouseup', resetForm);

swapUnitBtn.addEventListener('mouseup',(ev) => {
    if(fromOptionUnit === 'from-binary') {
        allSelectBoxes[0].options[1].selected = true;
        fromOptionUnit = allSelectBoxes[0].options[1].value;
        
        allSelectBoxes[1].options[1].selected = true;
        toOptionUnit = allSelectBoxes[1].options[1].value;
        resetForm();
        changeLabelsAndTitle ()    
    } else if(fromOptionUnit === 'from-decimal') {
        allSelectBoxes[0].options[0].selected = true;
        fromOptionUnit = allSelectBoxes[0].options[0].value;

        allSelectBoxes[1].options[0].selected = true;
        toOptionUnit = allSelectBoxes[1].options[0].value;
        resetForm();
        changeLabelsAndTitle () 
    }
})

allSelectBoxes.forEach(selBox => {
    Array.from(selBox).forEach(option => {
        option.addEventListener('click',(ev) => {
             if(ev.target.value === 'from-decimal') {
                toSelect[1].selected = true;
                fromOptionUnit = ev.target.value;
                toOptionUnit = toSelect[1].value;
                resetForm();
                changeLabelsAndTitle(); 
             } else if(ev.target.value === 'from-binary') {
                toSelect[0].selected = true;
                fromOptionUnit = ev.target.value;
                toOptionUnit = toSelect[0].value;
                resetForm();
                changeLabelsAndTitle(); 
             } else if(ev.target.value === 'to-binary') {
                fromSelect[1].selected = true;
                toOptionUnit = ev.target.value;
                fromOptionUnit = fromSelect[1].value;
                resetForm();
                changeLabelsAndTitle();
             } else if (ev.target.value === 'to-decimal') {
                fromSelect[0].selected = true;
                toOptionUnit = ev.target.value;
                fromOptionUnit = fromSelect[0].value;
                resetForm();
                changeLabelsAndTitle(); 
             }
        })
    })
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
    return decNumber === 0 ? 0 : decNumber;
}

function dec2Binary() {

}

function resetForm() {
    resultContainer.innerHTML = "";
    binNumber = "";
    // numberInput.value = "";
    binInput.value = "";
    decInput.value = "";
    notifyWrongInput.classList.remove('active-alert');
    resultContainer.classList.remove('show-number');
}

function displayResult(result) {
    resultContainer.textContent = result;
    resultContainer.classList.add('show-number');
}

function nonBinaryInput(){
    if(binNumber.split("").some(num => num != '0' && num != '1')) {
        notifyWrongInput.classList.add('active-alert');
    } else {
        notifyWrongInput.classList.remove('active-alert');
    }
}

function changeLabelsAndTitle () {
   if(fromOptionUnit === 'from-decimal') {
    bin2DecTitle.style.display = 'none';
    dec2BinTitle.style.display = 'block';
    binInputLabel.style.display = 'none';
    decInputLabel.style.display = 'block';
    decResultLabel.style.display = 'none';
    binResultLabel.style.display = 'block';
    binInput.style.display = 'none';
    decInput.style.display = 'block';

   } else {
    bin2DecTitle.style.display = 'block';
    dec2BinTitle.style.display = 'none';
    binInputLabel.style.display = 'block';
    decInputLabel.style.display = 'none';
    decResultLabel.style.display = 'block';
    binResultLabel.style.display = 'none';
    binInput.style.display = 'block';
    decInput.style.display = 'none';
   }
}



