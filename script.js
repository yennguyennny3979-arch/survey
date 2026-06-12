alert("SCRIPT VERSION 999");

const questions = [
{
    title: "Câu 1",
    images: [
        "https://picsum.photos/300?1",
        "https://picsum.photos/300?2",
        "https://picsum.photos/300?3",
        "https://picsum.photos/300?4"
    ]
},
{
    title: "Câu 2",
    images: [
        "https://picsum.photos/300?5",
        "https://picsum.photos/300?6",
        "https://picsum.photos/300?7",
        "https://picsum.photos/300?8"
    ]
},
{
    title: "Câu 3",
    images: [
        "https://picsum.photos/300?9",
        "https://picsum.photos/300?10",
        "https://picsum.photos/300?11",
        "https://picsum.photos/300?12"
    ]
}
];

let currentQuestion = 0;
let answers = [];
let countdown = null;

const title = document.querySelector("h1");
const timer = document.querySelector("h2");
const images = document.querySelectorAll("img");

function finishSurvey() {

    clearInterval(countdown);

    document.body.innerHTML = `
        <h1>Cảm ơn bạn đã tham gia khảo sát!</h1>
        <p>Đáp án đã chọn:</p>
        <pre>${JSON.stringify(answers)}</pre>
    `;
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        finishSurvey();
        return;
    }

    renderQuestion();
}

function renderQuestion() {

    const q = questions[currentQuestion];

    title.innerText =
    `${q.title} (${currentQuestion + 1}/${questions.length})`;

    q.images.forEach((url, index) => {

        images[index].src = url;

        images[index].classList.remove("selected");

        images[index].onclick = () => {

            clearInterval(countdown);

            answers[currentQuestion] = index + 1;

            nextQuestion();
        };
    });

    let time = 5;

    timer.innerText = "⏳ " + time;

    clearInterval(countdown);

    countdown = setInterval(() => {

        time--;

        timer.innerText = "⏳ " + time;

        if (time <= 0) {

            answers[currentQuestion] = "NoAnswer";

            nextQuestion();
        }

    }, 1000);
}

renderQuestion();
