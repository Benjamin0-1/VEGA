
import { useDispatch } from 'react-redux';
import './Card.css';
import React, { useEffect } from 'react';
import { promedio } from '../../pages/detail/promedio';
import { Rating } from '@mui/material';
import { addFav, removeFav } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Card = ({ template, isFavorite }) => {

  const ratings = template.reviews?.map((e) => e.rating) || [];
  const resultRating = ratings.length > 0 ? promedio(ratings) : 0;

  const dispatch = useDispatch();
  // const imagenUrl =  template.images.map(image => (
  //   image.content
  // ));
  // console.log(imagenUrl);
  // const UrlString= imagenUrl.join("")

  const handleClick = async (event) => {
    if (isFavorite) {
      const response = await dispatch(removeFav(template.id))
      if (response.status === 200) {
        return toast.success(response.payload)
      }
    }
    else {
      dispatch(addFav(template.id))
    }
  };
console.log(template);
  return (
    <div className="max-w-xs rounded relative overflow-hidden shadow-custom transition-transform transform hover:scale-105">
      <div className="flex items-center ml-4 mt-4 mb-2">
        <Rating className="text-sm" readOnly value={ resultRating ? resultRating : 0 } />
      </div>
      <div className="absolute top-0 right-0 m-2 z-10 opacity-1 transition-opacity duration-300">

        <button onClick={ () => handleClick() }>
          <svg
            className="h-4 w-4 text-[#06B6D4]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            { isFavorite ? (
              <path
                fill='#06B6D4'
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            ) : (
              <path
                fill="#FFFFFF"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />

            ) }
          </svg>
        </button>
      </div>
      <Link to={ `/detail/${template.id}` }>
        <div>
          { template.images?.map((image) => (
            <div>
              { (image.isCover === true && image.set === `${image.category}${1}`) && <img className="w-full h-32 object-cover" key={ image.id } src={ image.original } alt={ template.name } /> }
            </div>
          )) }
        </div>
        <div className="px-6 py-6">
          <div className="font-inter text-l">{ template.name }</div>
          <div className="flex justify-between items-center">
            <p className="text-black text-lg font-bold">${ template.price }</p>
          <div className="mt-2">
          {template.technologies && template.technologies.map(tech => (
            <span key={tech.id} className="text-[12px] border-2 border-[#06B6D4] text-gray-900 px-2 py-1 rounded p-2 m-2 hover:bg-[#06B6D4] hover:text-white">{tech.name}</span>
          ))}
        </div>
          </div>
        </div>
      </Link>
      <div className="px-6 py-6">
      </div>

    </div>
  );
};

export default Card;