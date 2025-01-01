import PropTypes from 'prop-types';
import css from './ImageCard.module.css';

const ImageCard = ({
  imageInfo: {
    alt_description,
    urls: { small },
  },
  onClick,
}) => {
  return (
    <div className={css.imageCard} onClick={onClick}>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        width="360"
      />
    </div>
  );
};

ImageCard.propTypes = {
  imageInfo: PropTypes.shape({
    alt_description: PropTypes.string,
    urls: PropTypes.shape({
      small: PropTypes.string,
    }),
  }),
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
