const GetError = (err) => {
  return err.response && err.response.data.message
    ? err.response.data.message
    : err.message;
};
export default GetError;

export function moneyFormat(num) {
  return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export function toSeoUrl(url) {
  return url
    .toString() // Convert to string
    .normalize('NFD') // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, ''); // Remove trailing dashes
}
