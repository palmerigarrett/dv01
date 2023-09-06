import React from 'react';
import styles from './DropdownGroup.module.css';

const DropdownGroup = (props) => {
  const { dropdownGroup, handleFilterChange } = props;

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
      // console.log({name, dropdown})
      return (
        <select
          className={styles.dropdown}
          key={dropdown}
          name={name}
          onChange={handleFilterChange}
        >
          <option name={name} value='All'>{getDropdownName(name)}</option>
          {[...dropdown].map((item) => {
            return <option key={item} value={item}>{item}</option>
          })}
        </select>
      );
    })}
  </>
  )
};

export default DropdownGroup;