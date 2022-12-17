import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import * as imagesAPI from 'components/ImageGalleryItem/API';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(0);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    async function getPhotos(query, page) {
      try {
        const { hits, total } = await imagesAPI.getImages(query, page);

        setImages(prevState => [...prevState, ...hits]);
        setTotal(total);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }
    getPhotos(query, page);
  }, [query, page]);

  const totalPage = Math.ceil(total / 12);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && <h1>{error}</h1>}
      {(status === 'resolved' || status === 'pending') && (
        <>
          <ImageGallery images={images} />
          {status === 'resolved' && page < totalPage && images.length > 0 && (
            <Button onClick={loadMore} />
          )}
          {(images.length > 0 || images.length === 0) &&
            status === 'pending' && <Loader />}
        </>
      )}
      <Toaster />
    </>
  );
};

App.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
  images: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
  total: PropTypes.number,
};
