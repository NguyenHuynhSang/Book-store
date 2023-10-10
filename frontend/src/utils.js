const GetError = (err) => {
  return err.response && err.response.data.message
    ? err.response.data.message
    : err.message;
};
export default GetError;

export function moneyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}
