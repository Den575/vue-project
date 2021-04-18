export default function currencyFilter(value, currency = "PLN") {
  return new Intl.NumberFormat("pl", {
    style: "currency",
    currency
  }).format(value);
}
