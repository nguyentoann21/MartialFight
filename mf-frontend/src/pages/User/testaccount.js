import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ref = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalAccounts, setOriginalAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await fetch("https://localhost:7052/api/mf/players");
      const data = await response.json();
      setAccounts(data);
      setOriginalAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const updateAccountStatus = async (id, isActive) => {
    try {
      const response = await fetch(
        `https://localhost:7052/api/mf/${id}/active`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isActive),
        }
      );
      if (response.status === 200) {
        showDialog(await response.text());
      } else if (response.status === 403) {
        showDialog(await response.text());
      } else {
        showDialog("Error updating status. Please try again later");
      }
    } catch (error) {
      showDialog("Error updating status. Please try again later");
    }
  };

  const showDialog = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    loadAccounts();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === "") {
      setMessageSearch("Please enter a valid data for search");
      setAccounts(originalAccounts);
      return;
    }
    setMessageSearch("");

    const filteredAccounts = originalAccounts.filter(
      (account) =>
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAccounts(filteredAccounts);
  };

  return (
    <div>
      <h2>Account Management</h2>
      {originalAccounts.length === 0 ? (
        <p>No account data</p>
      ) : (
        <div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKey}
              className="i-search"
              onClick={() => setMessageSearch("")}
            />
            <button onClick={handleSearch} className="btn-s">
              <FaSearch />
            </button>
            <button onClick={() => loadAccounts()} className="btn-s">
              <FaSyncAlt />
            </button>
          </div>
          {messageSearch ? (
            <div className="error-message">{messageSearch}</div>
          ) : (
            <div
              className="none-display"
              id={accounts.length === 0 ? "none" : ""}
            >
              {accounts.length} {accounts.length === 1 ? "account" : "accounts"}{" "}
              found
            </div>
          )}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Fullname</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountID}>
                  <td>
                    <img
                      src={`https://localhost:7052/Images/${account.avatarUrl}`}
                      alt={account.fullname}
                    />
                  </td>
                  <td>{account.username}</td>
                  <td>{account.email}</td>
                  <td>{account.fullname}</td>
                  <td>
                    <select
                      id={`accountStatus_${account.accountID}`}
                      className="form-control"
                      defaultValue={account.active ? "true" : "false"}
                      ref={ref}
                    >
                      <option value="true">Active</option>
                      <option value="false">Banned</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const isActive = ref.current.value === "true";
                        updateAccountStatus(account.accountID, isActive);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isDialogOpen && (
            <div className="modal" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">{dialogMessage}</div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={handleCloseDialog}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountList;
