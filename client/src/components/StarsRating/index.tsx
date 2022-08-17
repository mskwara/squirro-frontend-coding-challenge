import React from 'react';
import { Rating } from 'react-simple-star-rating';

interface Props {
  onClick: (value: number) => void;
  ratingValue: number;
}

const StarsRating: React.FC<Props> = ({ onClick, ratingValue }) => {
  return (
    <Rating
      onClick={(value: number) => {
        onClick(value / 20);
      }}
      ratingValue={ratingValue * 20}
      size={20}
    />
  );
};

export default StarsRating;
