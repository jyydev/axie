import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Result from './Result';
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

  // var key = 0;
  const costs = [150, 300, 450, 750, 1200, 1950, 3150];
  const sums = [450, 900, 1650, 2850];
  const costss = { a: 'aa', b: 'bb' };
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
                  key={i}
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
            {sums.map((sum, i) => {
              return (
                <button
                  key={i}
                  type='button'
                  className='btn'
                  onClick={() => setInput(sum)}
                >
                  {0} ➡ {i + 2}
                </button>
              );
            })}
          </div>
        </form>
        <Result outputs={outputs} loading={loading} rate={rate} price={price} />
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
