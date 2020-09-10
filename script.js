const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
    .then(res => res.json())
    .then(data =>{
        const currency1 = currencyOne.value; //przechowuje pierwszą walutę (PLN)
        const currency2 = currencyTwo.value; //przechowuje drugą walutę (USD)

        const rate = data.rates[currency2];
        rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(5)} ${currency2}`

        amountTwo.value = (amountOne.value * rate).toFixed(2)
    })
}

const swap = () => {
    const backupCurr1 = currencyOne.value;
    const backupCurr2 = currencyTwo.value;
    currencyOne.value = backupCurr2;
    currencyTwo.value = backupCurr1;
    calculate()
}



currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);

swapBtn.addEventListener('click', swap)

calculate()
