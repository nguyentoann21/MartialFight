import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sect.scss';

const Sect = () => {
  const [sects, setSects] = useState([]);

  const loadSect = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/mf/sects/sect');
      setSects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSect();
  }, []);

  return (
    <>
      {sects.length === 0 ? (
        <></>
      ) : (
        <div className='sect-main-container'>
          <div className='sect-main'>
            <div className='sect-title'>
              <h1>Sect</h1>
            </div>
            {sects.map((sect) => (
              <div className='main-container' key={sect.sectId}>
                <div className='main-left'>
                  <h3>{sect.sectName}</h3>
                  <h4>{sect.description}</h4>
                </div>
                <div className='main-right'>
                  <img
                    src={`https://localhost:7052/Images/${sect.imagePath}`}
                    alt={sect.sectName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sect;
