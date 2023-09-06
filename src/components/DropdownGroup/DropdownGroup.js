import React from 'react';
import styles from './DropdownGroup.module.css';

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
          key={dropdown}
          name={name}
          onChange={(e) => handleFilterChange(e, false)}
        >
          <option name={name} title='Include All' value='All'>{getDropdownName(name)}</option>
          {[...dropdown].map((item) => {
            return <option key={item} title={`filter for ${item}`} value={item}>{item}</option>
          })}
        </select>
      );
    })}
  </>
  )
};

export default DropdownGroup;