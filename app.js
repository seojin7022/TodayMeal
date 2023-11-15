const container = document.querySelector(".container");
const meal_title = container.querySelector("#meal-title");
const meal = container.querySelector("#meal");
const next_button = container.querySelector("#next-button");
const back_button = container.querySelector("#back-button");

const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString();
const date = today.getDate().toString();

let cur_meal = 0;

const refreshMeal = () => {
  const len = meal.children.length;
  for (let i = 0; i < len; i++) {
    console.log(i, meal.children[0]);
    meal.removeChild(meal.children[0]);
  }
  fetch(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=5bf6d0aa4370464793f2ed55b2269040&Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750161&MLSV_YMD=${
      year + month + date
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(today);
      if (data.RESULT) {
        meal.innerHTML = "등록된 식단이 없습니다.";
      } else {
        for (let i = 0; i < data.mealServiceDietInfo[1].row.length; i++) {
          if (i == cur_meal) {
            meal_title.innerHTML = i == 0 ? "중식" : "석식";

            const newData = data.mealServiceDietInfo[1].row[i].DDISH_NM;
            for (let j = 0; j < newData.split("<br/>").length; j++) {
              const newMeal = document.createElement("li");
              newMeal.innerHTML = newData.split("<br/>")[j];
              newMeal.classList.add(
                "fs-4",
                "list-group-item",
                "bg-transparent"
              );
              meal.append(newMeal);
            }
          } else if (!data.mealServiceDietInfo[1].row[cur_meal]) {
            meal_title.innerHTML = cur_meal == 0 ? "중식" : "석식";
            const newMeal = document.createElement("li");
            newMeal.innerHTML = "등록된 식단이 없습니다.";
            newMeal.classList.add("fs-4", "list-group-item", "bg-transparent");
            meal.append(newMeal);
          }
        }
      }
    });
};

next_button.addEventListener("click", (event) => {
  if (cur_meal == 0) {
    cur_meal = 1;
    refreshMeal();
  }
});

back_button.addEventListener("click", (event) => {
  if (cur_meal == 1) {
    cur_meal = 0;
    refreshMeal();
  }
});

refreshMeal();
