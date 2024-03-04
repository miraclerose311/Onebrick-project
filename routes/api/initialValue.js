const brickCount = process.env.BRICK_COUNT

function generateRandomId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const lengthOfId = 6;

  for (let i = 0; i < lengthOfId; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function generateManyRandomIds(numberOfIds) {
  const ids = new Set(); // Using a Set to ensure all IDs are unique

  while (ids.size < numberOfIds) {
    ids.add(generateRandomId());
  }

  return [...ids]; // Convert the set back to an array
}

const randomIds = generateManyRandomIds(brickCount);

module.exports = randomIds;
