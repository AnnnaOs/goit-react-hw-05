import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from '../services/unsplash-api';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadGallery = async () => {
      try {
        setIsLoading(true);
        const res = await fetchImages(query, page);

        if (res.results.length === 0) {
          setIsShowButton(false);
          toast('Sorry, there are no images matching your search', {
            duration: 5000,
          });
          setIsLoading(false);
          return;
        }

        setImages(prev => [...prev, ...res.results]);
        setIsShowButton(page < Math.ceil(res.total / 9) ? true : false);
        setIsLoading(false);
      } catch (_) {
        setError('Something went wrong! Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGallery();
  }, [query, page]);

  const getInputValue = newQuery => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={getInputValue} />
      <Toaster />
      <div className={css.container}>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          images.length > 0 && (
            <ImageGallery images={images} openModal={openModal} />
          )
        )}
      </div>
      {isLoading && <Loader />}
      {isShowButton && (
        <LoadMoreBtn onClick={() => setPage(page => page + 1)} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
};

export default App;
