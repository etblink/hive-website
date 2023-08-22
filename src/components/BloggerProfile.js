import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  let postingMetadata = {};
  try {
      postingMetadata = JSON.parse(account.posting_json_metadata || "{}");
  } catch (error) {
      console.error("Error parsing posting_json_metadata:", error);
  }
  console.log("Posting metadata:", postingMetadata); // Debugging
  
  const profileImage = postingMetadata.profile?.profile_image || "https://developers.hive.io/images/sticker.png";
  const profileAbout = postingMetadata.profile?.about || "";
  console.log(profileAbout);

  return (
    <div className="blogger-profile">
      <Link to={`/blogger/${username}`}><img className="blogger-profile__image" src={profileImage} alt={`${username}'s profile`} /></Link>
      <h2>About this Author</h2>
      <p>{profileAbout}</p>
    </div>
  );
}

export default BloggerProfile;
