import React from 'react';

function Result({ outputs, loading, rate, price, input, breeds }) {
  return (
    <>
      <div className='item'>
        <p>{input || 0} SLP</p>
        <p>=</p>
        <h3>{outputs.eth} ETH</h3>
      </div>
      <div className='item'>
        <p>{input || 0} SLP</p>
        <p>=</p>
        <h3>
          {outputs.slp} USD
        </h3>
      </div>
      <div className='item'>
        <h4>
          2 axies
          <br />
          <br />
          <p>{2 * input} SLP</p>
          <br />
          <p>(+{breeds * 4} AXS)</p>
        </h4>
        <h3>
          <small> = </small>
        </h3>

        <h3>
          {input
            ? parseFloat(
                2 * outputs.eth + (breeds * 4 * price.axs) / price.eth
              ).toFixed(5)
            : '0.00'}{' '}
          ETH
          <br />
          <br />
          {input
            ? parseFloat(2 * outputs.slp + breeds * 4 * price.axs).toFixed(2)
            : '0.00'}{' '}
          USD
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
        <p>4 AXS</p>
        <p>{4 * price.axs} USD</p>
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
