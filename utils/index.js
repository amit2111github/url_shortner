const convertToShortUrl = (longUrl) => {
  if (!longUrl) throw new Error("Url length cannot be zero");
  let value = 0,
    prime = 31,
    index = 0,
    mod = 1000000007;
  for (let char of longUrl) {
    value += (Math.pow(prime, index++) * getPosition(char)) % mod;
    value %= mod;
  }
  let result = (value + "")
    .split("")
    .map(Number)
    .map((number) => getLetterFromPosition(number))
    .join("");
  while (result.length < 7) result = "0" + result;
  return result.slice(0, 7);
};

function getLetterFromPosition(position) {
  if (position < 0 || position > 26) {
    throw new Error("Position must be between 1 and 26.");
  }
  return String.fromCharCode("a".charCodeAt(0) + position + 1);
}

const getPosition = (alphabet) => {
  return alphabet.charCodeAt(0);
};

module.exports = { convertToShortUrl };
