const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxxxx/exec";

let current = 0;
let answers = [];
let timer = null;

const userId = crypto.randomUUID();

/* ================= QUESTIONS ================= */

const questions = [

/* ===== CÂU 1–6 ===== */
{
type: "image",
title: "Câu 1: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/1 (1).png","images/1 (2).png","images/1 (3).png"]
},
{
type: "image",
title: "Câu 2: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/2 (1).png","images/2 (2).png","images/2 (3).png"]
},
{
type: "image",
title: "Câu 3: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/3 (1).png","images/3 (2).png","images/3 (3).png"]
},
{
type: "image",
title: "Câu 4: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/4 (1).png","images/4 (2).png","images/4 (3).png"]
},
{
type: "image",
title: "Câu 5: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/5 (1).png","images/5 (2).png","images/5 (3).png"]
},
{
type: "image",
title: "Câu 6: Chọn 1 thương hiệu bạn nhận ra đầu tiên",
time: 5,
images: ["images/6 (1).png","images/6 (2).png","images/6 (3).png"]
},

/* ===== CÂU 7 ===== */
{
type: "multi",
title: "Câu 7: Bạn còn nhớ rõ thương hiệu nào nhất? (chọn 3)",
time: 15,
max: 3,
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
title: "Câu 8: Bạn nhận ra thương hiệu do cái gì? (chọn 2)",
time: 10,
max: 2,
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
title: "Câu 9: Yếu tố giúp cửa hàng được nhận ra nhanh nhất (chọn 2)",
time: 10,
max: 2,
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
title: "Câu 10: Biển hiệu thương hiệu nào dễ nhận biết nhất?",
time: 10,
max: 1,
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

clearInterval(timer);

let q = questions[current];

let box = document.getElementById("answers");
box.innerHTML = "";

document.getElementById("questionBox").innerHTML = `
<div style="font-size:22px;font-weight:700;margin-bottom:10px;">
${q.title}
</div>
`;

if(q.type === "image"){
renderImages(q, box);
}else{
renderOptions(q, box);
}

startTimer(q.time);
}

/* ================= IMAGE ================= */

function renderImages(q, box){

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

/* ================= OPTIONS ================= */

function renderOptions(q, box){

let selected = [];

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

/* ================= TIMER ================= */

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

/* ================= NEXT ================= */

function next(){
current++;
render();
}

/* ================= SUBMIT ================= */

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

document.body.innerHTML = `
<h1>🎉 Cảm ơn bạn đã tham gia khảo sát</h1>
<p>Kết quả đã được ghi nhận.</p>
`;
}

/* ================= START ================= */

render();
