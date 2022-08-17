import React from 'react';
import styles from './styles.module.scss';

export interface IRow {
  id: string;
  left: string;
  right: string;
}

interface Props {
  title: string;
  rows: IRow[];
}

const TwoColumnTable: React.FC<Props> = ({ title, rows }) => {
  return (
    <table className={styles.root}>
      <thead>
        <tr>
          <th colSpan={2}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ id, left, right }) => (
          <tr key={id}>
            <td>{left}</td>
            <td>{right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TwoColumnTable;
