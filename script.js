const plusC = document.querySelector('#plus-c');
const minusC = document.querySelector('#minus-c');
const plusF = document.querySelector('#plus-f');
const minusF = document.querySelector('#minus-f');

const inputC = document.querySelector('#correct');
const inputF = document.querySelector('#false');
const inputT = document.querySelector('#total');
const inputR = document.querySelector('#rat');

const ratio = document.querySelector('.ratio');

const refresh = document.querySelector('#refresh');
const copy = document.querySelector('#copy');
const notif = document.querySelector('#notification');

const handleValueChange = () => {
    if (parseInt(inputT.value) === 0) {
        ratio.classList.remove('active');
    } else {
        inputT.value = parseInt(inputC.value) + parseInt(inputF.value);
        let a = 100 * parseInt(inputC.value) / parseInt(inputT.value);
        inputR.value = a.toFixed(2) + '%';
        ratio.classList.add('active');
    }
    localStorage.setItem('COUNTIT-correct', inputC.value);
    localStorage.setItem('COUNTIT-false', inputF.value);
    localStorage.setItem('COUNTIT-total', inputT.value);
    localStorage.setItem('COUNTIT-ratio', inputR.value);
}

const showNotification = (msg) => {
    notif.classList.add('show');
    notif.innerHTML = msg;
    setTimeout(() => {
        notif.classList.remove('show');
    }, 2000);
}


inputC.value = localStorage.getItem('COUNTIT-correct') || 0;
inputF.value = localStorage.getItem('COUNTIT-false') || 0;
inputT.value = localStorage.getItem('COUNTIT-total') || 0;
inputR.value = localStorage.getItem('COUNTIT-ratio') || 0;
handleValueChange();

plusC.addEventListener('click', () => {
    inputC.value = parseInt(inputC.value) + 1;
    handleValueChange();
});

minusC.addEventListener('click', () => {
    if (parseInt(inputC.value) > 0 && parseInt(inputT.value) > 0) {
        inputC.value = parseInt(inputC.value) - 1;
        handleValueChange();
    }
});

plusF.addEventListener('click', () => {
    inputF.value = parseInt(inputF.value) + 1;
    handleValueChange();
});

minusF.addEventListener('click', () => {
    if (parseInt(inputF.value) > 0 && parseInt(inputT.value) > 0) {
        inputF.value = parseInt(inputF.value) - 1;
        handleValueChange();
    }
});

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', handleValueChange);
});

refresh.addEventListener('click', () => {
    inputC.value = 0;
    inputF.value = 0;
    inputT.value = 0;
    inputR.value = 0;
    handleValueChange();
})

// copy the text from inputR to clipboard on click
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(`Total: ${inputT.value} | Correct: ${inputC.value} | False: ${inputF.value} | Ratio: ${inputR.value}`);
    showNotification('<i class="fas fa-check-circle"></i>&nbsp;&nbsp;Data copied to clipboard!');
});