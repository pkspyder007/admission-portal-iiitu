import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { message } from 'antd';

const AdmitCard = (props) => {
  const [std, setStd] = useState({name: '', fatherName: '', regNo: '', branchAlloted: '',doc: ''});

  useEffect(() => {
    Axios({
      method: 'get',
      url: `/api/admin/std/${props.match.params.sno}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    }).then(res => {
      setStd(res.data);
    }).catch(err => {
      message(err.message)
    })
  }, [])

  return (
    <div className="container" id="admit-card">
            <div className="head">
                <img src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png" alt="IIITU" />
                <div className="c-info">
                    <h3>Indian Institute of Information Technology</h3>
                    <h3>Una (H.P.)</h3>
                    <h4>Transit Campus-II, Chandpur, Haroli, Una-177220</h4>
                    <span>
                        <h2>Institute Admit Card</h2>
                        <p>(B.Tech)</p>
                    </span>
                </div>
                <span></span>
            </div>

               <div className="content">
                <div className="r-1"><p>Mr/Ms: <u>{std.name}</u></p> <p>S/D/O: <u>{std.fatherName}</u></p></div>
                <div className="r-2"><p>Registration No: <u>{std.regNo}</u></p></div>
                <div className="r-3"><p>School: <u>{std.branchAlloted !== 'ECE' ? 'School of Computing' : 'School of ELectronics'}</u></p> <p>Branch: <u>{std.branchAlloted}</u></p></div>
                <div className="r-4"><p>Date of Registration in the Institute: <u>{std.doc}</u></p></div>
                <strong>Admission is provisional subject to submission of proper document(s) by 30, Nov, '20</strong>
               </div>
        </div>
  )
}

export default AdmitCard
