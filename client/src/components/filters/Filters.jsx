import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCategories, getFilteredTemplates, getTechnologies } from "../../redux/actions/templatesAction";
import DropdownMenu from "../dropDownMenu/DropDownMenu";

const Filters = ({setSelectedTechnologies, setSelectedCategories, selectedTechnologies, selectedCategories}) => {
  const { technologies, categories } = useSelector(state => state.templates.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnologies())
    dispatch(getCategories())
  }, [ dispatch ]);



  const handleTechnologyChange = (technology) => {
    setSelectedTechnologies(prevSelected =>
      prevSelected.includes(technology)
        ? prevSelected.filter(t => t !== technology)
        : [ ...prevSelected, technology ]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(c => c !== category)
        : [ ...prevSelected, category ]
    );
  };

  return (
    <div className="sticky top-0 bg-white z-10 flex flex-col gap-8">
      <DropdownMenu
        title="Tecnologías"
        items={ technologies }
        selectedItems={ selectedTechnologies }
        handleItemChange={ handleTechnologyChange } />
      <DropdownMenu
        title="Categorías"
        items={ categories }
        selectedItems={ selectedCategories }
        handleItemChange={ handleCategoryChange }
      />
    </div>
  )
}

export default Filters