import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

export default function PaginationNew({ totalPages, currentPage, setCurrentPage }) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = pageNum => {
    setCurrentPage(pageNum);
  };

  // Function to generate page numbers with ellipses if there are more than 10 pages
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to 10, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 h-8 w-fit min-w-[32px] rounded-md hover:bg-blue-500 hover:text-white  ${
              i === currentPage ? "bg-blue-500 text-white" : "border border-blue-300 bg-white text-blue-500"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // If total pages are more than 10, show ellipses in between
      let startPage = Math.max(1, currentPage - 4);
      let endPage = Math.min(totalPages, currentPage + 4);

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageClick(1)}
            className={`mx-1 h-8 w-fit min-w-[32px] rounded-md hover:bg-blue-500 hover:text-white  ${
              1 === currentPage ? "bg-blue-500 text-white" : "border border-blue-300 bg-white text-blue-500"
            }`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(
            <span key='start-ellipsis' className='mx-2 text-gray-500'>
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 h-8 w-fit min-w-[32px] rounded-md hover:bg-blue-500 hover:text-white  ${
              i === currentPage ? "bg-blue-500 text-white" : "border border-blue-300 bg-white text-blue-500"
            }`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <span key='end-ellipsis' className='mx-2 text-gray-500'>
              ...
            </span>
          );
        }
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`mx-1 h-8 w-fit min-w-[32px] rounded-md hover:bg-blue-500 hover:text-white  ${
              totalPages === currentPage ? "bg-blue-500 text-white" : "border border-blue-300 bg-white text-blue-500"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className='mt-5 flex items-center justify-center'>
      {/* Previous Button */}
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        <BsFillArrowLeftSquareFill
          className={`rounded-md text-3xl font-semibold ${
            currentPage === 1 ? "text-gray-300" : "text-blue-500 hover:text-blue-600"
          }`}
        />
      </button>

      {/* Page Numbers */}
      <div className='flex'>{renderPageNumbers()}</div>

      {/* Next Button */}
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        <BsFillArrowRightSquareFill
          className={`rounded-md text-3xl font-semibold ${
            currentPage === totalPages ? "text-gray-300" : "text-blue-500 hover:text-blue-600"
          }`}
        />
      </button>
    </div>
  );
}
