import React from 'react';

const Breadcrumb = ({ trail }) => {
  return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" link="/"><a href="/">Home</a></li>
          {trail.map((item, index) => {
            if (index + 1 === trail.length) {
              return <li className="breadcrumb-item active" aria-current="page" key={index}>{item.name}</li>
            } else {
              return <li className="breadcrumb-item" key={index}><a href={item.link}>{item.name}</a></li>
            }
          })}
        </ol>
    </nav>
  )
};

export default Breadcrumb;