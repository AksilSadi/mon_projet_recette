"use client";

import { use, useActionState } from "react";
import React, { useEffect,useState } from "react";
import connexion from "../actions/auth";
import inscription from "../actions/inscription";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Form({ isLogin }) {
    const[state,action,ispending] = useActionState(connexion,undefined);
    const[stateInscription,actionInscription,ispendingInscription] = useActionState(inscription,undefined);
    const [category, setCategory] = useState("visiteur");
    const [reverse, setReverse] = useState(false);
    const router = useRouter();
    useEffect(() => {
    if (!ispending && state !== undefined) {
      if (state.success) {
        const person={
          email: state.data.email,
          nom: state.data.nom,
          prenom: state.data.prenom,
          category: state.data.category,
        }
        router.push("/accueil");
        toast.success(state.message || "Connexion réussie !");
        Cookies.set('user', JSON.stringify(person), { expires: 1 , secure: true, sameSite: 'strict' });
      } else {
        toast.error(state.message || "Échec de la connexion.");
      }
    }
  }, [ispending, state]);

  useEffect(() => {
    if (!ispendingInscription && stateInscription !== undefined) {
      if (stateInscription.success) {
        const person={
          email: state.data.email,
          nom: state.data.nom,
          prenom: state.data.prenom,
          category: state.data.category,
        }
        router.push("/accueil");
        toast.success(stateInscription.message || "Inscription réussie !");
        Cookies.set('user', JSON.stringify(person), { expires: 1 , secure: true, sameSite: 'strict' });
      } else {
        toast.error(stateInscription.message || "Échec de l'inscription.");
      }
    }
  }, [ispendingInscription, stateInscription]);

  useEffect(() => {
    if (isLogin) {
     if(stateInscription) {
      stateInscription.errors = undefined;
     }
  }
  },[isLogin]);
  return (
    <>
    {isLogin?<form action={action} className="flex flex-col  to-blue-500  sm:px-10 rounded-xl shadow-md aks " style={{background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)", backdropFilter: "blur(8px)"}}>
                <p className="text-2xl sm:text-3xl  text-white font-semibold mt-8">Account Login</p>
                <div className="flex flex-col mt-12">
                    <label htmlFor="email"  className=" text-white">Email adresse</label>
                    <input type="email" name="email" className="pl-1 mt-4 h-10 rounded-lg bg-transparent border-2 border-solid border-white focus:border-4 text-white outline-none placeholder:text-white"  placeholder="exemple123@gmail.com"></input>
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="password" className=" text-white">Mot de passe</label>
                    <input type="password" name="password" className="pl-1 mt-4 h-10 rounded-lg bg-transparent border-2 border-solid  border-white outline-none focus:border-4 text-white placeholder:text-white" placeholder="************" ></input>
                </div>
                
                <button className=" text-white mt-12 px-2 py-2 rounded-lg boutton" style={{backgroundColor:"#0029FF"}}>
                    {ispending ? (
        <>
          <div className="w-4 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : (
        "Se connecter"
      )}
                </button>
            </form>:
            
            
            <form action={actionInscription} className="flex flex-col  to-blue-500  sm:px-10 rounded-xl shadow-md " style={{background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)", backdropFilter: "blur(8px)"}}>
                <p className="text-2xl sm:text-3xl  text-white font-semibold mt-4 self-center">Inscription</p>
                <input type="hidden" name="category" value={category} />
                <div className="flex flex-col mt-3">
                    <label htmlFor="nom"  className=" text-white">Nom</label>
                    <input type="text" name="nom" className="pl-1 mt-1 h-10 rounded-lg bg-transparent border-2 border-solid border-white focus:border-4 text-white outline-none placeholder:text-white" id={stateInscription?.errors?.nom?"error":undefined} placeholder="exemple:Sadi"></input>
                    {stateInscription?.errors?.nom && (
                      <p className="text-red-500 mt-0.5">{stateInscription.errors.nom}</p>
                    )}
                </div>
                <div className="flex flex-col mt-3">
                    <label htmlFor="prenom"  className=" text-white">Prenom</label>
                    <input type="text" name="prenom" className="pl-1 mt-1 h-10 rounded-lg bg-transparent border-2 border-solid border-white focus:border-4 text-white outline-none placeholder:text-white" id={stateInscription?.errors?.prenom?"error":undefined}  placeholder="exemple:Aksil"></input>
                    {stateInscription?.errors?.prenom && (
                      <p className="text-red-500 mt-0.5">{stateInscription.errors.prenom}</p>
                    )}
                </div>
                <div className="flex flex-col mt-3">
                    <label htmlFor="category" className=" text-white">Catégorie</label>
                <div className='drop relative mt-1 rounded-lg px-4 py-2 border-2 border-solid border-white w-full' onClick={()=>{
                                                setReverse(!reverse);
                                            }}>
                                                <span className='text-white'>{category}</span>
                                                <FontAwesomeIcon
                                                 icon={faAngleDown}
                                                 className={reverse ? 'icone rotate' : 'icone'} />
                                                 <ul className='list -bottom-22 ' style={{display:reverse?'block':'none'}}>
                                                    <li onClick={()=>{
                                                        setCategory("visiteur");
                                                    }} style={{borderLeft:category=='visiteur'?'3px solid #FFFFFF':undefined}}>visiteur</li>
                                                    <li onClick={()=>{
                                                        setCategory("cuisinier");
                                                    }} style={{borderLeft:category=='cuisinier'?'3px solid #FFFFFF':undefined}}>cuisinier</li>
                                                 </ul>
                                            </div>
                </div>
                <div className="flex flex-col mt-3">
                    <label htmlFor="email"  className=" text-white">Email adresse</label>
                    <input type="email" name="email" className="pl-1 mt-1 h-10 rounded-lg bg-transparent border-2 border-solid border-white focus:border-4 text-white outline-none placeholder:text-white" id={stateInscription?.errors?.email?"error":undefined}  placeholder="exemple123@gmail.com"></input>
                    {stateInscription?.errors?.email && (
                      <p className="text-red-500 mt-0.5">{stateInscription.errors.email}</p>
                    )}
                </div>
                <div className="flex flex-col mt-3">
                    <label htmlFor="password" className=" text-white">Mot de passe</label>
                    <input type="password" name="password"  className="pl-1 mt-1 h-10 rounded-lg bg-transparent border-2 border-solid  border-white outline-none focus:border-4 text-white placeholder:text-white" id={stateInscription?.errors?.password?"error":undefined}  placeholder="************" ></input>
                    {stateInscription?.errors?.password && (
                      <p className="text-red-500 mt-0.5">{stateInscription.errors.password}</p>
                    )}
                </div>
                <div className="flex mt-2 w-[400px]">
                <div className="flex flex-col">
                
                </div>
    
                </div>
    
                
                <button className=" text-white mt-8 px-2 py-2 rounded-lg mb-8 boutton" style={{backgroundColor:"#0029FF"}}>
                   {ispendingInscription ? (
        <>
          <div className="w-4 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : (
        "Confirmer"
      )}
                </button>
            </form>}
            </>
  );

}