import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  const { urls, alt_description, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.modal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.imageModalContent}>
        <img
          src={urls.regular}
          alt={alt_description || 'Image'}
          className={css.imageModal}
        />
        <div className={css.imageInfo}>
          <p>
            <strong>✍️Author:</strong> {user.name}
          </p>
          <p>
            <strong>❤️Likes:</strong> {likes}
          </p>
          <p>
            <strong>📝Description:</strong>{' '}
            {alt_description || 'No description available'}
          </p>
        </div>
        <button className={css.imageModalCloseBtn} onClick={onClose}>
          <FaTimes size={24} />
        </button>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};

export default ImageModal;
