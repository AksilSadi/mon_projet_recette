"use client";
import image from '../../public/download.png';
import Image from 'next/image'
import { useUser } from '../context/UserContext.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export default function Header(){
const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm('');
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
                        onChange={(e) => setSearchTerm(e.target.value)}
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