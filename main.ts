const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromCurrencySelect = document.getElementById("fromCurrency") as HTMLSelectElement;
const toCurrencySelect = document.getElementById("toCurrency") as HTMLSelectElement;
const convertBtn = document.getElementById("convertBtn") as HTMLButtonElement;
const resultText = document.getElementById("result") as HTMLParagraphElement;

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Функция для загрузки списка валют
async function loadCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            fromCurrencySelect.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrencySelect.innerHTML += `<option value="${currency}">${currency}</option>`;
        });

        fromCurrencySelect.value = "USD";
        toCurrencySelect.value = "EUR";
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        resultText.textContent = "Ошибка загрузки данных!";
    }
}

// Функция для конвертации валют
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultText.textContent = "Введите корректную сумму!";
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Ошибка конвертации:", error);
        resultText.textContent = "Ошибка при конвертации!";
    }
}

convertBtn.addEventListener("click", convertCurrency);

// Загружаем список валют при запуске
loadCurrencies();
