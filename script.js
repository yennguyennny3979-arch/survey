const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxxxx/exec";

let current = 0;
let answers = [];
let timer = null;
let selectedMulti = [];

const userId = crypto.randomUUID();

const questions = [

/* ===== IMAGE 6 CÂU ===== */
{
type: "image",
title: "Câu 1",
time: 5,
images: ["images/1 (1).png","images/1 (2).png","images/1 (3).png"]
},
{
type: "image",
title: "Câu 2",
time: 5,
images: ["images/2 (1).png","images/2 (2).png","images/2 (3).png"]
},
{
type: "image",
title: "Câu 3",
time: 5,
images: ["images/3 (1).png","images/3 (2).png","images/3 (3).png"]
},
{
type: "image",
title: "Câu 4",
time: 5,
images: ["images/4 (1).png","images/4 (2).png","images/4 (3).png"]
},
{
type: "image",
title: "Câu 5",
time: 5,
images: ["images/5 (1).png","images/5 (2).png","images/5 (3).png"]
},
{
type: "image",
title: "Câu 6",
time: 5,
images: ["images/6 (1).png","images/6 (2).png","images/6 (3).png"]
},

/* ===== CÂU 7 ===== */
{
type: "multi",
title: "Câu 7 (chọn 3)",
time: 15,
max: 3,
options: ["AK SPA & BEAUTY","SPA TÂY THI","PHƯƠNG THẢO SPA","7 ELEVEN","WINMART +","CIRCLE K"]
},

/* ===== CÂU 8 ===== */
{
type: "multi",
title: "Câu 8 (chọn 2)",
time: 10,
max: 2,
options: ["Màu sắc","Logo","Tên thương hiệu","Biển hiệu"]
},

/* ===== CÂU 9 ===== */
{
type: "multi",
title: "Câu 9 (chọn 2)",
time: 10,
max: 2,
options: ["Màu sắc nổi bật","Logo dễ nhớ","Tên dễ đọc","Biển hiệu lớn"]
},

/* ===== CÂU 10 ===== */
{
type: "single",
title: "Câu 10",
time: 10,
max: 1,
options: ["AK SPA & BEAUTY","SPA TÂY THI","7 ELEVEN","WINMART +","CIRCLE K"]
}

];

function render(){

if(current >= questions.length){
submit();
return;
}

let q = questions[current];

document.getElementById("questionTitle").innerText = q.title;

let box = document.getElementById("answers");
box.innerHTML = "";

selectedMulti = [];

clearInterval(timer);

/* RESET TIMER */
startTimer(q);

if(q.type === "image"){
renderImage(q, box);
}else{
renderOptions(q, box);
}

}

/* ===== IMAGE ===== */
function renderImage(q, box){

q.images.forEach((src,i)=>{

let div = document.createElement("div");
div.className = "card";

div.innerHTML = `<img src="${src}">`;

div.onclick = () => {
answers[current] = i+1;
next();
};

box.appendChild(div);

});

}

/* ===== OPTIONS ===== */
function renderOptions(q, box){

q.options.forEach(opt=>{

let div = document.createElement("div");
div.className = "card";
div.innerText = opt;

div.onclick = () => {

if(q.max === 1){
answers[current] = opt;
next();
return;
}

if(selectedMulti.includes(opt)){
selectedMulti = selectedMulti.filter(x=>x!==opt);
div.classList.remove("selected");
}else{
if(selectedMulti.length < q.max){
selectedMulti.push(opt);
div.classList.add("selected");
}
}

answers[current] = selectedMulti;

};

box.appendChild(div);

});

}

/* ===== TIMER ===== */
function startTimer(q){

let t = q.time;

document.getElementById("timer").innerText = t;

timer = setInterval(()=>{

t--;
document.getElementById("timer").innerText = t;

if(t <= 0){
clearInterval(timer);
next();
}

},1000);

}

/* ===== NEXT ===== */
function next(){

current++;
render();

}

/* ===== SUBMIT (FIX CHẮC CHẮN KHÔNG ĐỨNG) ===== */
async function submit(){

document.body.innerHTML = "<h2>Đang gửi dữ liệu...</h2>";

try{

await fetch(GOOGLE_SCRIPT_URL,{
method:"POST",
mode:"no-cors",
body: JSON.stringify({
userId,
answers
})
});

}catch(e){
console.log(e);
}

document.body.innerHTML = "<h1>Cảm ơn bạn đã tham gia khảo sát</h1>";

}

render();
