let button = document.getElementById("submitBtn");
let inputSearchName = document.getElementById("inputSearchName");
let inputSearchFirstLetter = document.getElementById("inputSearchFirstLetter");

let inputName = document.getElementById("inputName");

let inputEmail = document.getElementById("inputEmail");
let inputPhone = document.getElementById("inputPhone");
let inputPassword = document.getElementById("inputPassword");
let inputAge = document.getElementById("inputAge");
let inputRepassword = document.getElementById("inputRepassword");
$(function () {
  $(".loader").fadeOut(2000, function () {
    $(".loading").slideUp(1000, function () {
      $("body").css("overflow", "auto");
    });
  });
});
AOS.init();
// nav
function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
// end nav
// Errors Invalid
let invalidName = document.getElementById("invalidName");
let invalidEmail = document.getElementById("invalidEmail");
let invalidPhone = document.getElementById("invalidPhone");
let invalidAge = document.getElementById("invalidAge");
let invalidPassword = document.getElementById("invalidPassword");
let invalidRePassword = document.getElementById("invalidRePassword");

let flagEmail = false;
let flagName = false;
let flagPassword = false;
let flagRePassword = false;
let flagPhone = false;
let flagAge = false;

// loading
// $(document).on("load", function(){
//     $(".loading").hide(200);
// });
// Email
function validateEmail(email) {
  // Regular expression pattern for validating email addresses
  var pattern = /^[a-zA-Z0-9]{4,}@(gmail|yahoo).com$/;
  return pattern.test(email);
}
inputEmail.addEventListener("keyup", function () {
  if (validateEmail(inputEmail.value)) {
    flagEmail = true;
    invalidEmail.style.display = "none";
    submit();
  } else {
    invalidEmail.style.display = "block";
  }
});

// password & rePassword
function validatePassword(pass) {
  // Regular expression pattern for validating password
  var pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return pattern.test(pass);
}
inputPassword.addEventListener("keyup", function () {
  if (validatePassword(inputPassword.value)) {
    flagPassword = true;
    invalidPassword.style.display = "none";
    submit();
  } else {
    invalidPassword.style.display = "block";
  }
});
inputRepassword.addEventListener("keyup", function () {
  if (inputRepassword.value == inputPassword.value) {
    flagRePassword = true;
    invalidRePassword.style.display = "none";
    submit();
  } else {
    invalidRePassword.style.display = "block";
  }
});

//  name
function validateName(name) {
  // Regular expression pattern for validating name
  var pattern = /^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/;
  return pattern.test(name);
}
inputName.addEventListener("keyup", function () {
  if (validateName(inputName.value)) {
    flagName = true;
    invalidName.style.display = "none";
    submit();
  } else {
    invalidName.style.display = "block";
  }
});

//  phone
function validatePhone(phone) {
  // Regular expression pattern for validating phone
  var pattern = /^(002|\+?2|0)([\/( ]?\d{3}[)\/ ]?)?\d{8}$/;
  return pattern.test(phone);
}
inputPhone.addEventListener("keyup", function () {
  if (validatePhone(inputPhone.value)) {
    flagPhone = true;
    invalidPhone.style.display = "none";
    submit();
  } else {
    invalidPhone.style.display = "block";
  }
});

//  age
function validateAge(age) {
  // Regular expression pattern for validating age
  var pattern = /^([1-9]|[1-7][0-9]|80)$/;
  return pattern.test(age);
}
inputAge.addEventListener("keyup", function () {
  if (validateAge(inputAge.value)) {
    flagAge = true;
    invalidAge.style.display = "none";
    submit();
  } else {
    invalidAge.style.display = "block";
  }
});

function submit() {
  if (
    flagAge &&
    flagEmail &&
    flagPassword &&
    flagRePassword &&
    flagPhone &&
    flagName
  ) {
    button.disabled = false;
    $(".success").fadeIn("3000");
  } else {
    button.disabled = true;
  }
}

// this function that get data from api that show when project start
async function getDataBySearchNameMeal(nameMeal = "") {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`
  );
  let response = await data.json();

  showDataBySearchNameMeal(response.meals);
}

// this function that display data by search Name
function showDataBySearchNameMeal(data) {
  let cards = ``;
  for (let i = 0; i < data.length; i++) {
    cards += `
        <div data-aos="fade-up" class="col-lg-3">
                    <div class="image" onclick="getDetailsByMealId(${data[i].idMeal})">
                        <img src='${data[i].strMealThumb}' class="w-100" alt="">
                        <div class="captionImage px-2 text-dark">
                            <h2>${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>

        `;
  }
  document.getElementById("rowShowData").innerHTML = cards;
}

// get data from api by use first character
async function getDataBySearchFirstLetter(ch) {
  $(".loading").show();
  $(".loader").show();
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${ch}`
  );
  let response = await data.json();
  console.log(response.meals);
  showDataBySearchNameMeal(response.meals);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}

