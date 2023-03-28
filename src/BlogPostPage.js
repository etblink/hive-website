import React, { useState, useEffect } from 'react';
import { getPost } from './hive';
import { useParams } from 'react-router-dom';

function BlogPostPage({ match }) {
  const { author, permlink } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const postData = await getPost(author, permlink);
      setPost(postData);
    }

    fetchData();
  }, [author, permlink]);

  const renderPostContent = () => {
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(post.body);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const baseUrl = 'https://images.hive.blog/';

    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const imgUrl = img.getAttribute('src');
      if (!imgUrl.startsWith('http')) {
        img.setAttribute('src', baseUrl + imgUrl);
      }
    });

    const links = doc.querySelectorAll('a');
    links.forEach((link) => {
      const linkUrl = link.getAttribute('href');
      if (!linkUrl.startsWith('http')) {
        link.setAttribute('href', baseUrl + linkUrl);
      }
    });

    return { __html: doc.body.innerHTML };
  };

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>By {post.author}</p>
          <div dangerouslySetInnerHTML={renderPostContent()} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPostPage;
