window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupInitialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

const defaultRate = 6.5;
const monthsInYear = 12;

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupInitialValues() {
  const amountInput = document.getElementById("loan-amount");
  const yearInput = document.getElementById("loan-years");
  const rateInput = document.getElementById("loan-rate");
  amountInput.value = 40000;
  yearInput.value = 10;
  rateInput.value = defaultRate;
}


// Get the current values from the UI
// Update the monthly payment
function update() {
  const curValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(curValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const principle = values.amount;
  const rate = getMonthlyRate(values.rate);
  const numberOfPayments = getNumberOfPayments(values.years);
  const numerator = calculateNumerator(principle, rate);
  const denominator = calculateDenominator(numberOfPayments, rate);

  const monthlyPayment = numerator / denominator;
  console.log(monthlyPayment);
  return roundTwoDecimal(monthlyPayment);
}


function getMonthlyRate(rate) {
  const decimalRate = cleanRate(rate);
  return decimalRate / monthsInYear;
}

/*
  Our rate needs to be in decimal format, but rates are often discussed as percentages
  Convert percentage to decimal if necessary.
  If invalid number, use default rate
 */
function cleanRate(rate) {
  if (rate > 1 && rate < 100) {
    return rate / 100;
  }
  if (rate > 0 && rate < 1) {
    return rate;
  }
  return defaultRate / 100;
}

function getNumberOfPayments(years) {

  return years * monthsInYear;
}

function calculateNumerator(principle, rate) {
  return principle * rate;
}

function calculateDenominator(numberOfPayments, rate) {
  const base = 1 + rate;
  const power = -1 * numberOfPayments
  return 1 - Math.pow(base, power);
}

function roundTwoDecimal(number) {
  return Math.round((number * 100)) / 100;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyOutput = document.querySelector("#monthly-payment");
  monthlyOutput.innerText = "$" + monthly;
}
