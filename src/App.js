import React, { useMemo, useState } from 'react'
import './App.css'
import useCSV from './request/useCSV';
import Table from './components/Table/Table';

function App (){
  const data = useCSV();
  const initialFilterState = {
    homeOwnership: 'All',
    quarter: 'All',
    term:  'All',
    year: 'All'
  };
  const [filters, setFilters] = useState(initialFilterState);

  const [dropdownsState, setDropdownsState] = useState({
    homeOwnership: new Set(),
    quarter: new Set(),
    term: new Set(),
    year: new Set(),
  });

  
  const aggregate = (data, getNewDropdowns) => {
    const dropdowns = {
      homeOwnership: new Set(),
      quarter: new Set(),
      term: new Set(),
      year: new Set(),
    };

    const aggregateData = useMemo(() => {
      const agData = data.reduce((totals, item) => {
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
      setDropdownsState(dropdowns);
      return agData;
    }, [data, filters]);
    return aggregateData;
  };

  const handleFilterChange = (event) => {
    const {name, value} = event.target;
    setFilters({...filters, [name]: value});
  };

  return (
    <div className='App'>
      <p>HELLO WORLD</p>
      <p>CHARTS AND GRAPHS</p>
      <section>
        <Table headers={Object.keys(aggregate(data))} data={Object.entries(aggregate(data))} />
      </section>
      <section>
        {Object.entries(dropdownsState).map(([name, dropdown]) => {
          // console.log({name, dropdown})
          return (
            <select key={dropdown} name={name} onChange={handleFilterChange}>
              <option name={name} value='All'>All</option>
              {[...dropdown].map((item) => {
                return <option key={item} value={item}>{item}</option>
              })}
            </select>
          );
        })}
      </section>
    </div>
  );
}

export default App;
