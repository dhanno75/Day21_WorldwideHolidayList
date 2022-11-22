let url =
  "https://calendarific.com/api/v2/countries?api_key=248b0a97898564f4c3c2672cb6dfe64f407f3bfd";
let dataStore = [];

// Get Country details
const getCountryDetails = async () => {
  try {
    // Inside fetch there is no data except url because removing that data solved the cors issue
    const countries = await fetch(url);
    const data = await countries.json();
    dataStore = data.response.countries;
    for (let country of data.response.countries) {
      renderHolidayDetails(country);
    }
  } catch (err) {
    document.querySelector(".main-container").innerHTML =
      "Something went wrong, Please try after some time!";
  }
};
getCountryDetails();

// Display holiday count of each country
const renderHolidayDetails = (country) => {
  document.querySelector(".main-container").innerHTML += `
    <div class='container'>
      <h2><span> ${country.country_name}</span></h2>
      <ul>
        <li>Total Holidays: ${country.total_holidays}</li>
        <li>Supported Languages: ${country["supported_languages"]}</li>
        <li>Country code: ${country["iso-3166"]}</li>
        <li>UUID: ${country.uuid}</li>
      </ul>
    </div>
  `;
};

// Search country
const search = document.querySelector(".search");
search.addEventListener("keyup", (e) => {
  e.preventDefault();
  let textSearched = search.value;
  let filteredData = [];
  console.log(dataStore);

  if (textSearched !== "") {
    filteredData = dataStore.filter(
      (country) =>
        country.country_name
          .toLowerCase()
          .includes(textSearched.toLowerCase()) ||
        country["iso-3166"].includes(textSearched)
    );

    if (filteredData.length !== 0) {
      document.querySelector(".main-container").innerHTML = "";
    }

    for (let data of filteredData) {
      renderSearchData(data);
    }
  } else {
    alert("No such country found!");
    getCountryDetails();
  }
});

// Render Search Data
const renderSearchData = (country) => {
  console.log(country.country_name);
  if (country.country_name === undefined) {
    alert("No such country found");
  }
  let mainContainer = document.querySelector(".main-container");
  // mainContainer.innerHTML = "";
  mainContainer.innerHTML += `
    <div class='container'>
      <h2><span> ${country.country_name}</span></h2>
      <ul>
        <li>Total Holidays: ${country.total_holidays}</li>
        <li>Supported Languages: ${country["supported_languages"]}</li>
        <li>Country code: ${country["iso-3166"]}</li>
        <li>UUID: ${country.uuid}</li>
      </ul>
    </div>
  `;
};
