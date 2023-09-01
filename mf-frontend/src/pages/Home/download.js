import React, { useState } from 'react';
import { FaDownload, FaCheck } from 'react-icons/fa';
import './download.scss';

const DownloadGame = () => {
  const [icon, setIcon] = useState(<FaDownload />);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'assets/game/martialfight.exe';
    downloadLink.download = 'martialfight.exe';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setShowCheckIcon(true);
    setIcon(<FaCheck />);
    setTimeout(() => {
      setShowCheckIcon(false);
      setIcon(<FaDownload />);
    }, 2000);
  };

  return (
    <div className='download-button-container'>
      <div className='download-title'>
        <h1>Download</h1>
      </div>
      <div className='download-main'>
        <div className='download-content'>
          <img
            src='/assets/images/logo.jpg'
            alt=''
            className='download-bg-image'
          />
          <button className='download-icon' onClick={handleDownload}>
            {showCheckIcon ? <FaCheck id='check-icon' /> : icon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadGame;
