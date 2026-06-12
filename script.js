let time = 5;

const timer = document.querySelector("h2");

setInterval(() => {

    time--;

    timer.innerText = "⏳ " + time;

    if(time <= 0){

        alert("Hết giờ!");

        time = 5;

    }

},1000);
