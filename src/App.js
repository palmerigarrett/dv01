import React from 'react'
import './App.css'
import useCSV from './request/useCSV';

function App (){
  const aggregate = (data) => {
    const aggregateData = data.reduce((totals, item) => {
      const { grade, currentBalance} = item;
      if (parseInt(grade)) {
        totals[grade] = (totals[grade] || 0) + parseFloat(currentBalance);
      }
      return totals;
    }, {});
    return aggregateData;
  };
  const data = aggregate(useCSV());
  console.log({data});

  return (
    <div className='App'>
      <p>HELLO WORLD</p>
      <p>CHARTS AND GRAPHS</p>
    </div>
  )
}

export default App
