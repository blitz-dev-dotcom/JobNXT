import { useContext , useRef, useState} from "react";
import React from "react";
import {auth} from '../firebaseConfig';
import {
    signInWithEmailAndPassword , 
    createUserWithEmailAndPassword , 
    GoogleAuthProvider , 
    signInWithPopup ,
    signOut
} from 'firebase/auth';
import { useLocalStorage } from "../CustomHooks/useLocalStorage";


const AuthContext = React.createContext();

export default function useAuth(){
    return(
        useContext(AuthContext)
    )
}

export function AuthProvider ({children}){
    const [CurrentUser,setCurrentUser] = useState();
    const [Profile,setProfile] = useState();
    const [Reg , setReg] = useState(false);
    const [loading , setloading] = useState(false);
    const [valid,setvalid] = useState(false);
    const {setItem} = useLocalStorage('login time');

        function epochTimeHandler(){

        }

        function SignIn(email,password){
            signInWithEmailAndPassword(auth,email,password)
            .then(Credential=>{
                console.log(Credential)
                const UserName = Credential.user.uid.substring(0,6);
                
                setReg(true);
                window.localStorage.setItem('localName',JSON.stringify(UserName));
                window.localStorage.setItem('RegStatus','true');
                const localName = window.localStorage.getItem('localName')
                setCurrentUser(JSON.parse(localName));
                setloading(!loading);

            })
            .catch(err=>{
                alert(err)
            })
        }
        function CreateUser(email,password){
            createUserWithEmailAndPassword(auth,email,password)
            .then(credential=>{
                console.log(credential);
                setvalid(true)
            })
            .catch(err=>{
                alert(err)
            })
        }
        function AuthPopup(){
            const AuthConstructor = new GoogleAuthProvider();
            signInWithPopup(auth,AuthConstructor)
            .then(credential=>{
                const UserName = credential.user.displayName;
                const profile = credential.user.photoURL;
                setProfile(profile);
                setCurrentUser(UserName);
                setReg(true);
                setloading(credential.user.displayName);
                let date = new Date();
                let  epochTime = date.getTime();
                setItem(epochTime);
            })
            .catch(err=>{
                alert(err);
            })

        }
        function LogOut(){
            signOut(auth)
            .then(success=>{
                setReg(false);
                setloading(false);

            })
            .catch(err=>{
                console.log(err)
            })
        }


    const value = {
        SignIn,
        CreateUser,
        AuthPopup,
        CurrentUser,
        Profile,
        setCurrentUser,
        setProfile,
        Reg,
        setReg,
        LogOut ,
        loading,
        setloading,
        valid,
        setvalid

        
    }
    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
};