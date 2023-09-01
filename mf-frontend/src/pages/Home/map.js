import React, { useEffect, useState } from "react";
import axios from "axios";
import "./map.scss";

const Map = () => {
  const [maps, setMaps] = useState([]);
  const [items, setItems] = useState([]);

  const loadSect = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/maps");
      setMaps(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSect();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/items");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMaps = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/maps");
        setMaps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
    fetchMaps();
}, []);

  return (
    <>
      {maps.length === 0 ? (
        <></>
      ) : (
        <div className="map-main-container">
          <div className="map-main">
            <div className="map-title">
              <h1>Map</h1>
            </div>
            {maps.map((maps) => (
              <div className="main-container" key={maps.mapId}>
                <div className="main-left">
                  <img
                    src={`https://localhost:7052/Images/${maps.imagePath}`}
                    alt={maps.mapName}
                  />
                </div>
                <div className="main-right">
                  <h3>{maps.mapName}</h3>
                  <h4>{maps.description}</h4>
                  <h5>Level: {maps.level} - {" "}
                  {maps.itemId && (
                    <span>
                      Item:{" "}
                      {items.find((item) => item.itemId === maps.itemId)
                        ?.itemName || "N/A"}
                    </span>
                  )}
                  </h5>
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
