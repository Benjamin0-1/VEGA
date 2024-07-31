import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="flex justify-center items-center my-4 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500 hover:text-white'}`}
            >
                <FaChevronLeft />
            </button>
            <div className="flex space-x-2">
                {range(1, totalPages).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${page === currentPage ? 'bg-[#06B6D4] text-white' : 'bg-white text-black hover:bg-green-500 hover:text-white'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500 hover:text-white'}`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
