var INVEST_MAX_AMOUNT = 2
var INVEST_MIN_AMOUNT = 0.01

const depositFormInput = document.querySelector('#depositFormInput')
const depositMinText = document.querySelector('#depositFormTextMin')
const depositMaxText = document.querySelector('#depositFormTextMax')
const depositFormInvestment = document.querySelector('#depositFormInvestment')
const depositFormPerHour = document.querySelector('#depositFormPerHour')
const depositFormPer12Hours = document.querySelector('#depositFormPer12Hours')
const depositFormPerDay = document.querySelector('#depositFormPerDay')
const depositFormAfter10Days = document.querySelector('#depositFormAfter10Days')
const depositFormBtn = document.querySelector('#depositFormBtn')

var oldInputValue = ''
const depositFormFinishDate = document.querySelector('#depositFormFinishDate')
depositFormInput.addEventListener('input', () => {
    function IsDecimalValue(el){
        var ex = /^\d*\.?\d{0,2}$/;
        if(ex.test(el.value) == false){
            el.value = el.value.substring(0,el.value.length - 1);
        }
        if(ex.test(el.value) == false){
            el.value = '';
        }
    }
    IsDecimalValue(depositFormInput)
    let valueBNB = depositFormInput.value
    if (valueBNB < INVEST_MIN_AMOUNT) {
        depositMaxText.classList.remove('deposit-form__text--error')
        depositMinText.classList.add('deposit-form__text--error')
    } else if (valueBNB > INVEST_MAX_AMOUNT) {
        valueBNB = INVEST_MAX_AMOUNT
        depositFormInput.value = valueBNB
        depositMinText.classList.remove('deposit-form__text--error')
        depositMaxText.classList.add('deposit-form__text--error')

        depositFormInvestment.innerText = valueBNB
        const calcDayReward = (valueBNB / 100 * parseFloat(20))

        if (oldInputValue !== valueBNB) {
            animateValue(depositFormPerHour, 0, (calcDayReward / 24).toFixed(4), 500)
            animateValue(depositFormPer12Hours, 0, (calcDayReward / 24 * 12).toFixed(4), 500)
            animateValue(depositFormPerDay, 0, calcDayReward.toFixed(4), 500)
            animateValue(depositFormAfter10Days, 0, (valueBNB * 2).toFixed(4), 500)
        }


        const dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() + 10);
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let nameMonth = month[dateEnd.getMonth()];
        depositFormFinishDate.innerText = dateEnd.getFullYear() + '-' + nameMonth + '-' + (dateEnd.getDate() < 10 ? '0' + dateEnd.getDate() : dateEnd.getDate()) + ''
    } else {
        depositMinText.classList.remove('deposit-form__text--error')
        depositMaxText.classList.remove('deposit-form__text--error')
        depositFormInvestment.innerText = valueBNB

        const calcDayReward = (valueBNB / 100 * parseFloat(20))

        if (oldInputValue !== valueBNB) {
            animateValue(depositFormPerHour, 0, (calcDayReward / 24).toFixed(4), 500)
            animateValue(depositFormPer12Hours, 0, (calcDayReward / 24 * 12).toFixed(4), 500)
            animateValue(depositFormPerDay, 0, calcDayReward.toFixed(4), 500)
            animateValue(depositFormAfter10Days, 0, (valueBNB * 2).toFixed(4), 500)
        }

        const dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() + 10);
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let nameMonth = month[dateEnd.getMonth()];
        depositFormFinishDate.innerText = dateEnd.getFullYear() + '-' + nameMonth + '-' + (dateEnd.getDate() < 10 ? '0' + dateEnd.getDate() : dateEnd.getDate()) + ''
    }
    oldInputValue = valueBNB
})
function animateValue(obj, start, end, duration) {
    const size = end.split(".")[1] ? end.split(".")[1].length : 0;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = parseFloat(progress * (end - start) + start).toFixed(size)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
depositFormBtn.addEventListener('click', () => {
    if (depositFormInput.value.length > 0) {
        alert(depositFormInput.value)
    }
})