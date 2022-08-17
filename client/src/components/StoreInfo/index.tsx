import { format } from 'date-fns';
import React from 'react';
import styles from './styles.module.scss';

interface Props {
  establishmentDate: string;
  url: string;
}

const StoreInfo: React.FC<Props> = ({ establishmentDate, url }) => {
  return (
    <div className={styles.root}>
      <div>
        {format(new Date(establishmentDate), 'dd.MM.y')}
      </div>
      -
      <a href={url} className={styles.link}>{url}</a>
    </div>
  );
};

export default StoreInfo;
