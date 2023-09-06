import React, { useMemo, useState } from 'react'
import './App.css'
import useCSV from './request/useCSV';
import Table from './components/Table/Table';
import DropdownGroup from './components/DropdownGroup/DropdownGroup';
import BarChart from './components/BarChart/BarChart';
import Button from './components/Button/Button';

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

  const aggregate = (data) => {
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

  const handleFilterChange = (event, reset) => {
    if (reset) return setFilters(initialFilterState);
    const {name, value} = event.target;
    setFilters({...filters, [name]: value});
  };
  return (
    <div className='App'>
      <h1>dv01 CHARTS AND GRAPHS</h1>
      <section className='section'>
        <DropdownGroup dropdownGroup={dropdownsState} filters={filters} handleFilterChange={handleFilterChange} />
        <Button onClick={(e) => handleFilterChange(e, true)}>Reset</Button>
      </section>
      <section className='section'>
        <Table headers={Object.keys(aggregate(data))} data={Object.entries(aggregate(data))} />
      </section>
      <section className='section'>
        <BarChart data={Object.entries(aggregate(data)).map(([grade, amount]) => ({grade, amount: amount.toFixed(2)}))} />
      </section>
    </div>
  );
}

export default App;
