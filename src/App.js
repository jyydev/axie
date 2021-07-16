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

  return (
    <>
      <h1>SLP &gt; ETH</h1>
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
