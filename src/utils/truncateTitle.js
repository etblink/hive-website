// Function to truncate a title string to a specified maximum length
function truncateTitle(title, maxLength = 30) {
  // If the title is longer than the maximum length, truncate and append "..."
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  // Return the original or truncated title
  return title;
}

export default truncateTitle;