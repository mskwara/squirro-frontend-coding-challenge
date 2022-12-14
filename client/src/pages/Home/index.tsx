import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookStore from 'components/BookStore';
import { IAPICountry, IAPIIncluded, IAPIStore } from './types';
import { findInIncluded, getMappedTableRows, handleError } from './utils';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const [stores, setStores] = useState<IAPIStore[]>([]);
  const [included, setIncluded] = useState<IAPIIncluded[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stores`)
      .then((res) => {
        const stores = res.data.data;
        const included = res.data.included;

        setStores(stores);
        setIncluded(included);
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onRate = (storeId: string, value: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/stores/${storeId}`, {
      data: {
        attributes: {
          rating: value
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    }).catch(handleError);
  };

  const areResultsPresent = stores.length > 0 && !loading;

  return (
    <div className={styles.root}>
      {loading && 'Loading'}
      {stores.length === 0 && 'No results'}
      {areResultsPresent &&
        stores.map((store) => {
          const tableRows = getMappedTableRows(
            store.relationships?.books?.data,
            included
          );
          const countryRef = store.relationships.countries.data;

          const country = findInIncluded(
            included,
            countryRef
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
