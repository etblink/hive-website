import { Client, PrivateKey, cryptoUtils } from '@hiveio/dhive';

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

// Function to fetch user's recent posts
export async function getUserPosts(username, limit = 5) {
  try {
    const posts = await client.database.getDiscussions('blog', { tag: username, limit });
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
}
