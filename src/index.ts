import axios from "axios";
import inquirer from "inquirer";

const currencies = ['USD', 'EUR', 'GBP', 'PLN', 'CAD', 'JPY', 'EGY'];

const questions = [
  {
    type: 'list',
    name: 'from',
    message: 'Convert From:',
    choices: currencies
  },
  {
    type: 'list',
    name: 'to',
    message: 'Convert To:',
    choices: currencies
  },
  {
    type: 'number',
    name: 'amount',
    message: 'Amount to convert:',
    validate: (value: number) => (!isNaN(value) ? true : 'Please enter a valid number')
  }
];

const convertCurrency = async (from: any, to: string | number, amount: any) => {
  const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  return response.data.rates[to].toFixed(2);
};

const run = async () => {
  console.log('💰 Currency Converter');
  const answers = await inquirer.prompt(questions);
  const { from, to, amount } = answers;
  const convertedAmount = await convertCurrency(from, to, amount);
  console.log(`${amount} ${from} = ${convertedAmount} ${to}`);
};

run();
