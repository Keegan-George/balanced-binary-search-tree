function randomNumbersArray(length, min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError("Only integer inputs are supported.");
  }

  return Array.from({ length: length }, () =>
    Math.floor(Math.random() * (max - min + 1) + min),
  );
}

export { randomNumbersArray };
