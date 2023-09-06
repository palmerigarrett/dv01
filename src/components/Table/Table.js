import React from 'react';
import styles from './Table.module.css';

const Table = (props) => {
  const { headers, data } = props;

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          {headers.map((grade) => {
            return <th key={grade} className={styles.dataCell}>Grade {grade}</th>
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map(([grade, amount]) => {
            const key = `${grade}-${amount}`
            return <td className={styles.dataCell} key={key}>{amount.toFixed(2)}</td>
          })}
        </tr>
      </tbody>
    </table>
  )

}

export default Table;