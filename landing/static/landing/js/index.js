// 계산기 Tab 기능 구현

const tab = document.querySelectorAll(".tab-item");
const tabContent = document.querySelectorAll(".tab-content");
const resultBtnContainer = document.getElementById("calculator-submit");

// tab item과 tab content의 클래스 모두 제거해준 뒤
// 클릭한 tab의 item과 content에 클래스 추가해주는 함수
function tabOpen(param) {
  for (var i = 0; i < tab.length; i++) {
    tab[i].classList.remove("active");
    tabContent[i].classList.remove("show");
  }
  tab[param].classList.add("active");
  tabContent[param].classList.add("show");
  if (param == 0 || 1) {
    resultBtnContainer.style.display = "none";
  }
  if (param == 2) {
    resultBtnContainer.style.display = "flex";
  }
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
let nicknameElement = document.getElementById("nickname");
let ageElement = document.getElementById("age");
let familyElement = document.getElementById("family-number");
let bokjiElement = document.getElementById("bokji-type");
let locationElement = document.getElementById("location");
let workElement = document.getElementById("work");
let livingElement = document.getElementById("living");
let assetElement = document.getElementById("asset");
let landElement = document.getElementById("land");
let rentElement = document.getElementById("rent");
let medicalElement = document.getElementById("medical");
let carElement = document.getElementById("car");
let debtElement = document.getElementById("debt");

function changeValue(stringNumber, element) {
  let tempString = stringNumber.replaceAll(",", ""); // value를 받아서 value값 안에 모든 ,를 빈칸으로 만들어준다.
  let numberCash = BigInt(tempString); // string을 int로 변환해주는데... BigInt는 2의 53제곱 보다 큰 값을 예상할 경우에 사용한다
  element.value = numberCash // BigInt로 형변환 해준 데이터를 선택한 요소의 value값에 할당한다.
    .toLocaleString("ko-KR", { style: "currency", currency: "KRW" }) // 데이터를 현지날짜, 현지통화등으로 바꿔주는 메서드이다.
    .slice(1);
}

workElement.addEventListener(
  "input",
  (event) => changeValue(event.target.value, workElement) // event.target.value는 이벤트(input)이 발생한 위치의 value
);
livingElement.addEventListener("input", (event) =>
  changeValue(event.target.value, livingElement)
);
assetElement.addEventListener("input", (event) =>
  changeValue(event.target.value, assetElement)
);
landElement.addEventListener("input", (event) =>
  changeValue(event.target.value, landElement)
);
rentElement.addEventListener("input", (event) =>
  changeValue(event.target.value, rentElement)
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

// question-icon에 마우스 올렸을 때 설명 박스 띄워주는 기능

const questionIcon = document.querySelectorAll(".question-icon");
const questionBox = document.querySelectorAll(".question-box");

function openQuestionBox() {
  questionIcon[0].addEventListener("mouseover", () => {
    questionBox[0].classList.add("show");
  });
  questionIcon[0].addEventListener("mouseout", () => {
    questionBox[0].classList.remove("show");
  });
  questionIcon[1].addEventListener("mouseover", () => {
    questionBox[1].classList.add("show");
  });
  questionIcon[1].addEventListener("mouseout", () => {
    questionBox[1].classList.remove("show");
  });
  questionIcon[2].addEventListener("mouseover", () => {
    questionBox[2].classList.add("show");
  });
  questionIcon[2].addEventListener("mouseout", () => {
    questionBox[2].classList.remove("show");
  });
  questionIcon[3].addEventListener("mouseover", () => {
    questionBox[3].classList.add("show");
  });
  questionIcon[3].addEventListener("mouseout", () => {
    questionBox[3].classList.remove("show");
  });
  questionIcon[4].addEventListener("mouseover", () => {
    questionBox[4].classList.add("show");
  });
  questionIcon[4].addEventListener("mouseout", () => {
    questionBox[4].classList.remove("show");
  });
}

openQuestionBox();
// 계산기 값에 빈칸 있을 경우 전송을 막는 기능
// 색상 변경 기능
function setColor(el, bg) {
  if (el.style) el.style.backgroundColor = bg;
}

function checkInput(form) {
  var bgBad = "red";
  var bgGood = "white";
  var valid = true;
  if (form.nickname.value == "") {
    valid = false;
    setColor(form.nickname, bgBad);
  } else {
    setColor(form.nickname, bgGood);
  }
  if (form.age.value == "") {
    valid = false;
    setColor(form.age, bgBad);
  } else {
    setColor(form.age, bgGood);
  }
  if (form.work.value == "") {
    valid = false;
    setColor(form.work, bgBad);
  } else {
    setColor(form.work, bgGood);
  }
  if (form.living.value == "") {
    valid = false;
    setColor(form.living, bgBad);
  } else {
    setColor(form.living, bgGood);
  }
  if (form.asset.value == "") {
    valid = false;
    setColor(form.asset, bgBad);
  } else {
    setColor(form.asset, bgGood);
  }
  if (form.land.value == "") {
    valid = false;
    setColor(form.land, bgBad);
  } else {
    setColor(form.land, bgGood);
  }
  if (form.rent.value == "") {
    valid = false;
    setColor(form.rent, bgBad);
  } else {
    setColor(form.rent, bgGood);
  }
  if (form.medical.value == "") {
    valid = false;
    setColor(form.medical, bgBad);
  } else {
    setColor(form.medical, bgGood);
  }
  if (form.car.value == "") {
    valid = false;
    setColor(form.car, bgBad);
  } else {
    setColor(form.car, bgGood);
  }
  if (form.debt.value == "") {
    valid = false;
    setColor(form.debt, bgBad);
  } else {
    setColor(form.debt, bgGood);
  }
  if (!valid) alert("빈칸을 채워 주세요");
  return valid;
}

// 제출 버튼 클릭시 결과 보여주는 기능
const calculate = document.querySelector(".calculate");
const resultTab = document.getElementById("result");

function ShowResultPage() {
  calculate.classList.add("hide");
  resultTab.classList.remove("hide");
  resultTab.classList.add("show");
}

function getResults() {
  fetch("/cal-data/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify({
      nickname: nicknameElement.value,
      age: parseInt(ageElement.value),
      "family-number": parseInt(familyElement.value),
      "bokji-type": bokjiElement.value,
      location: locationElement.value,
      work: parseInt(workElement.value.replaceAll(",", "")),
      living: parseInt(livingElement.value.replaceAll(",", "")),
      asset: parseInt(assetElement.value.replaceAll(",", "")),
      rent: parseInt(rentElement.value.replaceAll(",", "")),
      land: parseInt(landElement.value.replaceAll(",", "")),
      medical: parseInt(medicalElement.value.replaceAll(",", "")),
      car: parseInt(carElement.value.replaceAll(",", "")),
      debt: parseInt(debtElement.value.replaceAll(",", "")),
    }),
  }).then((response) => {
    if (response.status != 200) alert("일시적 오류");
    else
      response.json().then((responseBody) => {
        updateWithResults(responseBody);
      });
  });
}

function updateWithResults(responseBody) {
  console.log(responseBody);
  calculate.classList.add("hide");
  resultTab.classList.remove("hide");
  resultTab.classList.add("show");
}

function getCsrfToken() {
  return document.cookie
    .split(";")
    .find((item) => item.includes("csrftoken"))
    .split("=")[1];
}
