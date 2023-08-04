import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import './news.scss';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [originalNews, setOriginalNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [messageSearch, setMessageSearch] = useState('');

  const loadNews = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/mf/news');
      setNewsData(response.data);
      setOriginalNews(response.data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setMessageSearch('Please enter a valid data for search');
      setNewsData(originalNews);
    } else {
      setMessageSearch('');
      const filteredNews = originalNews.filter(
        (news) =>
          news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.newsContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNewsData(filteredNews);
    }
  };

  const handleNews = (news) => {
    const copyNews = JSON.parse(JSON.stringify(news));
    if (copyNews.images && typeof copyNews.images === 'string') {
      const imageArray = copyNews.images
        .split(',')
        .map((imageUrl) => imageUrl.trim());
      copyNews.images = imageArray;
    } else {
      copyNews.images = [];
    }

    setSelectedNews(copyNews);
  };

  const handleCloseDialog = () => {
    setSelectedNews(null);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const TimeDisplay = ({ dateTime }) => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - ${day
      .toString()
      .padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return <span>{formattedTime}</span>;
  };

  const handleReload = () => {
    setMessageSearch('');
    setSearchTerm('');
    loadNews();
  };

  return (
    <div className='news-page'>
      <div className='news-container'>
        <div className='news-content'>
          <h1 className='news-title'>News</h1>
          {originalNews.length === 0 ? (
            <p className='empty-news'>The news is empty!</p>
          ) : (
            <>
              <div className='news-search'>
                <input
                  type='text'
                  placeholder='Search by title or content...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button className='news-search-icons' onClick={handleSearch}>
                  <FaSearch />
                </button>
                <button className='news-search-reload' onClick={handleReload}>
                  <FaSyncAlt />
                </button>
              </div>
              <div className='news-main'>
                {messageSearch ? (
                  <p className='search-invalid'>{messageSearch}</p>
                ) : (
                  <p className='none-search'></p>
                )}
                {newsData.length === 0 ? (
                  <p className='news-no-data-found'>No data was found</p>
                ) : (
                  <ul className='news-list'>
                    {newsData.map((news) => (
                      <li
                        key={news.newsID}
                        className='news-item'
                        onClick={() => handleNews(news)}
                      >
                        <h3>{news.newsTitle}</h3>
                        <h4>
                          <TimeDisplay dateTime={news.postAt} />
                        </h4>
                        <h5>{news.newsContent}</h5>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedNews && (
                  <div className='dialog-show-news'>
                    <div className='dialog-show-container'>
                      <div className='dialog-content'>
                        <div className='dialog-content-main'>
                          <h2>{selectedNews.newsTitle}</h2>
                          <h4>
                            <TimeDisplay dateTime={selectedNews.postAt} />
                          </h4>
                          <p>{selectedNews.newsContent}</p>
                          {Array.isArray(selectedNews.images) &&
                          selectedNews.images.length > 0 ? (
                            <div className='slideshow-container'>
                              <div className='slideshow-slide'>
                                {selectedNews.images.map((image, index) => (
                                  <div className='images-fields'>
                                    <p className='image-figure'>
                                      Figure {index + 1}
                                    </p>
                                    <img
                                      key={index}
                                      src={`https://localhost:7052/${image}`}
                                      alt={`img ${index}`}
                                      className='slideshow-image'
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span>No images available</span>
                          )}
                        </div>
                        <div className='dialog-content-button'>
                          <button onClick={handleCloseDialog}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
