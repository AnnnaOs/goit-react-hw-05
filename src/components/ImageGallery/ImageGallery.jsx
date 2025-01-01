import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(image => (
        <li key={image.id} className={css.imageGalleryItem}>
          <ImageCard imageInfo={image} onClick={() => openModal(image)} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
