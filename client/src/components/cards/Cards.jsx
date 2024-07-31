import { useEffect } from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/actions/userAction";

const Cards = ({ allTemplates }) => {
  const dispatch = useDispatch()
  const myFavorites = useSelector(state => state.user.myFavorites);
  const templates = allTemplates.map(template => {
    const isFavorite = myFavorites.some(fav => fav.id === template.id);
    return { ...template, isFavorite };
  });

  return (
    <div className="mx-auto w-70 ">
      <div className="flex justify-end">
        <div className="lg:grid lg:grid-cols-3 lg:gap-5 lg:px-5 pt-12 md:grid-cols-2 md:grid md:gap-4 md:px-6 md:mx-auto w-50 ">
          { templates?.map((template) => (
            
              <Card key={template.id} template={ template } id={ template.id } isFavorite={template.isFavorite}/>
            
          )) }
        </div>
      </div>
    </div>

  );
};

export default Cards;
