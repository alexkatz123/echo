import * as ct from "countries-and-timezones";

export function GetCountryFromTimezone(timezone?: string) {
  if (!timezone) {
    return null;
  }
  const timezoneInfo = ct.getTimezone(timezone);
  if (!timezoneInfo?.countries.length) {
    return null;
  }
  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);
  return {
    code: countryCode,
    name: country?.name || countryCode,
  };
}

export function GetCountryFlagUrl(countryCode: string) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}