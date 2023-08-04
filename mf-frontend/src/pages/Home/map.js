import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './map.scss';

const Map = () => {
  const [maps, setMaps] = useState([]);

  const loadSect = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/mf/maps');
      setMaps(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSect();
  }, []);

  return (
    <>
      {maps.length === 0 ? (
        <></>
      ) : (
        <div className='map-main-container'>
          <div className='map-main'>
            <div className='map-title'>
              <h1>Map</h1>
            </div>
            {maps.map((maps) => (
              <div className='main-container' key={maps.mapID}>
                <div className='main-left'>
                  <img
                    src={`https://localhost:7052/${maps.image}`}
                    alt={maps.mapName}
                  />
                </div>
                <div className='main-right'>
                  <h3>{maps.mapName}</h3>
                  <h4>{maps.mapDescription}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
