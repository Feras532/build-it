let totalQuestions = 4;
let currentQuestion = 1;

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        // Hide current question
        document.getElementById(`question${currentQuestion}`).classList.remove('active');

        // Show next question
        currentQuestion += 1;
        let nextQuestion = document.getElementById(`question${currentQuestion}`);
        nextQuestion.style.opacity = 0;
        nextQuestion.classList.add('active');
        setTimeout(() => {
            nextQuestion.style.opacity = 1;
        }, 100);

        // Update progress bar
        let progress = ((currentQuestion - 1) / totalQuestions) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        // Hide current question
        document.getElementById(`question${currentQuestion}`).classList.remove('active');

        // Show previous question
        currentQuestion -= 1;
        let previousQuestion = document.getElementById(`question${currentQuestion}`);
        previousQuestion.style.opacity = 0;
        previousQuestion.classList.add('active');
        setTimeout(() => {
            previousQuestion.style.opacity = 1;
        }, 100);

        // Update progress bar
        let progress = ((currentQuestion - 1) / totalQuestions) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
    }
}