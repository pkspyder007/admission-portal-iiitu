import React from 'react'
import {Link} from 'react-router-dom';
import '../css/Downloads.scss';
import '../css/Field.scss'
import HeaderInfo from './HeaderInfo';

const Downloads = () => {
    return (
        <>
      <div className="header__info">
      <h1>Indian Institute Of Information Technology Una (H.P)</h1>
      <h2>Transit Campus-II Chandpur, Haroli, Una-177220</h2>
      <h3>Btech Admissions</h3>
      <h4>Documents Download</h4>
      </div>
        <div className="downloads__container">
        <ul>
            <li><a href="#" target="_blank" download="PDF">Download</a></li>
            <li><a href="#" target="_blank" download="PDF">Download</a></li>
            <li><a href="#" target="_blank" download="PDF">Download</a></li>
            <li><a href="#" target="_blank" download="PDF">Download</a></li>
            <li><a href="#" target="_blank" download="PDF">Download</a></li>
        </ul>
        </div>
        </>
    )
}

export default Downloads
