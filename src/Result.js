import React from 'react';


function Result({outputs, loading, rate, price}) {
  return (
    <>
      <div className='item'>
        <p></p>
        <h2>{outputs.eth} ETH</h2>
        <p></p>
      </div>
      <div className='item'>
        <p></p>
        <h2>{outputs.slp} USD</h2>
        <p></p>
      </div>
      <div className='item'>
        <h4>2 axies</h4>
        <h3>
          {2 * outputs.eth} ETH
          <br />
          <br />
          {2 * outputs.slp} USD
        </h3>
      </div>

      <div className='item'>
        <p>1 SLP</p>
        <p>{loading ? 'loading...' : rate} ETH</p>
      </div>
      <div className='item'>
        <p>1 SLP</p>
        <p>{price.slp} USD</p>
      </div>
      <div className='item'>
        <p>1 ETH</p>
        <p>{price.eth} USD</p>
      </div>
    </>
  );
}

export default Result;
