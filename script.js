let buttonLeft = document.querySelectorAll(".left-boxs .box");
let buttonRight = document.querySelectorAll(".right-boxs .box");

let pButtonLeft = document.querySelector("#firstdata");
let pButtonRight = document.querySelector("#seconddata");
let base = "RUB";
let symbols = "USD";

let active;

let inputLeft = document.querySelector(".firstinput");
let inputRight = document.querySelector(".secondinput");
let value;

function Buttonclick(b1, a) {
    b1.forEach(element => {
        element.onclick = async (e) => {
            b1.forEach((item) => {
                item.classList.remove("active");
            })
            element.classList.add("active");
            console.log(element);
            if (a == 'left') {
                base = element.innerText;

            }
            else if (a == 'right') {
                symbols = element.innerText;

            }
            await f();
            c(active);

        }
    });
}
Buttonclick(buttonLeft, 'left');
Buttonclick(buttonRight, 'right');

async function f() {
    const a = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`);
    const b = await a.json();
    value = b.rates[symbols]
    console.log(b.rates[`${symbols}`]);
    pButtonLeft.innerText = `1 ${base} = ${value.toFixed(4)} ${symbols}`;
    pButtonRight.innerText = `1 ${symbols} = ${(1 / value).toFixed(4)} ${base}`;
}
f();

inputLeft.oninput = (item) => {
    if (inputLeft.value != '') {
        inputRight.value = (value * inputLeft.value).toFixed(2);

    } else {
        inputRight.value = '';
    }
    active = 'left';
}

inputRight.oninput = (item) => {
    if (inputRight.value != '') {
        inputLeft.value = (1 / value * inputRight.value).toFixed(2);
    } else {
        inputLeft.value = '';
    }
    active = 'right';
}

function c(p) {
    if (p == 'right') {
        if (inputRight.value != '') {
            inputLeft.value = (1 / value * inputRight.value).toFixed(2);
        } else {
            inputLeft.value = '';
        }
    }
    else if (p == 'left') {
        if (inputLeft.value != '') {
            inputRight.value = (value * inputLeft.value).toFixed(2);

        } else {
            inputRight.value = '';
        }
    }
};