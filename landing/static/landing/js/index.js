// moment.js
moment.locale("ko");
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
let carTypeElement = document.getElementById("car-type");
let debtElement = document.getElementById("debt");

let phoneElement = document.getElementById("number-box");

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

// function ShowResultPage() {
//   calculate.classList.add("hide");
//   resultTab.classList.remove("hide");
//   resultTab.classList.add("show");
// }

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
      "car-type": carTypeElement.value,
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

function getPhone() {
  fetch("/phone/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify({
      phone: phoneElement.value,
    }),
  }).then((response) => {
    if (response.status != 200) alert("일시적 오류");
    else response.json();
  });
}

let tempGlobalResponseBody = null;
function updateWithResults(responseBody) {
  console.log(responseBody);
  tempGlobalResponseBody = responseBody;
  calculate.classList.add("hide");
  resultTab.classList.remove("hide");
  resultTab.classList.add("show");

  let nickname = responseBody.nickname;
  let resultPercent = responseBody.medianIncome
    ? responseBody.medianIncome
    : "100";
  let date = moment().format("YYYY년 MM월 D일");
  let age = responseBody.age;
  let family = 8;
  let resultTo = responseBody.incomeResult;
  let bokji = responseBody.bokjiInfo[0].title;

  let innerElement = `<p class="f-md">${nickname}님</p>
  <p class="f-l">중위소득 기준 범위는 <strong class="f-primary">${resultPercent}%</strong> 이에요</p>
  <div class="row space-bet">
    <p>
      <span class="f-ssm" style="float: left;">계산 날짜: ${date}</span>
      <span class="f-ssm" style="float: right;">오차범위 ±5%가 적용될 수 있어요</span>
    </p>
    <div class="col-md-12 box-sha mb-3">
      <p class="f-ms f-primary m-2" style="text-align:center;"><strong>나의 소득 위치</strong></p>
      <canvas id="myChart" width="700px" height="200px"></canvas>
    </div>
    <div class="col-md-4 box-sha info-left clearfix">
      <p class="f-ms f-primary mb-3" style="text-align:center;"><strong>${nickname}</strong></p>
      <div class="mb-2"><span class="tag-box">나이</span> <span>${age}세</span></div>
      <div class="mb-2"><span class="tag-box">가구원</span>${family}인가구</div>
      <div class="mb-2"><span class="tag-box">소득 인정액</span>${resultTo}원</div>
    </div>
    <div class="col-md-8 box-sha info-right">
      <p class="f-ms f-primary mb-3"><strong>${nickname}님께 추천드리는 복지혜택</strong></p>
      <div class="mb-2"><span class="tag-box tag-box-wide">${bokji}</span> 혜택) 활동 참여수당 최대 19.5만원</div>
      <div class="mb-2"><span class="tag-box tag-box-wide">${bokji}</span> 혜택) 방문,화상,전화 상담</div>
    </div>
  </div>
  <div class="input-phone">
    <input class="number-box" type="tel" placeholder="휴대폰 번호를 입력해주세요">
    <button class="btn-circle-2 ms-3" type="submit">등록</button>
  </div>`;
  resultTab.innerHTML = innerElement;
  const ctx = document.getElementById("myChart").getContext("2d");
  if (family == 1) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "1인 가구 중위소득",
            data: [
              972406, 1166887, 1361368, 1555850, 1944812, 2333774, 2917218,
              3889624, 5834436,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 2) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "2인 가구 중위소득",
            data: [
              1630043, 1956051, 2282060, 2608068, 3260085, 3912102, 4890128,
              6520170, 9780255,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 3) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "3인 가구 중위소득",
            data: [
              2097351, 2516821, 2936291, 3355761, 4194701, 5033641, 6292052,
              8389402, 12584103,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 4) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "4인 가구 중위소득",
            data: [
              2560540, 3072648, 3584756, 4096864, 5121080, 6145296, 7681620,
              10242160, 15363240,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 5) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "5인 가구 중위소득",
            data: [
              3012258, 3614709, 4217161, 4819612, 6024515, 7229418, 9036773,
              12049030, 18073545,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 6) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "6인 가구 중위소득",
            data: [
              3453502, 4144202, 4834903, 5525603, 6907004, 8288405, 10360506,
              13814008, 20721012,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 7) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "7인 가구 중위소득",
            data: [
              3890296, 4668355, 5446414, 6224474, 7780592, 9336710, 11670888,
              15561184, 23341776,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  } else if (family == 8) {
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [50, 60, 70, 80, 100, 120, 150, 200, 300],
        datasets: [
          {
            label: "8인 가구 중위소득",
            data: [
              4327090, 5192508, 6057926, 6923344, 8654180, 10385016, 12981270,
              17308360, 25962540,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["#DEE2EA"],
            borderWidth: [2],
            pointRadius: [10],
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "소득인정액 (원)",
            },
          },
          x: {
            title: {
              display: true,
              text: "중위소득 (%)",
            },
          },
        },
      },
    });
    addData(myChart, resultPercent, resultTo);
  }
}

//
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.data.datasets[0].data.sort(function (a, b) {
    return a - b;
  });
  chart.data.labels.sort(function (a, b) {
    return a - b;
  });
  chart.update();
}

function getCsrfToken() {
  return document.cookie
    .split(";")
    .find((item) => item.includes("csrftoken"))
    .split("=")[1];
}

// phone-submit 버튼 누르면 모달창 뜨는 UI

$("#phone-submit").on("click", function () {
  $("#agreement").fadeIn();
});

$(".exit").on("click", function () {
  $("#agreement").fadeOut();
});

// 체크된 값 boolean
const is_agree = document.querySelector('input[name="agreement"]');

function agreement(event) {
  if (is_agree.checked == true) {
    console.log("보냈어요");
  } else {
    alert("개인정보 제공 동의서에 동의해주세요.");
    event.preventDefault();
  }
}
$("#agree-submit").on("click", agreement);
