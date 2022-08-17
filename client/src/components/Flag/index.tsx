import React from 'react';
import styles from './styles.module.scss';

interface Props {
  code: string;
}

const Flag: React.FC<Props> = ({ code }) => {
  return <img src={`https://countryflagsapi.com/png/${code}`} alt={code} className={styles.flag} />;
};

export default Flag;
