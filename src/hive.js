import { Client, DatabaseAPI } from '@hiveio/dhive';

// Initialize the Hive client
const client = new Client('https://api.hive.blog');

// Function to fetch user account details
export async function getUserAccount(username) {
  try {
    const accounts = await client.database.getAccounts([username]);
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error fetching user account:', error);
    return null;
  }
}

export async function fetchRecent3Posts(username, limit = 9) {
  const db = new DatabaseAPI(client);
  try {
    const posts = await db.getDiscussions('blog', { tag: username, limit });
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}


export async function fetchBlogPosts(username, limit = 20) {
  const db = new DatabaseAPI(client);
  try {
    const posts = await db.getDiscussions('blog', { tag: username, limit });
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getPost(author, permlink) {
  try {
    const post = await client.database.call('get_content', [author, permlink]);
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}