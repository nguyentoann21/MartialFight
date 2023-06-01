import React, { useState } from 'react';
import { FaDownload, FaCheck } from 'react-icons/fa';
import './download.scss';

const DownloadGame = () => {
  const [icon, setIcon] = useState(<FaDownload />);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleDownload = () => {
    // Simulating the download action
    // URL of the image you want to download
    const downloadLink = document.createElement('a');
    downloadLink.href = 'assets/images/dino.gif';
    downloadLink.download = 'dino.gif';
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
  );
};

export default DownloadGame;
