"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultText = document.getElementById("result");
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
// Словарь с полными названиями валют
const currencyNames = {
    "USD": "Доллар США",
    "EUR": "Евро",
    "RUB": "Российский рубль",
    "KZT": "Казахстанский тенге",
    "GBP": "Британский фунт",
    "CNY": "Китайский юань",
    "JPY": "Японская иена",
    "TRY": "Турецкая лира",
    "UAH": "Украинская гривна",
    "PLN": "Польский злотый"
};
// Функция для загрузки списка валют
function loadCurrencies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const data = yield response.json();
            const availableCurrencies = Object.keys(data.rates).filter(currency => currencyNames[currency]);
            availableCurrencies.forEach(currency => {
                const optionText = `${currencyNames[currency]} (${currency})`;
                fromCurrencySelect.innerHTML += `<option value="${currency}">${optionText}</option>`;
                toCurrencySelect.innerHTML += `<option value="${currency}">${optionText}</option>`;
            });
            fromCurrencySelect.value = "USD";
            toCurrencySelect.value = "EUR";
        }
        catch (error) {
            console.error("Ошибка загрузки данных:", error);
            resultText.textContent = "Ошибка загрузки данных!";
        }
    });
}
// Функция для конвертации валют
function convertCurrency() {
    return __awaiter(this, void 0, void 0, function* () {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            resultText.textContent = "Введите корректную сумму!";
            return;
        }
        try {
            const response = yield fetch(API_URL);
            const data = yield response.json();
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const rate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultText.textContent = `${amount} ${currencyNames[fromCurrency]} = ${convertedAmount} ${currencyNames[toCurrency]}`;
        }
        catch (error) {
            console.error("Ошибка конвертации:", error);
            resultText.textContent = "Ошибка при конвертации!";
        }
    });
}
convertBtn.addEventListener("click", convertCurrency);
// Загружаем список валют при запуске
loadCurrencies();
