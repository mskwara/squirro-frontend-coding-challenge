import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookStore from 'components/BookStore';
import { IAPICountry, IAPIIncluded, IAPIStore } from './types';
import { findInIncluded, getMappedTableRows } from './utils';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const [stores, setStores] = useState<IAPIStore[]>([]);
  const [included, setIncluded] = useState<IAPIIncluded[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/stores')
      .then((res) => {
        const stores = res.data.data;
        const included = res.data.included;

        setStores(stores);
        setIncluded(included);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onRate = (storeId: string, value: number): void => {
    console.log(storeId, value);
  };

  const areResultsPresent = stores.length > 0 && !loading;

  return (
    <div className={styles.root}>
      {loading && 'Loading'}
      {stores.length === 0 && 'No results'}
      {areResultsPresent &&
        stores.map((store: IAPIStore) => {
          const tableRows = getMappedTableRows(
            store.relationships?.books?.data,
            included
          );
          const countryRef = store.relationships.countries.data;

          const country = findInIncluded(
            included,
            countryRef.type,
            countryRef.id
          ) as IAPICountry;

          return (
            <BookStore
              key={store.id}
              imageSrc={store.attributes.storeImage}
              name={store.attributes.name}
              tableTitle="Best-selling books"
              tableRows={tableRows}
              countryCode={country.attributes.code}
              establishmentDate={store.attributes.establishmentDate}
              url={store.attributes.website}
              onRate={(value) => onRate(store.id, value)}
              rating={store.attributes.rating}
            />
          );
        })}
    </div>
  );
};

export default Home;
