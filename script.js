let url =
  "https://calendarific.com/api/v2/countries?api_key=248b0a97898564f4c3c2672cb6dfe64f407f3bfd";

const getCountryDetails = async () => {
  try {
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
