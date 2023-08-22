import { Client, DatabaseAPI } from "@hiveio/dhive";
import getFirstImageUrl from "./utils/getFirstImageUrl";

// Functions to interact with the Hive API
const client = new Client("https://anyx.io");

const db = new DatabaseAPI(client);

// Function to fetch user account details
export async function getUserAccount(username) {
  try {
    const accounts = await client.database.getAccounts([username]);
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error fetching user account:", error);
    return null;
  }
}

// Function to fetch posts with specified limit and discussion type
async function fetchPosts(username, limit, discussionTypes = ["trending", "blog"]) {
  let allPosts = [];
  for (let discussionType of discussionTypes) {
    try {
      const posts = await db.getDiscussions(discussionType, {
        tag: username,
        limit: limit,
      });
      allPosts = allPosts.concat(posts);
    } catch (error) {
      console.error(`Error fetching ${discussionType} posts:`, error);
    }
  }
  return allPosts;
}

// Functions to fetch recent and blog posts for a specified user
export function fetchRecentPosts(username, limit = 11) {
  return fetchPosts(username, limit);
}

export function fetchBlogPosts(username, limit = 20) {
  return fetchPosts(username, limit);
}

// Function to fetch a single post from the Hive API
export async function getPost(author, permlink) {
  try {
    const post = await client.database.call("get_content", [author, permlink]);
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

// Function to fetch a single post with its first image URL
export async function getPostWithFirstImageUrl(author, permlink) {
  const post = await getPost(author, permlink);

  if (post) {
    post.firstImageUrl = getFirstImageUrl(post.body);
  }

  return post;
}