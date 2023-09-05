import React from 'react'
import ReactPaginate from 'react-paginate'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Panigation = ({ totalPage, currentPage, setCurrentPage }) => {
  let [pageParams, setPageParams] = useSearchParams()
  const navigate = useNavigate()

  const handlePageChange = ({ selected }) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCurrentPage(selected)
    navigate(`?${pageParams.has('top') && 'top='+pageParams.get('top')+'&'}${pageParams.has('q') && 'q='+pageParams.get('q')+'&'}page=${selected + 1}${pageParams.has('status') && '&status='+pageParams.get('status')}`)
  }

  return (
    <div className='flex items-center justify-center mt-4 md:mt-12'>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrNext size={24} />}
        previousLabel={<GrPrevious size={24} />}
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPage}
        forcePage={currentPage}
        renderOnZeroPageCount={null}
        className='pagination-container'
        pageClassName='paginate-buttons'
        breakClassName='paginate-buttons'
        activeClassName='paginate-button-active'
        nextClassName='paginate-buttons'
        previousClassName='paginate-buttons'
        disabledClassName='disabled-buttons'
      />
    </div>
  )
}

export default Panigation