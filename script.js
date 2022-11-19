let url =
  "https://calendarific.com/api/v2/countries?api_key=248b0a97898564f4c3c2672cb6dfe64f407f3bfd";

// Get Country details
const getCountryDetails = async () => {
  try {
    // Inside fetch there is no data except url because removing that data solved the cors issue
    const cats = await fetch(url);
    const data = await cats.json();
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
