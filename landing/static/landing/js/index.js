// 탭 버튼 기능 리팩토링 하기

const tab0 = document.querySelectorAll(".tab-item")[0];
const tab1 = document.querySelectorAll(".tab-item")[1];
const tab2 = document.querySelectorAll(".tab-item")[2];

const tabContent0 = document.querySelectorAll(".tab-content")[0];
const tabContent1 = document.querySelectorAll(".tab-content")[1];
const tabContent2 = document.querySelectorAll(".tab-content")[2];

function tabOpen0() {
  tab0.classList.remove("active");
  tab1.classList.remove("active");
  tab2.classList.remove("active");
  tabContent0.classList.remove("show");
  tabContent1.classList.remove("show");
  tabContent2.classList.remove("show");
  tab0.classList.add("active");
  tabContent0.classList.add("show");
}
function tabOpen1() {
  tab0.classList.remove("active");
  tab1.classList.remove("active");
  tab2.classList.remove("active");
  tabContent0.classList.remove("show");
  tabContent1.classList.remove("show");
  tabContent2.classList.remove("show");
  tab1.classList.add("active");
  tabContent1.classList.add("show");
}
function tabOpen2() {
  tab0.classList.remove("active");
  tab1.classList.remove("active");
  tab2.classList.remove("active");
  tabContent0.classList.remove("show");
  tabContent1.classList.remove("show");
  tabContent2.classList.remove("show");
  tab2.classList.add("active");
  tabContent2.classList.add("show");
}
tab0.addEventListener("click", function () {
  tab1.classList.remove("active");
  tab2.classList.remove("active");
  tabContent1.classList.remove("show");
  tabContent2.classList.remove("show");
  tab0.classList.add("active");
  tabContent0.classList.add("show");
});
tab1.addEventListener("click", function () {
  tab0.classList.remove("active");
  tab2.classList.remove("active");
  tabContent0.classList.remove("show");
  tabContent2.classList.remove("show");
  tab1.classList.add("active");
  tabContent1.classList.add("show");
});
tab2.addEventListener("click", function () {
  tab1.classList.remove("active");
  tab0.classList.remove("active");
  tabContent1.classList.remove("show");
  tabContent0.classList.remove("show");
  tab2.classList.add("active");
  tabContent2.classList.add("show");
});

// 만약에 현재 tab-item이 0번에 있다면 ( 상태를 표현 해줘야함 )
// 다음 버튼 클릭시 상태를 1로 바꾸고 탭2 를 보여준다.
const calFirst = document.getElementById("calculator-first");
const calSecond = document.getElementById("calculator-second");

calFirst.addEventListener("click", tabOpen1);
calSecond.addEventListener("click", tabOpen2);

// const form = document.querySelector("form");
// var select = document.getElementById("family-number");
// var text = select.options[select.selectedIndex].text;
// console.log(text);

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   nickName = document.getElementById("nickname").value;

//   // console.log(familyNumberVal);
// });

// 숫자에 , 로 구분해주는 구성
// this로 리팩토링하기
let workElement = document.getElementById("work");
let cashElement = document.getElementById("cash");
let houseElement = document.getElementById("house");
let landElement = document.getElementById("land");
let medicalElement = document.getElementById("medical");
let carElement = document.getElementById("car");
let debtElement = document.getElementById("debt");

function changeValue(stringNumber,element) {
  let tempString = stringNumber.replaceAll(",", "");
  let numberCash = BigInt(tempString);
  element.value = numberCash
    .toLocaleString("ko-KR", { style: "currency", currency: "KRW" })
    .slice(1);
}
workElement.addEventListener("input", (event) =>
  changeValue(event.target.value,workElement)
);
cashElement.addEventListener("input", (event) =>
  changeValue(event.target.value,cashElement)
);
houseElement.addEventListener("input", (event) =>
  changeValue(event.target.value,houseElement)
);
landElement.addEventListener("input", (event) =>
  changeValue(event.target.value,landElement)
);
medicalElement.addEventListener("input", (event) =>
  changeValue(event.target.value,medicalElement)
);
carElement.addEventListener("input", (event) =>
  changeValue(event.target.value,carElement)
);
debtElement.addEventListener("input", (event) =>
  changeValue(event.target.value,debtElement)
);

