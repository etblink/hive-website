import showdown from "showdown";
import DOMPurify from "dompurify";

function processPostContent(content) {
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

  const links = doc.querySelectorAll("a");
  links.forEach((link) => {
    const linkUrl = link.getAttribute("href");
    if (!linkUrl.startsWith("http")) {
      link.setAttribute("href", baseUrl + linkUrl);
    }
  });

  // Sanitize the HTML content using DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(doc.body.innerHTML);

  return sanitizedHtml;
}

export default processPostContent;