//this function that display data by search first letter
// function showDataBySearchFirstLetterMeal(data){
//     let cards=``;
//     for (let i=0; i<data.length; i++){
//         cards+=
//         `
//         <div class="col-lg-3">
//                     <div class="image" onclick="getDetailsByMealId(${data[i].idMeal})">
//                         <img src='${data[i].strMealThumb}' class="w-100" alt="">
//                         <div class="captionImage px-2 text-dark">
//                             <h2>${data[i].strMeal}</h2>
//                         </div>
//                     </div>
//                 </div>

//         `

//     }
//     document.getElementById("rowShowData").innerHTML=cards;

// }
// to show and get detail to meals
async function getDetailsByMealId(id) {
  $(".loading").show();
  $(".loader").show();

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let response = await data.json();
  console.log(response.meals[0]);
  showDetailsByMealId(response.meals[0]);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}
function showDetailsByMealId(data) {
  let cards = ``;
  cards = `
    <div data-aos="fade-up" class="col-lg-4">
    <div class="leftContent py-5">
        <div class="imageDetails overflow-hidden rounded-5">
            <img src="${data.strMealThumb}" class="w-100" alt="">
        </div>
        <h1 class="fw-bold">${data.strMeal.split(" ")[0]}</h1>


    </div>
</div>
<div data-aos="fade-up" class="col-lg-8">
    <div class="rightContent py-5">
        <h1 class="fw-bold">Instructions</h1>
        <p>${data.strInstructions}</p>
        <h3><span>Area :</span>${data.strArea}</h3>
        <h3><span>Category :</span>${data.strCategory}</h3>
        <h3><span>Recipes :</span></h3>
        <div class="des">
            <ul class="list-unstyled">
                <li>${
                  (data.strMeasure1 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure1
                }${
    (data.strIngredient1 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient1
  }</li>


                <li>${
                  (data.strMeasure2 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure2
                } ${
    (data.strIngredient2 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient2
  }</li>



                <li>${
                  (data.strMeasure3 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure3
                } ${
    (data.strIngredient3 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient3
  }
                </li>


                <li>
                ${
                  (data.strMeasure4 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure4
                } ${
    (data.strIngredient4 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient4
  }
                </li>


                <li>
                ${
                  (data.strMeasure5 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure5
                } ${
    (data.strIngredient5 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient5
  }
                </li>
                <li>
                ${
                  (data.strMeasure7 == null) 
                    ? $(this).addClass("d-none")
                    : data.strMeasure7
                } ${
    (data.strIngredient7 == null) 
      ? $(this).addClass("d-none")
      : data.strIngredient7
  }
              
            </ul>
          
        </div>
        <h3 class="mb-3"><span>Tags :</span></h3>
        <span id="soup" class="my-3">Soup</span>
        <div data-aos="fade-up" class="buttonsDetails mt-4">
           <a href="${
             data.strSource == null
               ? "https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/"
               : data.strSource
           }" target="_blank" class="bg-warning p-2 rounded-2 mt-2 me-2">Source</a> 
           <a href="${
             data.strYoutube == null
               ? "https://www.youtube.com/"
               : data.strYoutube
           }" target="_blank" class="bg-danger p-2 rounded-2 mt-2 me-2">Youtube</a> 
            
        </div>
    </div>
</div>

    `;
  document.getElementById("rowShowData").innerHTML = cards;
}
// this function that get all data category from api
async function getAllCategory() {
  $(".loading").show();
  $(".loader").show();
  document.getElementById("rowShowDataContact").style.display = "none";
  document.getElementById("search").style.display = "none";
  document.getElementById("rowShowData").style.display = "flex";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await data.json();
  console.log(response.categories);
  showAllCategories(response.categories);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}
