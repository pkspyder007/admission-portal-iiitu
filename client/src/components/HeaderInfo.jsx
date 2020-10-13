import React from 'react'

const HeaderInfo = ({title, note}) => {
  return (
    <div>
       <h1>Indian Institute Of Information Technology Una (H.P)</h1>
      <h2>Transit Campus-II Chandpur, Haroli, Una-177220</h2>
      <h3>Btech Admissions</h3>
      <h4>{title}</h4>
      <p dangerouslySetInnerHTML={{__html: note}}>
        

      </p>
    </div>
  )
}

export default HeaderInfo
