import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredTemplates } from "../../redux/actions/templatesAction";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/Filters";
import SortOptions from "../../components/filters/SortOptions";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer.jsx";
import { ToastContainer } from "react-toastify";
import { fetchProfile } from "../../redux/actions/userAction.js";


const Home = () => {
  const allTemplates = useSelector((state) => state.templates.templates);
  const totalPages = useSelector((state) => state.templates.totalPages);
  
  const itemsPerPage = 5
  const dispatch = useDispatch();

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sortBy, setSortBy ] = useState('');
  const [ order, setOrder ] = useState('');
  const [ selectedTechnologies, setSelectedTechnologies ] = useState([]);
  const [ selectedCategories, setSelectedCategories ] = useState([]);
  useEffect(() => {
    dispatch(getFilteredTemplates(selectedTechnologies, selectedCategories, sortBy, order, currentPage, itemsPerPage));
    dispatch(fetchProfile());
  }, [ dispatch, selectedTechnologies, selectedCategories, sortBy, order, currentPage ]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  return (
    <div>
      <ToastContainer />
      <div className="flex w-full">
        <div className="w-1/4 pt-8">
          <Filters
            setSelectedTechnologies={ setSelectedTechnologies }
            setSelectedCategories={ setSelectedCategories }
            selectedTechnologies={ selectedTechnologies }
            selectedCategories={ selectedCategories } />
        </div>
        <div className="w-3/4 pt-8 ">
          <SortOptions setSortBy={ setSortBy } setOrder={ setOrder } />
          <Cards allTemplates={ allTemplates } />
          <Pagination currentPage={ currentPage } totalPages={ totalPages } onPageChange={ handlePageChange } />
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default Home;
