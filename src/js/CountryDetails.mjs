//Class which will use Rest API to get country details
function convertToJson(res) {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export class CountryDetails {
  constructor(countryName, parentElement) {
    this.countryName = countryName;
    this.parentElement = parentElement;
    this.apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
  }
  fetchCountryDetails() {
    return fetch(this.apiUrl).then((res) => convertToJson(res));
  }
  async getCountryDetails() {
    try {
      const data = await this.fetchCountryDetails();
      return data[0];
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
  renderCountryDetails(country) {
    const html = createHtmlTemplate(country);
    this.parentElement.innerHTML = html;
  }
  async init() {
    const country = await this.getCountryDetails();
    this.renderCountryDetails(country);
  }
}
function createHtmlTemplate(country) {
  const population = country.population.toLocaleString();
  const languages = Object.values(country.languages).join(", ");
  const currencies = Object.values(country.currencies)
    .map((c) => `${c.name} (${c.symbol})`)
    .join(", ");
  return `
    <div class="country-card">
        <h3>Population:</h3>
        <p>${population}</p>
    </div>
    <div class="country-card">
        <h3>Official Languages:</h3>
        <p>${languages}</p>
    </div>
    <div class="country-card">
        <h3>Currencies:</h3>
        <p>${currencies}</p>
    </div>
    <div class="country-card full-width">
        <h3>Capital:</h3>
        <p>${country.capital[0]}</p>
    </div>
    <div class="country-card full-width">
        <h3>Timezone:</h3>
        <p>${country.timezones[0]}</p>
    </div>
    `;
}
