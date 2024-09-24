//Archivo para contexto entre componentes
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export const authContext = createContext()

export const useAuth = ()=>{
    const context = useContext(authContext)
    if (!context) throw new Error("There is no AuthProvider")
    return context
}

export function AuthProvider({children}){

    const user = {
        login:true,
    };

    const signup = (correo, contraseña) => {
        return createUserWithEmailAndPassword(auth, correo, contraseña);
      };

    const login = (correo, contraseña) =>{

        return signInWithEmailAndPassword(auth, correo, contraseña)
    } 

    return(
        <authContext.Provider value={{signup, login
        }}>
            {children}
        </authContext.Provider>
    )

}

