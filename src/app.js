import "./scss/main.scss";

// Change year and day settings
const initialYear = 1919;
const finalYear = 2019;
const initialDay = 1;
const finalDay = 31;
// Age gate requirement setting
const ageRequirement = 21;
// Elements
const enterBtn = document.getElementById("enter-btn");
const monthDropdown = document.getElementById("month");
const dayDropdown = document.getElementById("day");
const yearDropdown = document.getElementById("year");
const result = document.getElementById("result");
const ageGate = document.getElementById("ageGate");
const saveCookie = document.getElementById("saveCookie");

// Functions
const loadDays = (i, f) => {
  let allDays = [];
  const initialDay = i;
  const finalDay = f;
  for (let days = initialDay; days <= finalDay; days++) {
    allDays.push(days);
  }

  return allDays.map(day => {
    let node = document.createElement("option");
    let textNode = document.createTextNode(`${day}`);
    node.value = day;
    node.appendChild(textNode);
    document.getElementById("day").appendChild(node);
  });
};

const loadYears = (i, f) => {
  let allYears = [];
  const initialYear = i;
  const finalYear = f;
  for (let years = initialYear; years <= finalYear; years++) {
    allYears.push(years);
  }
  return allYears.map(year => {
    let node = document.createElement("option");
    let textNode = document.createTextNode(`${year}`);
    node.value = year;
    node.appendChild(textNode);
    document.getElementById("year").appendChild(node);
  });
};

const checkAge = age => {
  // Drop-down values
  const month = monthDropdown.options[monthDropdown.selectedIndex].value;
  const day = dayDropdown.options[dayDropdown.selectedIndex].value;
  const year = yearDropdown.options[yearDropdown.selectedIndex].value;

  // Entered date
  let enteredDate = new Date();
  enteredDate.setFullYear(year, month - 1, day);

  // Todays date
  let todaysDate = new Date();
  todaysDate.setFullYear(todaysDate.getFullYear() - age);

  // Check dates against each other and update to div #result
  if (todaysDate - enteredDate < 0) {
    result.innerHTML = `<p class="negative">Sorry, only people ${age} and over can enter this site.</p>`;
    // Removes result message after 3s
    setTimeout(() => {
      result.innerHTML = "";
    }, 2000);
  } else {
    console.log(saveCookie.checked);
    result.innerHTML = `<p class="positive">Welcome!</p>`;

    // If Checkbox is checked then cookie is set
    if (saveCookie.checked == true) {
      setCookie("ageGatePassed", "true", 1);
    }
    // Removes ageGate after 3s
    setTimeout(() => {
      ageGate.classList.toggle("active");
    }, 2000);
  }
};

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

const getCookie = cname => {
  let cookie = document.cookie;
  let prefix = `${cname}=`;
  let begin = cookie.indexOf("; " + prefix);
  let end;
  if (begin == -1) {
    begin = cookie.indexOf(prefix);
    if (begin != 0) {
      return null;
    }
  } else {
    begin += 2;
    end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = cookie.length;
    }
  }
  return unescape(cookie.substring(begin + prefix.length, end));
};

const checkCookie = cname => {
  let name = getCookie(cname);
  if (name == null) {
    return false;
  } else {
    return true;
  }
};

// On Body Load
document.body.onload = () => {
  loadDays(initialDay, finalDay);
  loadYears(initialYear, finalYear);
  // Check if site has previously been visited
  if (checkCookie("ageGatePassed") == true) {
  } else {
    ageGate.classList.toggle("active");
    enterBtn.addEventListener("click", () => {
      // Check that form is completed
      if (
        monthDropdown.options[monthDropdown.selectedIndex].value == "empty" ||
        dayDropdown.options[dayDropdown.selectedIndex].value == "empty" ||
        yearDropdown.options[yearDropdown.selectedIndex].value == "empty"
      ) {
        result.innerHTML = `<p class="negative">Form is incomplete. Please try again.</p>`;
        // Removes result message after 3s
        setTimeout(() => {
          result.innerHTML = "";
        }, 2000);
      } else {
        checkAge(ageRequirement);
      }
    });
  }
};
