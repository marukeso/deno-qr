export const isUrl = (input: unknown): boolean => {
  if (typeof input !== "string") {
    return false;
  }

  const pattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g;
  return pattern.test(input);
};
