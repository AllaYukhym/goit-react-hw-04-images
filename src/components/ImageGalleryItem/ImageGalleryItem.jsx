import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ src, modalSrc }) => {
  const [showModal, setSnowModal] = useState(false);

  const toggleModal = () => {
    setSnowModal(prevState => !prevState);
  };

  return (
    <>
      <GalleryItem>
        <GalleryItemImage src={src} onClick={toggleModal} alt="image" />
      </GalleryItem>
      {showModal && <Modal onClose={toggleModal} src={modalSrc} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.bool,
};
