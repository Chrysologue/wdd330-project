import { qs, headerAndFooter } from "./utils.mjs";
import { CountryDetails } from "./CountryDetails.mjs";

const countryInfo = qs("#country-info");
if (countryInfo) {
  const country = new CountryDetails("Madagascar", countryInfo);
  country.init();
}

headerAndFooter();
