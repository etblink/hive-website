import showdown from "showdown";
import DOMPurify from "dompurify";

// Function to convert markdown content to sanitized HTML with necessary transformations
function processPostContent(content) {
  // Convert the markdown content to HTML using Showdown library
  const converter = new showdown.Converter();
  const htmlContent = converter.makeHtml(content);

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const baseUrl = "https://images.hive.blog/";

  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    const imgUrl = img.getAttribute("src");
    if (!imgUrl.startsWith("http")) {
      img.setAttribute("src", baseUrl + imgUrl);
    }
  });

  // Add embedded videos for 3speak.tv
  const videoLinks = doc.querySelectorAll("a");
  const processedVideoUrls = new Set(); 

  videoLinks.forEach((link) => {
    const linkUrl = link.getAttribute("href");
    const videoRegex = /(https?:\/\/(?:www\.)?3speak\.tv\/watch\?v=[^"\s]+)/;
    const match = videoRegex.exec(linkUrl);

    if (match && !processedVideoUrls.has(linkUrl)) { 
      processedVideoUrls.add(linkUrl); 
      const videoId = match[1].split("=")[1].replace("/", "/"); 
      const iframe = doc.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = `https://3speak.tv/embed?v=${videoId}`;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "true");
      link.replaceWith(iframe);
    } else if (!linkUrl.startsWith("http")) {
      link.setAttribute("href", baseUrl + linkUrl);
    }
  });

  // Process and sanitize the HTML content using DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(doc.body.innerHTML);

  // Return the processed and sanitized HTML content
  return doc;
}

export default processPostContent;