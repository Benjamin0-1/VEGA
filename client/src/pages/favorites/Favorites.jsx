import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { fetchProfile } from "../../redux/actions/userAction";

const Favorites = () => {
    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.user.myFavorites) || [];
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.user.loggedIn)

    useEffect(() => {
        if (!loggedIn) return navigate("/home")
        dispatch(fetchProfile());
    }, [ loggedIn, dispatch ]);


    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Mis Favoritos</h2>
            { myFavorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { myFavorites.map(fav => (

                        <Card key={ fav.id } template={ fav } isFavorite={ true } />

                    )) }
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-8">Aún no has añadido ningun favorito</p>
            ) }
        </div>
    );
};

export default Favorites;
