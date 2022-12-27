import React from 'react'

const SearchItem = ({ item }) => {
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={item.img} alt='' />
        </div>
        <div className='card-back'>
          <h1>{item.name}</h1>
          <ul>
            <li>
              <strong>Title:</strong> {item.title}
            </li>
            <li>
              <strong>Overview:</strong> {item.overview}
            </li>
            <li>
              <strong>Tagline:</strong> {item.tagline}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