function showAllCategories(data) {
  let cards = ``;
  for (let i = 0; i < data.length; i++) {
    cards += `
        <div data-aos="fade-up" class="col-lg-3">
        <div class="leftCategory">
            <div class="image" onclick="getCategoryMealsByNameCategory('${data[i].strCategory}')">
                <img src="${data[i].strCategoryThumb}" alt="" class="w-100">
                <div class="categoryCaption text-center  px-1 text-dark">
                    <h4 class="fw-bold">${data[i].strCategory}</h4>
                    <p>${data[i].strCategoryDescription}</p>
                    
                </div>
            </div>
           
        </div>
       </div>

        `;
  }
  document.getElementById("rowShowData").innerHTML = cards;
}
async function getCategoryMealsByNameCategory(nameMeals) {
  $(".loading").show();
  $(".loader").show();
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameMeals}`
  );
  let response = await data.json();
  showCategoryMealsByNameCategory(response.meals);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}
function showCategoryMealsByNameCategory(data) {
  let cards = ``;
  for (let i = 0; i < data.length; i++) {
    cards += `
        <div data-aos="fade-up" class="col-lg-3">
        <div   class="imageCategoryByName" onclick="getDetailsByMealId('${data[i].idMeal}')">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
            <div class="captionByCategoryName">
                <h5 class="text-wrap text-dark">${data[i].strMeal}</h5>
            </div>
        </div>
    </div>

        `;
  }
  document.getElementById("rowShowData").innerHTML = cards;
}

// this function that get all  Area from api
async function getAllArea() {
  $(".loading").show();
  $(".loader").show();
  document.getElementById("rowShowDataContact").style.display = "none";
  document.getElementById("search").style.display = "none";
  document.getElementById("rowShowData").style.display = "flex";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await data.json();
  showAllAreas(response.meals);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}
function showAllAreas(data) {
  let cards = ``;
  for (let i = 0; i < data.length; i++) {
    cards += `
        <div data-aos="fade-up" class="col-lg-3">
        <div class="areaIcons text-center" onclick="filterByArea('${data[i].strArea}')">
            <i class="fa-solid fa-house-laptop"></i>
            <h3>${data[i].strArea}</h3>
        </div>
    
    </div>

        `;
  }
  document.getElementById("rowShowData").innerHTML = cards;
}
// filter by area
async function filterByArea(area) {
  $(".loading").show();
  $(".loader").show();
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let response = await data.json();

  showCategoryMealsByNameCategory(response.meals);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}

// this function that get all ingredients from api
async function getAllIngredients() {
  $(".loading").show();
  $(".loader").show();
  document.getElementById("rowShowDataContact").style.display = "none";
  document.getElementById("rowShowData").style.display = "flex";
  document.getElementById("search").style.display = "none";

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await data.json();
  showAllIngredients(response.meals.slice(0, 20));
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}
function showAllIngredients(data) {
  $(".loading-screen").fadeIn(300);
  let cards = ``;
  for (let i = 0; i < data.length; i++) {
    cards += `
        <div data-aos="fade-up" class="col-lg-3">
                    <div class="ingredientsShow text-center text-white " onclick="filterByIngredients('${
                      data[i].strIngredient
                    }')" >
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h4>${data[i].strIngredient}</h4>
                        <p>${data[i].strDescription
                          .split(" ")
                          .slice(0, 25)
                          .join(" ")}</p>


                    </div>
                </div>

        `;
  }
  document.getElementById("rowShowData").innerHTML = cards;
}
// filter by Ingredient
async function filterByIngredients(ingredients) {
  $(".loading").show();
  $(".loader").show();
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );

  let response = await data.json();

  showCategoryMealsByNameCategory(response.meals);
  $(".loader").fadeOut(300, function () {
    $(".loading").hide();
  });
}

// this function that get data from api that show when project start
getDataBySearchNameMeal();
// getAllCategory()
// getAllArea()
// getAllIngredients()
// submit()
function showContacts() {
  document.getElementById("rowShowDataContact").style.display = "block";
  document.getElementById("rowShowData").style.display = "none";
  document.getElementById("search").style.display = "none";
}

function showSearchInputs() {
  document.getElementById("search").style.display = "block";
  document.getElementById("rowShowDataContact").style.display = "None";
  $("#rowShowData").html("");
}

inputSearchName.addEventListener("keyup", function () {
  getDataBySearchNameMeal(inputSearchName.value);
});

inputSearchFirstLetter.addEventListener("keyup", function () {
  getDataBySearchFirstLetter(inputSearchFirstLetter.value);
});

button.addEventListener("click", function () {
  inputAge.value = "";
  inputEmail.value = "";
  inputName.value = "";
  inputPassword.value = "";
  inputRepassword.value = "";
  inputPhone.value = "";
  document.getElementById("rowShowDataContact").style.display = "None";
  document.getElementById("search").style.display = "none";
  document.getElementById("rowShowData").style.display = "flex";
  getDataBySearchNameMeal();
});
