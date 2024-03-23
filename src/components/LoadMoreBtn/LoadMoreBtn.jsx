import css from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ onLoadMore, loading }) => {
  return (
    <button className={css.button} onClick={onLoadMore} disabled={loading}>
      Load more
    </button>
  )
}

export default LoadMoreBtn