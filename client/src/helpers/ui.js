export function summarizeAddress(address) {
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}....${end}`;
}
String.prototype.toSentence = function () {
  function camelToSentence(camelCase) {
    return camelCase
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return camelToSentence(this);
};
