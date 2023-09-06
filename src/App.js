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

    const dropdowns = {
      homeOwnership: new Set(),
      quarter: new Set(),
      term: new Set(),
      year: new Set(),
    };

    const aggregateData = data.reduce((totals, item) => {
      const { grade, currentBalance, homeOwnership, quarter, term, year} = item;
      
      // Add to dropdowns with O(1) complexity
      homeOwnership && dropdowns.homeOwnership.add(homeOwnership);
      quarter && dropdowns.quarter.add(quarter);
      term && dropdowns.term.add(term);
      year && dropdowns.year.add(year);

      const homeOwnershipFilter = filters.homeOwnership === 'All' || homeOwnership === filters.homeOwnership;
      const quarterFilter = filters.quarter === 'All' || quarter === filters.quarter;
      const termFilter = filters.term === 'All' || term === filters.term;
      const yearFilter = filters.year === 'All' || year === filters.year;

      if (parseInt(grade)) {
        if (homeOwnershipFilter && quarterFilter && termFilter && yearFilter) {
          totals[grade] = (totals[grade] || 0) + parseFloat(currentBalance);
        }
      }
      return totals;
    }, {});
    return {data: aggregateData, dropdowns};
  };
  const {data, dropdowns} = aggregate(useCSV());

  return (
    <div className='App'>
      <p>HELLO WORLD</p>
      <p>CHARTS AND GRAPHS</p>
      <table>
        <thead>
          <tr>
            {Object.keys(data).map((grade) => {
              return <th key={grade}>Grade {grade}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.entries(data).map(([grade, amount]) => {
              const key = `${grade}-${amount}`
              return <th key={key}>{amount}</th>

            })}
          </tr>
        </tbody>

      </table>
    </div>
  )
}

export default App
