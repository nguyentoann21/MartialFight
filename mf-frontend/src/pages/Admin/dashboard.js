import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.scss';

const Dashboard = () => {
  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();
  useEffect(() => {
    if(!account) {
      history('/');
    }
  }, [account, history]);

  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [news, setNews] = useState([]);
  const [maps, setMaps] = useState([]);
  const [sects, setSects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/players");
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCharacter = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/characters");
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/news");
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMap = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/maps");
        setMaps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSect = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/sects/sect");
        setSects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSkill = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/skills");
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchItem = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/items");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayer();
    fetchCharacter();
    fetchNews();
    fetchMap();
    fetchSect();
    fetchSkill();
    fetchCategory();
    fetchItem();

  }, [])

  return (
    <div className='dashboard-container'>
      <h1>Admin Dashboard</h1>
      <div className='dashboard-grid'>
        <div className='dashboard-card'>
          <h2>Accounts</h2>
          <p>{players.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Characters</h2>
          <p>{characters.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>News</h2>
          <p>{news.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Maps</h2>
          <p>{maps.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Sects</h2>
          <p>{sects.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Skills</h2>
          <p>{skills.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Categories</h2>
          <p>{categories.length}</p>
        </div>
        <div className='dashboard-card'>
          <h2>Items</h2>
          <p>{items.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
