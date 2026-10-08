export const limitWords = (text: string = "", limit: number) => {
  const words = text.trim().split(/\s+/);

  if (words.length <= limit) {
    return text;
  }

  return words.slice(0, limit).join(" ") + "...";
};
