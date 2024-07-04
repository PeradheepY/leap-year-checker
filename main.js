//short query selector
function dqs(selector){
    return document.querySelector(selector);
}

//get current year
var fullYear = new Date().getFullYear();
var n1 = fullYear.toString().charAt(0);
var n2 = fullYear.toString().charAt(1);
var n3 = fullYear.toString().charAt(2);
var n4 = fullYear.toString().charAt(3);

//fill on start
dqs('#thousand').value=n1;
dqs('#hundred').value=n2;
dqs('#ten').value=n3;
dqs('#unit').value=n4;

//wheels loop
const dates = [n1,n2,n3,n4];
dates.forEach(getNumbers);
function getNumbers(item, index) {
    switch (item) {
        case '0': item = '-90deg'; break;
        case '1': item = '-126deg'; break;
        case '2': item = '-162deg'; break;
        case '3': item = '-198deg'; break;
        case '4': item = '-234deg'; break;
        case '5': item = '-270deg'; break;
        case '6': item = '-306deg'; break;
        case '7': item = '-342deg'; break;
        case '8': item = '-378deg'; break;
        case '9': item = '-414deg'; break;
    }
    index++;
    dqs('.decagon:nth-child('+index+')').style.setProperty("--nw", item);
} 

// up&down buttons
function goUpDown(numSide,numBox){
    let res = dqs('#'+numBox);
    let num = Number(res.value.trim(" ")); //1
    if(numSide==1) num += 1; else num -= 1;
    if(num >= 10) num.toString().substring(1); 
    function moveWheel(){
        res.value = num;
        let wheel = dqs('.'+numBox);
        let actual = wheel.style.getPropertyValue('--nw');
        let cleaned = actual.substring(1, actual.length - 3);
        let renewed = parseInt(cleaned) + 36;
        if(numSide==0) renewed = parseInt(cleaned) - 36; 
        wheel.style.setProperty('--nw',renewed * -1 + 'deg');
    }
    if((numSide == 0 && num >= 0)  || (numSide == 1 && num <= 99)) moveWheel();
    checkLeapYear();
}

// check leap year
function checkLeapYear() {
    let num1 = dqs('#thousand').value.slice(-1);
    let num2 = dqs('#hundred').value.slice(-1);
    let num3 = dqs('#ten').value.slice(-1);
    let num4 = dqs('#unit').value.slice(-1);
    let newYear = parseInt(num1+num2+num3+num4);
    if(((newYear % 4 == 0) && (newYear % 100 != 0)) || (newYear % 400 == 0)) {
        dqs('#not').classList.add('not');
    } else { 
        dqs('#not').classList.remove('not'); 
    }
}

checkLeapYear();