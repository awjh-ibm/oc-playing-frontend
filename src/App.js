import './App.css';
import React, { useState } from 'react';

function App() {
  const [ timestamp, setTimestamp ] = useState('')

  const clickHandler = () => {
    fetch(`/api/timestamp`)
    .then(res => res.json())
    .then(result => {
      const resultDate = new Date(result.timestamp);

      setTimestamp(resultDate.toISOString());
    })
  };

  return (
    <div className="App">
      <button onClick={clickHandler}>GET TIME</button>

      <p>Server time: {timestamp}</p>
    </div>
  );
}

export default App;
