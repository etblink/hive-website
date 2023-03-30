function truncateTitle(title, maxLength = 30) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

export default truncateTitle;
