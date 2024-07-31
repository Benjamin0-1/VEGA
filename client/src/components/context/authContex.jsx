import { useState, createContext, useEffect, useContext} from "react";

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase.config.jsx'


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState({});
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const firebaseToken = credential.accessToken;
            const user = result.user;
            return { user, firebaseToken };
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <AuthContext.Provider value={ { googleSignIn, logOut, user } }>
            { children }
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}