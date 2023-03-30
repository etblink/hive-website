// Function to extract the first image URL from a markdown content string
function getFirstImageUrl(content) {
  // Regular expression to match the markdown image syntax
  const imgRegex = /!\[[^\]]*\]\(([^)]+)\)/;
  const match = imgRegex.exec(content);

  // Extract the first image URL from the content string and return it
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

export default getFirstImageUrl;