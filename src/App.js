import React, { useState } from 'react'
import './App.css'
import useCSV from './request/useCSV';

function App (){
  const initialFilterState = {
    homeOwnership: 'All',
    quarter: 'All',
    term:  'All',
    year: 'All'
  };

  const [filters, setFilters] = useState(initialFilterState);
  const aggregate = (data) => {
    const aggregateData = data.reduce((totals, item) => {
      const { grade, currentBalance, homeOwnership, quarter, term, year} = item;
      if (parseInt(grade)) {
        totals[grade] = (totals[grade] || 0) + parseFloat(currentBalance);
      }
      return totals;
    }, {});
    return aggregateData;
  };
  const data = aggregate(useCSV());
  console.log({data});


  // aggregate(data);
  return (
    <div className='App'>
      <p>HELLO WORLD</p>
      <p>CHARTS AND GRAPHS</p>
      <table style={{border: "solid 1px black", borderCollapse: "collapse"}}>
        <thead>
          <tr>
            {Object.keys(data).map((grade) => {
              console.log({grade});
              return <th key={grade}>Grade {grade}</th>
            })}
          </tr>
        </thead>

      </table>
    </div>
  )
}

export default App
