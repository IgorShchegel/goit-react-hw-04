import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({showModal, selectedImage, closeModal }) => {
  return (
     <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <img src={selectedImage?.urls?.regular} alt={selectedImage?.alt_description} />
    </Modal>
  )
}

export default ImageModal