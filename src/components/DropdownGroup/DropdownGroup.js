import React from 'react';
import styles from './DropdownGroup.module.css';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

const DropdownGroup = (props) => {
  const { dropdownGroup, filters, handleFilterChange } = props;

  const getDropdownName = (name) => {
    switch (name) {
      case 'homeOwnership':
        return 'Home Ownership';
      case 'quarter':
        return 'Quarter';
      case 'term':
        return 'Term';
      case 'year':
        return 'Year';
      default:
        return name;
    }
  };

  return (
    <>
      {Object.entries(dropdownGroup).map(([name, dropdown]) => {
        return (
          <select
            title={`Change ${getDropdownName(name)} filter`}
            value={filters[name]}
            className={styles.dropdown}
            key={name}
            name={name}
            onChange={(e) => handleFilterChange(e, false)}
          >
            <option name={name} title='Include All' value='All'>{getDropdownName(name)}</option>
            {[...dropdown].sort((a, b) => !isNaN(a) ? a - b : 0).map((item) => {
              const display = !isNaN(item) ? item : capitalizeFirstLetter(item);
              return <option key={display} title={`filter for ${display}`} value={item}>{display}</option>
            })}
          </select>
        );
      })}
    </>
  )
};

export default DropdownGroup;