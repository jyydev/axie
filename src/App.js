import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
var slp_eth = 'https://api.binance.com/api/v3/depth?symbol=SLPETH&limit=5';
var eth_usd = 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=5';
var slp_usd = 'https://api.binance.com/api/v3/depth?symbol=SLPUSDT&limit=5';

const Input = () => {
  const [input, setInput] = useState('');
  const { loading, data } = useFetch(slp_eth);
  const [price, setPrice] = useState({
    eth: 0,
    slp: 0,
  });
  const [outputs, setOutputs] = useState({
    eth: 0,
    slp: 0,
  });
  var rate = 0;

  if (!loading) {
    rate = data.bids[0][0];
  }

  async function getPrice(apiUrl, crypto) {
    const res = await fetch(apiUrl);
    const data = await res.json();
    var usd = data.bids[0][0];
    setPrice((prevState) => {
      if (crypto === 'slp') usd = parseFloat(usd).toFixed(2);
      if (crypto === 'eth') usd = parseFloat(usd);
      console.log(prevState);
      return { ...prevState, [crypto]: usd };
    });
  }
  useEffect(() => {
    getPrice(eth_usd, 'eth');
    getPrice(slp_usd, 'slp');
  }, []);
  useEffect(() => {
    setOutputs({
      eth: parseFloat(input * rate).toFixed(5),
      slp: parseFloat(input * price.slp).toFixed(2),
    });
  }, [input]);

  const costs = [150, 300, 450, 750];
  function changeInput(num) {
    setInput(num);
  }

  return (
    <>
      <h2>
        <img
          style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
          height='50rem'
          src='https://s2.coinmarketcap.com/static/img/coins/64x64/5824.png'
          alt='SLP'
        />
        Small Love Potion
      </h2>
      <h3>{input || 0} SLP</h3>
      <article>
        <form className='form'>
          <div className='form-control'>
            <label htmlFor='input'>SLP amount : </label>
            <input
              autoFocus
              type='text'
              id='input'
              name='input'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div>
            Breed:
            {costs.map((cost, i) => {
              return (
                <button
                  type='button'
                  className='btn'
                  onClick={() => setInput(cost)}
                >
                  {i} ➡ {i + 1}
                </button>
              );
            })}
          </div>
          <div>
            Sum:
            <button type='button' className='btn' onClick={() => setInput(450)}>
              0 ➡ 2
            </button>
            <button type='button' className='btn' onClick={() => setInput(900)}>
              0 ➡ 3
            </button>
            <button
              type='button'
              className='btn'
              onClick={() => setInput(1650)}
            >
              0 ➡ 4
            </button>
            {/* 0->3:<button className='btn'>900</button>
            0->4:<button className='btn'>1650</button> */}
          </div>
        </form>
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
      </article>
    </>
  );
};

function App() {
  return (
    <div className='container'>
      <Input />
    </div>
  );
}

export default App;
