const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxxxx/exec";

let current = 0;
let answers = [];
let timer = null;

const userId = crypto.randomUUID();

const questions = [

{
type:"image",
title:"Câu 1",
time:5,
images:["images/1 (1).png","images/1 (2).png","images/1 (3).png"]
},
{
type:"image",
title:"Câu 2",
time:5,
images:["images/2 (1).png","images/2 (2).png","images/2 (3).png"]
},
{
type:"image",
title:"Câu 3",
time:5,
images:["images/3 (1).png","images/3 (2).png","images/3 (3).png"]
},
{
type:"image",
title:"Câu 4",
time:5,
images:["images/4 (1).png","images/4 (2).png","images/4 (3).png"]
},
{
type:"image",
title:"Câu 5",
time:5,
images:["images/5 (1).png","images/5 (2).png","images/5 (3).png"]
},
{
type:"image",
title:"Câu 6",
time:5,
images:["images/7 (1).png","images/7 (2).png","images/7 (3).png"]
},

{
type:"multi",
title:"Câu 7",
time:15,
max:3,
options:["AK SPA & BEAUTY","7 ELEVEN","WINMART +","CIRCLE K"]
},

{
type:"multi",
title:"Câu 8",
time:10,
max:2,
options:["Màu sắc","Logo","Tên","Biển hiệu"]
},

{
type:"multi",
title:"Câu 9",
time:10,
max:2,
options:["Màu sắc","Logo","Tên","Biển hiệu"]
},

{
type:"single",
title:"Câu 10",
time:10,
max:1,
options:["AK SPA & BEAUTY","7 ELEVEN","WINMART +","CIRCLE K"]
}

];

function render(){

if(current >= questions.length){
submit();
return;
}

clearInterval(timer);

let q = questions[current];

document.getElementById("questionTitle").innerText = q.title;

let box = document.getElementById("answers");
box.innerHTML = "";

if(q.type === "image"){
renderImage(q, box);
}else{
renderOptions(q, box);
}

startTimer(q.time);
}

function renderImage(q, box){

q.images.forEach((img,i)=>{

let div = document.createElement("div");
div.className="card";

div.innerHTML = `<img src="${img}">`;

div.onclick = () => {
answers[current] = i+1;
next();
};

box.appendChild(div);

});

}

function renderOptions(q, box){

let selected = [];

q.options.forEach(opt=>{

let div = document.createElement("div");
div.className="card";
div.innerText = opt;

div.onclick = () => {

if(q.max === 1){
answers[current] = opt;
next();
return;
}

if(selected.includes(opt)){
selected = selected.filter(x=>x!==opt);
div.classList.remove("selected");
}else{
if(selected.length < q.max){
selected.push(opt);
div.classList.add("selected");
}
}

answers[current] = selected;

};

box.appendChild(div);

});

}

function startTimer(t){

let time = t;

document.getElementById("timer").innerText = time;

timer = setInterval(()=>{

time--;
document.getElementById("timer").innerText = time;

if(time <= 0){
clearInterval(timer);
next();
}

},1000);

}

function next(){
current++;
render();
}

async function submit(){

clearInterval(timer);

document.body.innerHTML = "<h2>Đang gửi dữ liệu...</h2>";

try{

await fetch(GOOGLE_SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
userId,
answers
})
});

}catch(e){
console.log(e);
}

document.body.innerHTML = "<h1>Cảm ơn bạn!</h1>";
}

render();
