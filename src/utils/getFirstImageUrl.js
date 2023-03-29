function getFirstImageUrl(content) {
    const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    const match = imgRegex.exec(content);
  
    if (match && match[1]) {
      return match[1];
    }
  
    return null;
  }
  
  export default getFirstImageUrl;
  