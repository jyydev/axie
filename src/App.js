import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Result from './Result';
const slp_eth = 'https://api.binance.com/api/v3/depth?symbol=SLPETH&limit=5';
const eth_usd = 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=5';
const slp_usd = 'https://api.binance.com/api/v3/depth?symbol=SLPUSDT&limit=5';
const axs_usd = 'https://api.binance.com/api/v3/depth?symbol=AXSUSDT&limit=5';

const Input = () => {
  const [input, setInput] = useState('');
  const { loading, data } = useFetch(slp_eth);
  const [price, setPrice] = useState({
    eth: 0,
    slp: 0,
    axs: 0,
  });
  const [outputs, setOutputs] = useState({
    eth: 0,
    slp: 0,
    axs: 0,
  });
  const costs = [150, 300, 450, 750, 1200, 1950, 3150];
  const sums = [450, 900, 1650, 2850];
  const [breeds, setBreeds] = useState(1);
  var rate = 0;

  if (!loading) {
    rate = data.bids[0][0];
  }

  useEffect(() => {
    async function getPrice(apiUrl, crypto) {
      const res = await fetch(apiUrl);
      const data = await res.json();
      var usd = data.bids[0][0];
      setPrice((prevState) => {
        if (crypto === 'slp') usd = parseFloat(usd).toFixed(2);
        else if (crypto === 'eth') usd = parseFloat(usd);
        else usd = parseFloat(usd);
        return { ...prevState, [crypto]: usd };
      });
    }
    getPrice(eth_usd, 'eth');
    getPrice(slp_usd, 'slp');
    getPrice(axs_usd, 'axs');
  }, []);
  useEffect(() => {
    setOutputs({
      eth: parseFloat(input * rate).toFixed(5),
      slp: parseFloat(input * price.slp).toFixed(2),
      axs: parseFloat(input * price.axs),
    });
    console.log(price);
  }, [input, price, rate]);

  return (
    <>
      <h3>
        <img
          style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
          height='40rem'
          src='https://s2.coinmarketcap.com/static/img/coins/64x64/5824.png'
          alt='SLP'
        />
        Axie Breeding Calculator
      </h3>
      <p>
        1 SLP = ${price.slp}, 1 AXS = ${price.axs.toFixed(2)}, 1 ETH = $
        {price.eth.toFixed(2)}
      </p>
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
                setBreeds(1);
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
                  onClick={() => {
                    setInput(cost);
                    setBreeds(1);
                  }}
                >
                  {i} &#10132; {i + 1}
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
                  onClick={() => {
                    setInput(sum);
                    setBreeds(i + 2);
                  }}
                >
                  0 &#10132; {i + 2}
                </button>
              );
            })}
          </div>
        </form>
        <Result
          outputs={outputs}
          loading={loading}
          rate={rate}
          price={price}
          input={input}
          breeds={breeds}
        />
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
