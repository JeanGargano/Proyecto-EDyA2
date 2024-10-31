// Context/AuthProvider.js
import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/Firebase';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mueve la instancia de auth fuera del componente
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []); // Dependencias vacías para evitar recreación de `auth`

    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, signup }}>
            {children}
        </AuthContext.Provider>
    );
};
