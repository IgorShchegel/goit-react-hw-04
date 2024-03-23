import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import { getImages } from './apiService/api';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
   const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setIsError(false);
    setHasMoreImages(false);
  }


  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
   setShowModal( true );
    setSelectedImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      if (query.trim() === '') {
        return;
      }
      setLoading(true);
      try {

        const response = await getImages(query, page);
        if (response.data.results.length === 0) {
          
          setIsEmpty(true);
          return;
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
          setHasMoreImages(page < response.data.total_pages);
        }
      } catch (error) {
        setIsError(error);
        toast.error('An error occurred while receiving images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {hasMoreImages && <LoadMoreBtn onLoadMore={loadMore} loading={loading} />}
      {!images.length && !isEmpty && <ErrorMessage message={"Let's begin search "}/> }
      {isError && <ErrorMessage message={"Something went wrong - "}/>}
      {isEmpty && <ErrorMessage message={'Sorry. There are no images'}/>}
          <Toaster />
      {loading && <Loader />}
        <ImageModal showModal={showModal} selectedImage={selectedImage} closeModal={closeModal} />
    </div>
  )
}

export default App
