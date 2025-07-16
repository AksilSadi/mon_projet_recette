"use client";
import image from '../../public/download.png';
import Image from 'next/image'
import { useUser } from '../context/UserContext.jsx';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
export default function Header({ terme, results, page, loading, temps, categorie }) {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Appel API quand debouncedTerm change
  useEffect(() => {
    if (debouncedTerm.trim() === '') return;
    

    const fetchData = async () => {
      try {
        loading(true);
        let url=`https://backend-xxr1.onrender.com/recettes/search?ingredient=${debouncedTerm}&page=1&limit=16`
        if(temps!="Temps"){
        const tempsNombre=parseInt(temps.slice(1,3));
         url+=`&temps=${tempsNombre}`
        }
        if(categorie!="Categorie"){
          url+=`&categorie=${categorie}`
        }
        const response = await axios.get(url);
        results(response.data.data);
        page(response.data.page);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }finally {
        loading(false);
      }
    };

    fetchData();
  }, [debouncedTerm,temps,categorie]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    terme(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="flex justify-between items-center z-10  mt-8 h-fit">
                <div className="">
                    <p className="text-2xl font-bold text-white">Recherche</p>
                </div>

                <div className="flex items-center">
                  <div className='search h-8 flex items-center  px-5 py-5 search'>
                    <form onSubmit={handleSubmit} className='search h-8 flex items-center bg-white/15 backdrop-blur-md px-3 py-5'>
                      <input 
                        type='search' 
                        placeholder='Chercher des recette par ses ingredients ou nom' 
                        className='text-white placeholder:text-gray-300 placeholder:text-md px-4 w-[400px] bg-transparent outline-none' 
                        value={searchTerm}
                        onChange={(e) => handleChange(e)}
                      />
                      <button type="submit" className=' text-black ml-2'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </form>
                    </div>
                  </div>

                <div className="flex items-center hover:cursor-pointer rounded-full px-4 py-2 bg-white/15 backdrop-blur-md">
                <Image src={image} className="h-10 w-10 rounded-full" alt='erreur'/>
                <div className="flex flex-col justify-center ml-2">
                    <p className='font-semibold text-white'>{`${user?.nom} ${user?.prenom}`}</p>
                </div>
                </div>
        </header>
  );
}