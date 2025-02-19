// utils/mathUtilities.js

const getQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';
    const answer = operator === '+' ? num1 + num2 : num1 - num2;

    return { num1, num2, operator, answer };
};

module.exports = { getQuestion };
