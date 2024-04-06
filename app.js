const container = document.querySelector(".container");
const meal_title = container.querySelector("#meal-title");
const breakfast = container.querySelector("#breakfast");
const lunch = container.querySelector("#lunch");
const dinner = container.querySelector("#dinner");
const next_button = container.querySelector("#next-button");
const back_button = container.querySelector("#back-button");
const day = document.querySelector(".date");
const nextDay = document.querySelector(".next-day");
const prevDay = document.querySelector(".prev-day");

const today = new Date();

let cur_meal = 0;

const createNewMeal = () => {
  const newMeal = document.createElement("li");
  newMeal.innerHTML = "등록된 식단이 없습니다.";
  newMeal.classList.add(
    "fs-4",
    "list-group-item",
    "bg-transparent",
    "text-center"
  );

  return newMeal;
}

const refreshMeal = () => {
  breakfast.innerHTML = "";
  lunch.innerHTML = "";
  dinner.innerHTML = "";

  breakfast.append(createNewMeal());
  lunch.append(createNewMeal());
  dinner.append(createNewMeal());

  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');

  console.log(year, month, date);

  fetch(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=5bf6d0aa4370464793f2ed55b2269040&Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750161&MLSV_YMD=${
      year + month + date
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.RESULT) {
      } else {
        for (let i = 0; i < data.mealServiceDietInfo[1].row.length; i++) {
          if (i == 0) {
            const len = breakfast.children.length;
            for (let j = 0; j < len; j++) {
              breakfast.removeChild(breakfast.children[0]);
            }
          } else if (i == 1) {
            const len = lunch.children.length;
            for (let j = 0; j < len; j++) {
              lunch.removeChild(lunch.children[0]);
            }
          } else {
            const len = dinner.children.length;
            for (let j = 0; j < len; j++) {
              dinner.removeChild(dinner.children[0]);
            }
          }

          const newData = data.mealServiceDietInfo[1].row[i].DDISH_NM;
          for (let j = 0; j < newData.split("<br/>").length; j++) {
            const newMeal = document.createElement("li");
            newMeal.innerHTML = newData.split("<br/>")[j];
            newMeal.classList.add(
              "fs-4",
              "list-group-item",
              "bg-transparent",
              "text-center"
            );
            if (i == 0) breakfast.append(newMeal);
            else if (i == 1) lunch.append(newMeal);
            else dinner.append(newMeal);
          }
        }
      }
    });
};

const updateDate = () => {
  day.innerHTML =
    today.getFullYear().toString() +
    "/" +
    (today.getMonth() + 1).toString() +
    "/" +
    today.getDate().toString();
};

updateDate();
refreshMeal();

prevDay.addEventListener("click", () => {
  today.setDate(today.getDate() - 1);
  breakfast.innerHTML = "";
  lunch.innerHTML = "";
  dinner.innerHTML = "";
  updateDate();
  refreshMeal();
});

nextDay.addEventListener("click", () => {
  today.setDate(today.getDate() + 1);
  breakfast.innerHTML = "";
  lunch.innerHTML = "";
  dinner.innerHTML = "";
  updateDate();
  refreshMeal();
});
