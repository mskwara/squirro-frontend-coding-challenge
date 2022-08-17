import React from 'react';
import styles from './styles.module.scss';

interface Props {
  src: string;
  alt?: string;
}

const Image: React.FC<Props> = ({ src, alt = 'image' }) => {
  return <img src={src} alt={alt} className={styles.image} />;
};

export default Image;
