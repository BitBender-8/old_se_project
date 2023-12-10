"use client";

import BookCard from "@/components/BookCard/BookCard";
import DisplayPagination from "@/components/Pagination/Pagination";
import Searchbar from "@/components/Searchbar/Searchbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

export default function Page() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keywordFilter, setKeywordFilter] = useState("");

  const defaultPageSize = 5;

  function fetchBooks() {
    const url = `http://localhost:3001/search/${encodeURIComponent(keywordFilter)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFilteredBooks(data);
        setTotalPages(Math.ceil(data.length / defaultPageSize));
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }

  // useEffect to fetch books on initial load and when keywordFilter changes
  useEffect(() => {
    fetchBooks();
  }, [keywordFilter]);

  function renderTableData() {
    const startIndex = (currentPage - 1) * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;
  
    // Ensure filteredBooks is always an array
    const booksArray = Array.isArray(filteredBooks) ? filteredBooks : [];
  
    return booksArray.slice(startIndex, endIndex).map((book, index) => {
      return <BookCard value={book} key={book.ISBN} />;
    });
  }

  function onPageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleKeywordChange(word) {
    setKeywordFilter(word);
  }

  // Todo: IMpelment search filtering

  return (
    <>
      <Sidebar />

      <Searchbar handleKeywordChange={handleKeywordChange} />

      {/* Books List Display */}
      <div className="bg-orange-400">{renderTableData()}</div>

      {/* Display Pagination */}
      {totalPages > 1 && (
        <DisplayPagination
          totalItems={filteredBooks.length}
          itemsPerPage={defaultPageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
