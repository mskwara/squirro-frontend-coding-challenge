import React from 'react';
import cn from 'classnames';
import Flag from 'components/Flag';
import Image from 'components/Image';
import StarsRating from 'components/StarsRating';
import StoreInfo from 'components/StoreInfo';
import TwoColumnTable, { IRow } from 'components/TwoColumnTable';
import styles from './styles.module.scss';

interface Props {
  imageSrc: string;
  name: string;
  tableTitle: string;
  tableRows: IRow[];
  countryCode: string;
  establishmentDate: string;
  url: string;
  onRate: (value: number) => void;
  rating: number;
}

const BookStore: React.FC<Props> = ({
  imageSrc,
  name,
  tableTitle,
  tableRows,
  countryCode,
  establishmentDate,
  url,
  onRate,
  rating
}) => {
  return (
    <div className={styles.root}>
      <div className={cn(styles.pinToTop, styles.horizontalItems)}>
        <aside>
          <Image src={imageSrc} alt={name} />
        </aside>
        <main>
          <header className={styles.horizontalItems}>
            <h1>{name}</h1>
            <StarsRating onClick={onRate} ratingValue={rating} />
          </header>
          <TwoColumnTable title={tableTitle} rows={tableRows} />
        </main>
      </div>
      <footer className={styles.horizontalItems}>
        <StoreInfo date={establishmentDate} url={url} />
        <Flag code={countryCode} />
      </footer>
    </div>
  );
};

export default BookStore;
