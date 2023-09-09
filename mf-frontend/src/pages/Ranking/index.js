import React, { useEffect, useState } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import { FaMedal } from "react-icons/fa";
import "./rank.scss";

const Ranking = () => {
  const [top15ByLevel, setTop15ByLevel] = useState([]);
  const [top15ByScore, setTop15ByScore] = useState([]);
  const [top15ByChallenge, setTop15ByChallenge] = useState([]);
  const [activeTab, setActiveTab] = useState("levels");
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [levelResponse, scoreResponse, challengeResponse] =
          await Promise.all([
            axios.get("https://localhost:7052/api/mf/rank/top-15-level"),
            axios.get("https://localhost:7052/api/mf/rank/top-15-score"),
            axios.get("https://localhost:7052/api/mf/rank/top-15-challenge"),
          ]);

        setTop15ByLevel(levelResponse.data);
        setTop15ByScore(scoreResponse.data);
        setTop15ByChallenge(challengeResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7052/hubs/rankings", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    hubConnection.start().then(() => {
      hubConnection.on("UpdateRankings", () => {
        fetchData();
      });
    });
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7052/api/mf/players`
        );
        setAccount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccount();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getRankData = () => {
    if (activeTab === "levels") {
      return top15ByLevel;
    } else if (activeTab === "rankings") {
      return top15ByScore;
    } else if (activeTab === "challenges") {
      return top15ByChallenge;
    }
    return [];
  };

  return (
    <>
      {top15ByChallenge.length === 0 &&
      top15ByScore.length === 0 &&
      top15ByScore.length === 0 ? (
        <div className="empty-ranking">
          <span>No ranking was found</span>
        </div>
      ) : (
        <div className="ranking-container">
          <div className="ranking-form">
            <div className="ranking-text">
              <img src="/assets/images/cups.png" alt="ranking" />
              <h3>Ranking Board</h3>
              <img src="/assets/images/cups.png" alt="ranking" />
            </div>
            <div className="tabs-container">
              <button
                className={`tab ${activeTab === "levels" ? "active" : ""}`}
                onClick={() => handleTabChange("levels")}
              >
                Level
              </button>
              <button
                className={`tab ${activeTab === "rankings" ? "active" : ""}`}
                onClick={() => handleTabChange("rankings")}
              >
                Score
              </button>
              <button
                className={`tab ${activeTab === "challenges" ? "active" : ""}`}
                onClick={() => handleTabChange("challenges")}
              >
                Challenge
              </button>
            </div>
            <div className="table-container">
              {getRankData().length === 0 ? (
                <div className="no-rank-list">No ranking was found</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Username</th>
                      <th>Name in Game</th>
                      <th>
                        {activeTab === "levels"
                          ? "Level"
                          : activeTab === "rankings"
                          ? "Score"
                          : "Challenge"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRankData().map((item, index) => (
                      <tr key={item.accountId}>
                        <td>
                          {index === 0 ? (
                            <FaMedal className="gold" />
                          ) : index === 1 ? (
                            <FaMedal className="silver" />
                          ) : index === 2 ? (
                            <FaMedal className="bronze" />
                          ) : (
                            <span className="normal">{index + 1}</span>
                          )}
                        </td>
                        <td>
                          {item.accountId && (
                            <span>
                              {account.find(
                                (account) =>
                                  account.accountId === item.accountId
                              )?.username || ""}
                            </span>
                          )}
                        </td>
                        <td>
                          <span>{item.playerName}</span>
                        </td>
                        <td>
                          <span>
                            {
                              item[
                                activeTab === "levels"
                                  ? "level"
                                  : activeTab === "rankings"
                                  ? "scorePvP"
                                  : "numberOfMaps"
                              ]
                            }
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ranking;
