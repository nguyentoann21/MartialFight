import React, { useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import './rank.scss';

const rankData = {
  levels: [
    { no: 1, name: 'John', level: 'Level 10' },
    { no: 2, name: 'Alice', level: 'Level 8' },
    { no: 3, name: 'Bob', level: 'Level 7' },
    { no: 4, name: 'Sarah', level: 'Level 5' },
    { no: 5, name: 'Peter', level: 'Level 2' },
  ],
  rankings: [
    { no: 1, name: 'John', rank: 'Expert' },
    { no: 2, name: 'Alice', rank: 'Pro' },
    { no: 3, name: 'Bob', rank: 'Advanced' },
    { no: 4, name: 'Sarah', rank: 'Intermediate' },
    { no: 5, name: 'Peter', rank: 'Beginner' },
  ],
  challenges: [
    { no: 1, name: 'Challenge 1', challenge: 'Easy' },
    { no: 2, name: 'Challenge 2', challenge: 'Medium' },
    { no: 3, name: 'Challenge 3', challenge: 'Hard' },
    { no: 4, name: 'Challenge 4', challenge: 'Defeat' },
  ],
};

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('levels');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='ranking-container'>
      <div className='ranking-form'>
        <div className='ranking-text'>
          <img src='/assets/images/cups.png' alt='ranking' />
          <h3>Leaderboard</h3>
          <img src='/assets/images/cups.png' alt='ranking' />
        </div>
        <div className='tabs-container'>
          <button
            className={`tab ${activeTab === 'levels' ? 'active' : ''}`}
            onClick={() => handleTabChange('levels')}
          >
            Level
          </button>
          <button
            className={`tab ${activeTab === 'rankings' ? 'active' : ''}`}
            onClick={() => handleTabChange('rankings')}
          >
            Rank
          </button>
          <button
            className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => handleTabChange('challenges')}
          >
            Challenge
          </button>
        </div>
        <div className='table-container'>
          {
            Object.keys(rankData).length === 0 ? (<div className='no-rank-list'>No ranking was found</div>) : 
            (
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>
                      {activeTab === 'levels'
                        ? 'Level'
                        : activeTab === 'rankings'
                        ? 'Rank'
                        : 'Challenge'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankData[activeTab].map((item) => (
                    <tr key={item.no}>
                      <td>
                        {item.no === 1 ? (
                          <FaMedal className='gold' />
                        ) : item.no === 2 ? (
                          <FaMedal className='silver' />
                        ) : item.no === 3 ? (
                          <FaMedal className='bronze' />
                        ) : (
                          <FaMedal className='normal' />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        {
                          item[
                            activeTab === 'levels'
                              ? 'level'
                              : activeTab === 'rankings'
                              ? 'rank'
                              : 'challenge'
                          ]
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Ranking;
