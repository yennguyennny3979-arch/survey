const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9YBO5enPkkRi2EhWJs0swjZeno6-hAqXQSnpAr1zqg10LTHjszgZC5tQiBJ8D6SRfoA/exec";

let current = 0;
let answers = [];
let timer = null;

// an toàn hơn crypto.randomUUID()
const userId = "user_" + Math.random().toString(36).substr(2, 9);

/* ================= DATA ================= */

const questions = [

/* ===== IMAGE 1–6 ===== */
{
type:"image",
title:"Câu 1: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/1 (1).png","images/1 (2).png","images/1 (3).png"]
},
{
type:"image",
title:"Câu 2: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/2 (1).png","images/2 (2).png","images/2 (3).png"]
},
{
type:"image",
title:"Câu 3: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/3 (1).png","images/3 (2).png","images/3 (3).png"]
},
{
type:"image",
title:"Câu 4: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/4 (1).png","images/4 (2).png","images/4 (3).png"]
},
{
type:"image",
title:"Câu 5: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/5 (1).png","images/5 (2).png","images/5 (3).png"]
},
{
type:"image",
title:"Câu 6: Chọn 1 hình ảnh thu hút bạn đầu tiên",
time:8,
images:["images/6 (1).png","images/6 (2).png","images/6 (3).png"]
},

/* ===== CÂU 7 ===== */
{
type:"multi",
title:"Câu 7: Chọn 3 thương hiệu bạn nhớ nhất",
time:15,
max:3,
options:[
"AK SPA & BEAUTY","SPA TÂY THI","PHƯƠNG THẢO SPA",
"VÀNG BẠC XUÂN QUỲNH","KHÁNH KIM LON VÀNG BẠC ĐÁ QUÝ",
"KIM LONG DIỆP JEWELRY STORE LUXURY","CARA CLUB",
"LỆ QUÂN CLOTHING STORE & MORE","KRIK TONY4MEN",
"DAIKIN PROSHOP","SHOWROOM ĐIỆN MÁY TOSHIBA",
"NAGAKAWA ĐIỆN LẠNH GIA DỤNG","7 ELEVEN",
"WINMART +","CIRCLE K","KLEVER FRUITS",
"CO.OP FOOD","GS25"
]
},

/* ===== CÂU 8 ===== */
{
type:"multi",
title:"Câu 8: Chọn 2 yếu tố giúp nhận diện",
time:15,
max:2,
options:["Màu sắc","Logo","Tên thương hiệu","Kiểu biển hiệu","Hình ảnh / biểu tượng"]
},

/* ===== CÂU 9 ===== */
{
type:"multi",
title:"Câu 9: Yếu tố quan trọng nhất",
time:15,
max:2,
options:["Màu sắc nổi bật","Logo dễ nhận biết","Tên thương hiệu dễ đọc","Biển hiệu lớn rõ ràng","Biểu tượng đặc trưng"]
},

/* ===== CÂU 10 ===== */
{
type:"single",
title:"Câu 10: Thương hiệu dễ nhận biết nhất",
time:10,
max:1,
options:[
"AK SPA & BEAUTY","SPA TÂY THI","PHƯƠNG THẢO SPA",
"VÀNG BẠC XUÂN QUỲNH","KHÁNH KIM LON VÀNG BẠC ĐÁ QUÝ",
"KIM LONG DIỆP JEWELRY STORE LUXURY","CARA CLUB",
"LỆ QUÂN CLOTHING STORE & MORE","KRIK TONY4MEN",
"DAIKIN PROSHOP","SHOWROOM ĐIỆN MÁY TOSHIBA",
"NAGAKAWA ĐIỆN LẠNH GIA DỤNG","7 ELEVEN",
"WINMART +","CIRCLE K","KLEVER FRUITS",
"CO.OP FOOD","GS25"
]
}

];

/* ================= RENDER ================= */

function render(){

if(current >= questions.length){
submit();
return;
}

clearInterval(timer);

let q = questions[current];

document.getElementById("questionBox").innerText = q.title;

let box = document.getElementById("answers");
box.innerHTML = "";

if(q.type === "image"){
renderImage(q, box);
}else{
renderOptions(q, box);
}

startTimer(q.time);
}

/* ================= IMAGE ================= */

function renderImage(q, box){

for(let i=0;i<q.images.length;i++){

let div = document.createElement("div");
div.className = "card";

div.innerHTML = `<img src="${q.images[i]}">`;

div.onclick = () => {
answers[current] = i+1;
next();
};

box.appendChild(div);

}

}

/* ================= OPTIONS ================= */

function renderOptions(q, box){

let selected = [];

for(let i=0;i<q.options.length;i++){

let opt = q.options[i];

let div = document.createElement("div");
div.className = "card";
div.innerText = opt;

div.onclick = () => {

if(q.max === 1){
answers[current] = opt;
next();
return;
}

if(selected.includes(opt)){
selected = selected.filter(x => x !== opt);
div.classList.remove("selected");
}else{
if(selected.length < q.max){
selected.push(opt);
div.classList.add("selected");
}
}

answers[current] = selected;

/* auto next khi đủ chọn */
if(q.max > 1 && selected.length === q.max){
clearInterval(timer);
setTimeout(next, 200);
}

};

box.appendChild(div);

}

/* 🔥 END FUNCTION (ĐÃ FIX NGOẶC ĐẦY ĐỦ) */
}

/* ================= TIMER ================= */

function startTimer(t){

let time = t;

document.getElementById("timer").innerText = time;

clearInterval(timer);

timer = setInterval(() => {

time--;
document.getElementById("timer").innerText = time;

if(time <= 0){
clearInterval(timer);
next();
}

},1000);

}

/* ================= NEXT ================= */

function next(){
clearInterval(timer);
current++;
render();
}

/* ================= SUBMIT ================= */

function submit(){

clearInterval(timer);

document.body.innerHTML = "<h2>Đang gửi dữ liệu...</h2>";

fetch(GOOGLE_SCRIPT_URL, {
method: "POST",
body: JSON.stringify({
userId: userId,
answers: answers
})
})
.then(() => {

document.body.innerHTML = `
<h1>Hoàn thành khảo sát</h1>
<p>Dữ liệu đã được ghi nhận</p>
`;

})
.catch(() => {

document.body.innerHTML = `
<h1>Hoàn thành khảo sát</h1>
<p>Đã hoàn thành (có thể chưa gửi được dữ liệu)</p>
`;

});

}

/* ================= START ================= */

render();
