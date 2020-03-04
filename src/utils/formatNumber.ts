const formatNumber = (number: number) => {
  if (number > 1000000000000) {
    return `${Math.round(number / 1000000000000)} trillion`;
  }
  if (number > 1000000000) {
    return `${Math.round(number / 1000000000)} billion`;
  }
  if (number > 1000000) {
    return `${Math.round(number / 1000000)} million`;
  }
  if (number > 1000) {
    return `${Math.round(number / 1000)} thousand`;
  }
  return number;
}

export default formatNumber;
