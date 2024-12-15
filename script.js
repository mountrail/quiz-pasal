const questions = [
    { number: 244, name: "Pemalsuan Mata Uang dan Uang Kertas", punishment: "15 tahun", type: "KUHP" },
    { number: 253, name: "Pemalsuan Materai dan Merek", punishment: "7 tahun", type: "KUHP" },
    { number: 263, name: "Pemalsuan Surat", punishment: "6 tahun", type: "KUHP" },
    { number: 284, name: "Perzinahan", punishment: "9 bulan", type: "KUHP" },
    { number: 285, name: "Pemerkosaan dengan kekerasan", punishment: "12 tahun", type: "KUHP" },
    { number: 289, name: "Pencabulan dengan kekerasan", punishment: "9 tahun", type: "KUHP" },
    { number: 303, name: "Perjudian", punishment: "10 tahun", type: "KUHP" },
    { number: 324, name: "Perdagangan Manusia", punishment: "12 tahun", type: "KUHP" },
    { number: 333, name: "Merampas Kemerdekaan Orang", punishment: "8 tahun", type: "KUHP" },
    { number: 338, name: "Pembunuhan tidak berencana", punishment: "15 tahun", type: "KUHP" },
    { number: 340, name: "Pembunuhan berencana", punishment: "Seumur hidup atau hukuman mati", type: "KUHP" },
    { number: 351, name: "Penganiayaan", punishment: "2 tahun 8 bulan", type: "KUHP" },
    { number: 362, name: "Pencurian", punishment: "5 tahun", type: "KUHP" },
    { number: 368, name: "Pemerasan dan Pengancaman", punishment: "9 tahun", type: "KUHP" },
    { number: 372, name: "Penggelapan", punishment: "4 tahun", type: "KUHP" },
    { number: 378, name: "Penipuan", punishment: "4 tahun", type: "KUHP" },
    { number: 406, name: "Menghancurkan atau Merusakkan Barang", punishment: "2 tahun 8 bulan", type: "KUHP" },
    { number: 14, name: "Berita Bohong", punishment: "2 tahun", type: "KUHP" },

    // { number: 20, name: "Aturan Penahanan", type: "KUHAP" },
    // { number: 21, name: "Syarat dan Alasan Penahanan", type: "KUHAP" },
    // { number: 22, name: "Jenis-Jenis Penahanan", type: "KUHAP" },
    // { number: 238, name: "Pemeriksaan Banding oleh Pengadilan Tinggi", type: "KUHAP" },
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    // Reset game state
    selectedQuestions = shuffleArray([...questions]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    document.getElementById("question-container").style.display = "block";
    document.getElementById("end-container").style.display = "none";

    // Populate randomized list
    const randomizedList = shuffleArray([...questions]);
    const listElement = document.getElementById("randomized-list");
    listElement.innerHTML = "";
    randomizedList.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name;
        li.onclick = () => {
            document.getElementById("answer").value = item.name;
        };
        listElement.appendChild(li);
    });

    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
        const question = selectedQuestions[currentQuestionIndex];

        // Randomize question type (50% chance for reversed question)
        if (Math.random() < 0.5) {
            document.getElementById("question-number").textContent = `(${question.type}) Nomor Pasal: ${question.number}`;
            document.getElementById("answer").setAttribute("data-correct-answer", question.name);
            document.getElementById("answer").setAttribute("data-question-type", "number");
        } else {
            document.getElementById("question-number").textContent = `(${question.type}) Nama Pasal: ${question.name}`;
            document.getElementById("answer").setAttribute("data-correct-answer", question.number);
            document.getElementById("answer").setAttribute("data-question-type", "name");
        }

        document.getElementById("punishment").setAttribute("data-correct-punishment", question.punishment);
        document.getElementById("answer").value = "";
        document.getElementById("punishment").value = "";
    } else {
        endGame();
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const userPunishment = document.getElementById("punishment").value.trim();
    const correctAnswer = document.getElementById("answer").getAttribute("data-correct-answer");
    const correctPunishment = document.getElementById("punishment").getAttribute("data-correct-punishment");
    const questionType = document.getElementById("answer").getAttribute("data-question-type");

    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    const isPunishmentCorrect = userPunishment.toLowerCase() === correctPunishment.toLowerCase();

    userAnswers.push({
        question: selectedQuestions[currentQuestionIndex],
        userAnswer: userAnswer,
        userPunishment: userPunishment,
        isAnswerCorrect: isAnswerCorrect,
        isPunishmentCorrect: isPunishmentCorrect,
        questionType: questionType,
    });

    if (isAnswerCorrect && isPunishmentCorrect) {
        score++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function endGame() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("end-container").style.display = "block";
    document.getElementById("final-score").textContent = `Skor Anda: ${score}/${selectedQuestions.length}`;

    const reviewContainer = document.getElementById("question-review");
    reviewContainer.innerHTML = "";

    userAnswers.forEach((entry) => {
        const p = document.createElement("p");
        p.innerHTML = `Pasal: <b>${entry.questionType === "name" ? entry.question.name : entry.question.number}</b> - 
            Jawaban Anda: <span class="${entry.isAnswerCorrect ? 'correct' : 'incorrect'}">${entry.userAnswer}</span> ${!entry.isAnswerCorrect ? `(Koreksi: ${entry.questionType === "name" ? entry.question.number : entry.question.name})` : ''}
            <br>Punishment: <span class="${entry.isPunishmentCorrect ? 'correct' : 'incorrect'}">${entry.userPunishment}</span> ${!entry.isPunishmentCorrect ? `(Koreksi: ${entry.question.punishment})` : ''}`;
        reviewContainer.appendChild(p);
    });
}

// Allow pressing Enter to submit answer
document.getElementById("answer").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
    }
});

document.getElementById("punishment").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
    }
});

// Start game on page load
startGame();
