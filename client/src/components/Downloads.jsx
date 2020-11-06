import React from 'react'
import { useEffect } from 'react';
import '../css/Downloads.scss';
import '../css/Field.scss'
import HeaderInfo from './HeaderInfo';

const Downloads = () => {
    useEffect(()=> {
      window.open("http://www.iiitu.ac.in/admissions.html#gsc.tab=0")
    });
    return (
        <>
      <div className="header__info">
      <h1>Indian Institute Of Information Technology Una (H.P)</h1>
      <h2>Transit Campus-II Chandpur, Haroli, Una-177220</h2>
      <h3>Btech Admissions</h3>
      <h4>Documents Download</h4>
      </div>
        <div className="downloads__container">
        <h2>All required Documents and their format can be found on our institutes website.</h2>
        <a href="http://www.iiitu.ac.in/admissions.html#gsc.tab=0" target="__blank">IIIT UNA website link</a>
        </div>
        </>
    )
}

export default Downloads
