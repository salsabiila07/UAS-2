const questions = document.querySelectorAll("#question-bank .question");
const quizBox = document.getElementById("quiz-box");

let index = 0;
let score = 0;
let time = 15;
let timer;

function loadQuestion() {
    clearInterval(timer);
    time = 15;
    document.getElementById("timer").innerText = `⏱ ${time}`;
    document.getElementById("nextBtn").disabled = true;

    const q = questions[index];
    const correctIndex = q.dataset.answer;

    let html = `<h3>${q.querySelector("p").innerText}</h3>`;

    q.querySelectorAll(".option").forEach((opt, i) => {
        html += `<div class="option" onclick="selectAnswer(this, ${i}, ${correctIndex})">${opt.innerText}</div>`;
    });

    quizBox.innerHTML = html;
    document.getElementById("question-number").innerText = `Soal ${index + 1}`;
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = `⏱ ${time}`;
        if (time === 0) nextQuestion();
    }, 1000);
}

function selectAnswer(el, choice, correct) {
    clearInterval(timer);
    document.querySelectorAll(".option").forEach(o => o.onclick = null);

    if (choice == correct) {
        el.classList.add("correct");
        score += 20;
    } else {
        el.classList.add("wrong");
        document.querySelectorAll(".option")[correct].classList.add("correct");
    }

    document.getElementById("score").innerText = `Skor: ${score}`;
    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    const status = score >= 70 ? "LULUS 🏆" : "TIDAK LULUS ❌";

    quizBox.innerHTML = "";
    document.getElementById("result").innerHTML = `
        <p>Skor Akhir: <b>${score}</b></p>
        <p>${status}</p>
        <button onclick="location.reload()">Ulangi Kuis</button>
    `;
}

loadQuestion();
