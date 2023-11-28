import React, { createContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

type AuthContextProps = {
   signIn: (email: string, password: string) => void;
   signUp: (name: string, email: string, password: string) => void;
   storageData: (data: object) => void;
   handleLogoutUser: () => void;
   signed: boolean;
   user: null | object;
   loadingAuth: boolean;
   loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<{} | null>(null)
   const [loadingAuth, setLoadingAuth] = useState(false)
   const [loading, setLoading] = useState(true)

   const navigate = useNavigate()


   useEffect(() => {
      const UserIslogged = async () => {
         const isUserLogged = localStorage.getItem('@finances-dashboard')

         if (isUserLogged) {
            setUser(JSON.parse(isUserLogged))
            setLoading(false)
            console.log('User está logado !')
         }

         setLoading(false)
      }
      UserIslogged()
   }, [])

   const signUp = async (name: string, email: string, password: string) => {
      setLoadingAuth(true)

      await createUserWithEmailAndPassword(auth, email, password)
         .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
               name: name,
               avatarUrl: null,
            })
               .then(() => {
                  let data = {
                     uid: uid,
                     email: value.user.email,
                     name: name,
                     avatarUrl: null,
                  }
                  setUser(data)
                  storageData(data)
                  alert("Conta registrada com sucesso!")
                  navigate("/dashboard")
               })
         })
      setLoadingAuth(false)
   }

   const signIn = async (email: string, password: string) => {
      setLoadingAuth(true)

      await signInWithEmailAndPassword(auth, email, password)
         .then(async (value) => {
            let uid = value.user.uid
            const docRef = doc(db, "users", uid)

            const docSnapshot = await getDoc(docRef)

            if (docSnapshot) {
               let data = {
                  uid: uid,
                  email: value.user.email,
                  name: docSnapshot.data()?.name,
                  avatarUrl: docSnapshot.data()?.avatar
               }

               setUser(data)
               storageData(data)
               navigate("/dashboard")
               alert(`User ${data.name} Logged in`)
            }

         }).catch((error) => {
            console.log(error)
         })
      setLoadingAuth(false)
   }

   const storageData = (data: object) => {
      localStorage.setItem('@finances-dashboard', JSON.stringify(data))
   }

   const handleLogoutUser = async () => {
      await signOut(auth)
         .then(() => {
            console.log("deslogado com sucesso")
            localStorage.removeItem('@finances-dashboard')
            setUser(null)
         })
   }

   return (
      <AuthContext.Provider value={{
         signed: !!user,
         signUp,
         signIn,
         handleLogoutUser,
         user,
         loadingAuth,
         loading,
         storageData
      }}>
         {children}
      </AuthContext.Provider>
   )
}