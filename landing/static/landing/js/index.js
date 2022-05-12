// 계산기 Tab 기능 구현

const tab = document.querySelectorAll(".tab-item");
const tabContent = document.querySelectorAll(".tab-content");

// tab item과 tab content의 클래스 모두 제거해준 뒤
// 클릭한 tab의 item과 content에 클래스 추가해주는 함수
function tabOpen(param) {
  for (var i = 0; i < tab.length; i++) {
    tab[i].classList.remove("active");
    tabContent[i].classList.remove("show");
  }
  tab[param].classList.add("active");
  tabContent[param].classList.add("show");
}

tab[0].addEventListener("click", () => {
  tabOpen(0);
});
tab[1].addEventListener("click", () => {
  tabOpen(1);
});
tab[2].addEventListener("click", () => {
  tabOpen(2);
});





// 계산기 form 다음 버튼 기능 구현

const calFirst = document.getElementById("calculator-first");
const calSecond = document.getElementById("calculator-second");

calFirst.addEventListener("click", () => {
  tabOpen(1);
});
calSecond.addEventListener("click", () => {
  tabOpen(2);
});





// 숫자에 , 로 구분해주는 구성
// 리팩토링하기
let workElement = document.getElementById("work");
let cashElement = document.getElementById("cash");
let houseElement = document.getElementById("house");
let landElement = document.getElementById("land");
let medicalElement = document.getElementById("medical");
let carElement = document.getElementById("car");
let debtElement = document.getElementById("debt");


function changeValue(stringNumber, element) {
  let tempString = stringNumber.replaceAll(",", "");    // value를 받아서 value값 안에 모든 ,를 빈칸으로 만들어준다.
  let numberCash = BigInt(tempString);    // string을 int로 변환해주는데... BigInt는 2의 53제곱 보다 큰 값을 예상할 경우에 사용한다
  element.value = numberCash      // BigInt로 형변환 해준 데이터를 선택한 요소의 value값에 할당한다.
    .toLocaleString("ko-KR", { style: "currency", currency: "KRW" })     // 데이터를 현지날짜, 현지통화등으로 바꿔주는 메서드이다.
    .slice(1);
}


workElement.addEventListener("input", (event) =>
  changeValue(event.target.value, workElement)     // event.target.value는 이벤트(input)이 발생한 위치의 value
);
cashElement.addEventListener("input", (event) =>
  changeValue(event.target.value, cashElement)
);
houseElement.addEventListener("input", (event) =>
  changeValue(event.target.value, houseElement)
);
landElement.addEventListener("input", (event) =>
  changeValue(event.target.value, landElement)
);
medicalElement.addEventListener("input", (event) =>
  changeValue(event.target.value, medicalElement)
);
carElement.addEventListener("input", (event) =>
  changeValue(event.target.value, carElement)
);
debtElement.addEventListener("input", (event) =>
  changeValue(event.target.value, debtElement)
);
