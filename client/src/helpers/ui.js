export function summarizeAddress(address , display = 4) {
  const start = address.slice(0, display);
  const end = address.slice(-display);
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
String.prototype.summarizeAddress = function () {
  return summarizeAddress(this);
};
