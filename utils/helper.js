export function truncate(text, maxLength, suffix = "...") {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + suffix;
  }
  return text;
}
