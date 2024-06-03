const strPadStart = (input, targetLength = 2, padString = "0") => {
  return String(input).padStart(targetLength, padString);
};

export default strPadStart;
