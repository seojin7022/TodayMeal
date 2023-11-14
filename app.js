const container = document.querySelector(".container");
const meal_title = container.querySelector("#meal-title");
const meal = container.querySelector("#meal");

const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString();
const date = today.getDate().toString();

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
        const newData = data.mealServiceDietInfo[1].row[i].DDISH_NM;
        for (let j = 0; j < newData.split("<br/>").length; j++) {
          const newMeal = document.createElement("li");
          newMeal.innerHTML = newData.split("<br/>")[j];
          meal.append(newMeal);
        }
        const line = document.createElement("hr");
        meal.append(line);
      }
    }
  });
