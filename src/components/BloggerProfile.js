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
  const profileImage = postingMetadata.profile.profile_image || "https://via.placeholder.com/150";

  return (
    <div className="blogger-profile">
      <img className="blogger-profile__image" src={profileImage} alt={`${username}'s profile`} />
      <h2>About this Author</h2>
      <p>Section to be filled in later.</p>
    </div>
  );
}

export default BloggerProfile;
