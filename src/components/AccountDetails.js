import React from "react";

function AccountDetails({ account }) {
  if (!account) {
    return <p>Loading account details...</p>;
  }

  return (
    <div className="account-details">
      <h2 className="account-details__title">Account Details</h2>
      <p>Username: {account.name}</p>
      <p>Reputation: {account.reputation}</p>
      <p>Balance: {account.balance}</p>
    </div>
);
}

export default AccountDetails;