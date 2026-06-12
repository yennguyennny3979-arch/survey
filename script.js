const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxxxx/exec";

const userId = crypto.randomUUID();

let current = 0;
let answers = [];

let selectedMulti = [];

const questions = [

/* ========== CÂU 1-6 (ẢNH) ========== */
{
type: "image",
title: "Câu 1: Quan sát hình ảnh",
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
title: "Câu 2: Quan sát hình ảnh",
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
title: "Câu 3: Quan sát hình ảnh",
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
title: "Câu 4: Quan sát hình ảnh",
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
title: "Câu 5: Quan sát hình ảnh",
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
title: "Câu 6: Quan sát hình ảnh",
time: 5,
maxSelect: 1,
images: [
"images/6 (1).png",
"images/6 (2).png",
"images/6 (3).png"
]
},

/* ========== CÂU 7 ========== */
{
type: "multi",
title: "Câu 7: Nhớ thương hiệu (chọn 3)",
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

/* ========== CÂU 8 ========== */
{
type: "multi",
title: "Câu 8: Điều bạn nhớ nhất (chọn 2)",
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

/* ========== CÂU 9 ========== */
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

/* ========== CÂU 10 ========== */
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

function renderQuestion(){

if(current >= questions.length){
submit();
return;
}

let q = questions[current];

document.getElementById("questionTitle").innerText =
q.title;

let container = document.getElementById("answers");
container.innerHTML = "";

selectedMulti = [];

if(q.type === "image"){
q.images.forEach((img, i)=>{

let div = document.createElement("div");
div.className = "card";

div.innerHTML = `<img src="${img}">`;

div.onclick = () => {
answers[current] = i + 1;
highlight(div);
};

container.appendChild(div);
});

}else{

q.options.forEach((opt)=>{

let div = document.createElement("div");
div.className = "card";
div.innerText = opt;

div.onclick = () => {

if(q.maxSelect === 1){
answers[current] = opt;
document.querySelectorAll(".card").forEach(c=>c.classList.remove("selected"));
div.classList.add("selected");
return;
}

if(selectedMulti.includes(opt)){
selectedMulti = selectedMulti.filter(x=>x !== opt);
div.classList.remove("selected");
}else{
if(selectedMulti.length < q.maxSelect){
selectedMulti.push(opt);
div.classList.add("selected");
}
}

answers[current] = selectedMulti;
};

container.appendChild(div);

});
}

startTimer(q.time);
}

function highlight(div){
document.querySelectorAll(".card")
.forEach(c=>c.classList.remove("selected"));
div.classList.add("selected");
}

function startTimer(time){

let t = time;
document.getElementById("timer").innerText = t;

let interval = setInterval(()=>{

t--;
document.getElementById("timer").innerText = t;

if(t <= 0){
clearInterval(interval);

if(!answers[current]){
answers[current] = "NoAnswer";
}

current++;
renderQuestion();
}

},1000);
}

async function submit(){

await fetch(GOOGLE_SCRIPT_URL,{
method:"POST",
body: JSON.stringify({
userId,
answers
})
});

document.body.innerHTML = `
<h1>Cảm ơn bạn đã tham gia khảo sát!</h1>
`;
}

renderQuestion();
