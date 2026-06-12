const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxxxx/exec";

let current = 0;
let answers = [];
let timer = null;
let selectedMulti = [];

const userId = crypto.randomUUID();

/* ================= QUESTIONS ================= */

const questions = [

/* ===== CÂU 1–6 (ẢNH) ===== */
{
type: "image",
title: "Câu 1",
time: 5,
maxSelect: 1,
images: [
"images/1 (1).png",
"images/1 (2).png",
"images/1 (3).png"
]
},
{
type: "image",
title: "Câu 2",
time: 5,
maxSelect: 1,
images: [
"images/2 (1).png",
"images/2 (2).png",
"images/2 (3).png"
]
},
{
type: "image",
title: "Câu 3",
time: 5,
maxSelect: 1,
images: [
"images/3 (1).png",
"images/3 (2).png",
"images/3 (3).png"
]
},
{
type: "image",
title: "Câu 4",
time: 5,
maxSelect: 1,
images: [
"images/4 (1).png",
"images/4 (2).png",
"images/4 (3).png"
]
},
{
type: "image",
title: "Câu 5",
time: 5,
maxSelect: 1,
images: [
"images/5 (1).png",
"images/5 (2).png",
"images/5 (3).png"
]
},
{
type: "image",
title: "Câu 6",
time: 5,
maxSelect: 1,
images: [
"images/6 (1).png",
"images/6 (2).png",
"images/6 (3).png"
]
},

/* ===== CÂU 7 ===== */
{
type: "multi",
title: "Câu 7: Chọn 3 thương hiệu bạn nhớ",
time: 15,
maxSelect: 3,
options: [
"AK SPA & BEAUTY",
"SPA TÂY THI",
"PHƯƠNG THẢO SPA",
"VÀNG BẠC XUÂN QUỲNH",
"KHÁNH KIM LON VÀNG BẠC ĐÁ QUÝ",
"KIM LONG DIỆP JEWELRY STORE LUXURY",
"CARA CLUB",
"LỆ QUÂN CLOTHING STORE & MORE",
"KRIK TONY4MEN",
"DAIKIN PROSHOP",
"SHOWROOM ĐIỆN MÁY TOSHIBA",
"NAGAKAWA ĐIỆN LẠNH GIA DỤNG",
"7 ELEVEN",
"WINMART +",
"CIRCLE K",
"KLEVER FRUITS",
"CO.OP FOOD",
"GS25"
]
},

/* ===== CÂU 8 ===== */
{
type: "multi",
title: "Câu 8: Chọn 2 điều bạn nhớ",
time: 10,
maxSelect: 2,
options: [
"Màu sắc",
"Logo",
"Tên thương hiệu",
"Kiểu biển hiệu",
"Hình ảnh / biểu tượng"
]
},

/* ===== CÂU 9 ===== */
{
type: "multi",
title: "Câu 9: Yếu tố nhận diện nhanh (chọn 2)",
time: 10,
maxSelect: 2,
options: [
"Màu sắc nổi bật",
"Logo dễ nhận biết",
"Tên thương hiệu dễ đọc",
"Biển hiệu lớn, rõ ràng",
"Biểu tượng / hình ảnh đặc trưng"
]
},

/* ===== CÂU 10 ===== */
{
type: "single",
title: "Câu 10: Thương hiệu dễ nhận biết nhất",
time: 10,
maxSelect: 1,
options: [
"AK SPA & BEAUTY",
"SPA TÂY THI",
"PHƯƠNG THẢO SPA",
"VÀNG BẠC XUÂN QUỲNH",
"KHÁNH KIM LON VÀNG BẠC ĐÁ QUÝ",
"KIM LONG DIỆP JEWELRY STORE LUXURY",
"CARA CLUB",
"LỆ QUÂN CLOTHING STORE & MORE",
"KRIK TONY4MEN",
"DAIKIN PROSHOP",
"SHOWROOM ĐIỆN MÁY TOSHIBA",
"NAGAKAWA ĐIỆN LẠNH GIA DỤNG",
"7 ELEVEN",
"WINMART +",
"CIRCLE K",
"KLEVER FRUITS",
"CO.OP FOOD",
"GS25"
]
}

];

/* ================= CORE ================= */

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

if(timer) clearInterval(timer);

if(q.type === "image"){
renderImages(q, box);
}else{
renderOptions(q, box);
}

startTimer(q.time);
}

/* ================= IMAGE ================= */

function renderImages(q, box){
q.images.forEach((img, i)=>{

let div = document.createElement("div");
div.className = "card";

div.innerHTML = `<img src="${img}">`;

div.onclick = () => {

answers[current] = i + 1;

document.querySelectorAll(".card")
.forEach(c => c.classList.remove("selected"));

div.classList.add("selected");

/* auto next */
setTimeout(next, 300);
};

box.appendChild(div);

});
}

/* ================= OPTIONS ================= */

function renderOptions(q, box){

q.options.forEach(opt=>{

let div = document.createElement("div");
div.className = "card";
div.innerText = opt;

div.onclick = () => {

if(q.maxSelect === 1){
answers[current] = opt;

document.querySelectorAll(".card")
.forEach(c => c.classList.remove("selected"));

div.classList.add("selected");

setTimeout(next, 300);
return;
}

if(selectedMulti.includes(opt)){
selectedMulti = selectedMulti.filter(x => x !== opt);
div.classList.remove("selected");
}else{
if(selectedMulti.length < q.maxSelect){
selectedMulti.push(opt);
div.classList.add("selected");
}
}

answers[current] = selectedMulti;

};

box.appendChild(div);

});

}

/* ================= TIMER ================= */

function startTimer(t){

let time = t;

document.getElementById("timer").innerText = time;

timer = setInterval(()=>{

time--;
document.getElementById("timer").innerText = time;

if(time <= 0){
clearInterval(timer);

if(!answers[current]){
answers[current] = "NoAnswer";
}

next();
}

},1000);

}

/* ================= NEXT ================= */

function next(){
current++;
render();
}

/* ================= SUBMIT ================= */

async function submit(){

document.body.innerHTML = "<h1>Đang gửi dữ liệu...</h1>";

await fetch(GOOGLE_SCRIPT_URL,{
method:"POST",
body: JSON.stringify({
userId,
answers
})
});

document.body.innerHTML = `
<h1>🎉 Cảm ơn bạn đã tham gia khảo sát!</h1>
<p>Chúc bạn một ngày tốt lành.</p>
`;
}

/* ================= START ================= */

render();
