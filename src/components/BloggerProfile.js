import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserAccount } from "../hive";

function BloggerProfile() {
  const { username } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchAccountData() {
      const accountData = await getUserAccount(username);
      console.log("Account data:", accountData); // Debugging
      setAccount(accountData);
    }
    fetchAccountData();
  }, [username]);

  if (!account) {
    return <p>Loading...</p>;
  }

  // Extract the profile image from the posting_json_metadata
  const postingMetadata = JSON.parse(account.posting_json_metadata);
  console.log("Posting metadata:", postingMetadata); // Debugging
  const profileImage = postingMetadata.profile.profile_image || "https://developers.hive.io/images/sticker.png";

  return (
    <div className="blogger-profile">
      <img className="blogger-profile__image" src={profileImage} alt={`${username}'s profile`} />
      <h2>About this Author</h2>
      <p>This section is to be filled in later. Eventually I will set up the OpenAI API to connect with GPT. My plan is to fetch the Hive users 5 most recent blog posts and extract the author's interests from each using GPT. Then I will use that information to interact with GPT a second time and have it write a short bio for the blogger. At some point, this text will be replaced with AI generated text.</p>
    </div>
  );
}

export default BloggerProfile;
