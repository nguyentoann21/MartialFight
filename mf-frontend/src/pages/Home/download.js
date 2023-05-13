import React from 'react';
import { FaStar } from 'react-icons/fa';
import './download.scss';

const DownloadGame = () => {
    return(
        <div className='download-container'>
            <div className='download-content'>
                <FaStar />
                <div className='download-text'>Download</div>
                <FaStar />
            </div>
        </div>
    );
}

export default DownloadGame;