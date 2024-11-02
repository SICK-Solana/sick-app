export function truncate(text, maxLength, suffix = "...") {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + suffix;
  }
  return text;
}

export function sortCrates(crates, sortOption) {
  if (!crates) {
    return [];
  }

  return [...crates].sort((a, b) => {
    if (sortOption === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "Most Upvotes") {
      return b.upvotes - a.upvotes;
    } else if (sortOption === "Most Downvotes") {
      return b.downvotes - a.downvotes;
    }
    return 0;
  });
};
