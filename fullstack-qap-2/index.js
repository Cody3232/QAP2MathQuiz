const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Initialize session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Set view engine
app.set('view engine', 'ejs');

// Middleware for parsing and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import math utilities (if any)
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');
 
// Sample question generator function
function generateQuestion() {
    const { num1, num2, operator, answer } = getQuestion();
    const question = `${num1} ${operator} ${num2}`;
    return { question, answer };
}

// Home route
app.get('/', (req, res) => {
    res.render('index'); 
});

// Quiz route (GET - show quiz)
app.get('/quiz', (req, res) => {
    const { question, answer } = generateQuestion();
    req.session.correctAnswer = answer;

    const streak = req.session.streak || 0;
    const message = req.session.message || '';

    req.session.message = ''; // Clear the message

    res.render('quiz', { question, streak, message });
});

// Quiz route (POST - handle answer submission)
app.post('/quiz', (req, res) => {
    const { answer: userAnswer } = req.body;
    const correctAnswer = req.session.correctAnswer;
    let streak = req.session.streak || 0;
    let message = '';

    if (parseInt(userAnswer) === correctAnswer) {
        streak++;
        message = "Correct, well done!";
    } else {
        streak = 0;
        message = `Incorrect! The correct answer was ${correctAnswer}.`;
    }

    req.session.streak = streak;
    req.session.message = message;

    res.redirect('/quiz');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
