import React from 'react';

function Result({ outputs, loading, rate, price }) {
  return (
    <>
      <div className='item'>
        <p></p>
        <h3>{outputs.eth} ETH</h3>
        <p></p>
      </div>
      <div className='item'>
        <p></p>
        <h3>{outputs.slp} USD</h3>
        <p></p>
      </div>
      <div className='item'>
        <h4>
          2 axies
          <br />
          <br />
          <p>(+4 AXS)</p>
        </h4>
        <h3>
          {loading
            ? 'loading...'
            : parseFloat(2 * outputs.eth + (4 * price.axs) / price.eth).toFixed(
                5
              ) + ' ETH'}
          <br />
          <br />
          {parseFloat(2 * outputs.slp + 4 * price.axs).toFixed(2)} USD
        </h3>
      </div>
      <div className='item'>
        <p>1 SLP</p>
        <p>{price.slp} USD</p>
      </div>
      <div className='item'>
        <p>1 AXS</p>
        <p>{price.axs} USD</p>
      </div>
      <div className='item'>
        <p>1 SLP</p>
        <p>{loading ? 'loading...' : rate} ETH</p>
      </div>
      <div className='item'>
        <p>1 AXS</p>
        <p>{parseFloat(price.axs / price.eth).toFixed(5)} ETH</p>
      </div>
      <div className='item'>
        <p>1 ETH</p>
        <p>{price.eth} USD</p>
      </div>
    </>
  );
}

export default Result;
