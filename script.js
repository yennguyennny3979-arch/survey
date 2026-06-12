const questions = [

{
title:"Câu 1",
images:[
"https://picsum.photos/300?1",
"https://picsum.photos/300?2",
"https://picsum.photos/300?3",
"https://picsum.photos/300?4"
]
},

{
title:"Câu 2",
images:[
"https://picsum.photos/300?5",
"https://picsum.photos/300?6",
"https://picsum.photos/300?7",
"https://picsum.photos/300?8"
]
},

{
title:"Câu 3",
images:[
"https://picsum.photos/300?9",
"https://picsum.photos/300?10",
"https://picsum.photos/300?11",
"https://picsum.photos/300?12"
]
}

];

let currentQuestion = 0;
let answers = [];
let time = 5;
let interval;

const title = document.querySelector("h1");
const timer = document.querySelector("h2");
const images = document.querySelectorAll("img");

function showQuestion() {

    if(currentQuestion >= questions.length){

        document.body.innerHTML =
        "<h1>Cảm ơn bạn đã tham gia khảo sát!</h1>";

        return;
    }

    const q = questions[currentQuestion];

    title.innerText =
    `${q.title} (${currentQuestion + 1}/${questions.length})`;

    q.images.forEach((url,index)=>{

    images[index].src = url;

    images[index].classList.remove("selected");

    images[index].onclick = ()=>{

        images.forEach(img=>{
            img.classList.remove("selected");
        });

        images[index].classList.add("selected");

        answers[currentQuestion] =
        index + 1;

        console.log(answers);

    };

});

    time = 5;

    timer.innerText = "⏳ " + time;

    clearInterval(interval);

    interval = setInterval(()=>{

        time--;

        timer.innerText = "⏳ " + time;

     if(time <= 1){

    currentQuestion++;

    showQuestion();

}

    },1000);

}

showQuestion();
