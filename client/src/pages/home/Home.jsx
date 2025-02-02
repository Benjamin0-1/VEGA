import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilteredTemplates } from "../../redux/actions/templatesAction";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/Filters";
import SortOptions from "../../components/filters/SortOptions";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer.jsx";
import { ToastContainer } from "react-toastify";
import { fetchProfile } from "../../redux/actions/userAction.js";
import { FaTachometerAlt } from 'react-icons/fa'; // Add the icon you want to use


const Home = () => {
  const allTemplates = useSelector((state) => state.templates.templates);
  const totalPages = useSelector((state) => state.templates.totalPages);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // there must be slight bug in which the login page blinks for a milisecond
  // after logging out and trying to immediately access the login page again.
  // this will be looked into later and Fixed.

  useEffect(() => {
    const checkAdmin = async () => { 
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3001/user/check-admin', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
          } else { 
            setIsAdmin(false);
          }
        }

      } catch (error) {
        console.log(`Error fetching user info: ${error}`);
      }
    };

    checkAdmin();
  }, []);

  const itemsPerPage = 6;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(getFilteredTemplates(selectedTechnologies, selectedCategories, sortBy, order, currentPage, itemsPerPage));
    dispatch(fetchProfile());
  }, [dispatch, selectedTechnologies, selectedCategories, sortBy, order, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAdminClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex w-full">
        <div className="w-1/4 pt-8">
          <Filters
            setSelectedTechnologies={setSelectedTechnologies}
            setSelectedCategories={setSelectedCategories}
            selectedTechnologies={selectedTechnologies}
            selectedCategories={selectedCategories}
          />
          {isAdmin && (
            <button
              onClick={handleAdminClick}
              className="flex items-center space-x-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaTachometerAlt className="text-xl" />
              <span>Ir a dashboard</span>
            </button>
          )}
        </div>
        <div className="w-3/4 pt-8 ">
          <SortOptions setSortBy={setSortBy} setOrder={setOrder} />
          <Cards allTemplates={allTemplates} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <Footer />
        </div>
      </div>
    </div>
  );

  
};

export default Home;
