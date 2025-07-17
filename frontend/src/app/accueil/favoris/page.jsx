"use client";
import React, { use, useState } from 'react';
import Image from 'next/image';
import image from '../../../../public/download.png';
import { useUser } from '../../../context/UserContext';
import axios from 'axios';
import Card from '../../../composants/card';
import { useEffect } from 'react';
import DetailsRecette from '../../../composants/detailsRecette.jsx';
import '../globals.css'

export default function favoris(){
    const { user } = useUser();
    const [favoris, setFavoris] = useState([]);
    const [loading, setLoading] = useState(false);
    const[page, setPage] = useState(1);
    const totalPages = Math.ceil(((favoris?.total)|| 16)/16) || 1;
    const [selectedRecette, setSelectedRecette] = useState(null);
    const[showDetails, setShowDetails] = useState(false);
    const handleRecetteClick = (recette) => {
        setSelectedRecette(recette);
        setShowDetails(true);
    };


    useEffect(() => {
        const fetchFavoris = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://backend-xxr1.onrender.com/recettes/favoris?utilisateurId=${user?.id}&page=${page}&limit=16`);
                setFavoris(response.data.data);
            } catch (error) {
                console.error("Error fetching favoris:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavoris();
    }, [user, page]);



    

    const getPaginationRange = (current, total) => {
    const delta = 2; // Nombre de pages à afficher de chaque côté de la page actuelle
    const range = [];
    const rangeWithDots = [];
    let l=null ;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };
  const paginationRange = getPaginationRange(page, totalPages);
    return (
        <div className="flex flex-col w-full h-full px-10 main z-10">
            <header className="flex justify-end items-center z-10 mt-8 h-fit">
                <div className="flex items-center hover:cursor-pointer rounded-full px-4 py-2 bg-white/15 backdrop-blur-md">
                <Image src={image} className="h-10 w-10 rounded-full" alt='erreur'/>
                <div className="flex flex-col justify-center ml-2">
                    <p className='font-semibold text-white'>{`${user?.nom} ${user?.prenom}`}</p>
                </div>
                </div>
            </header>
            {showDetails ? (
                        <DetailsRecette recette={selectedRecette} />
                        ) :
            <main>
                <div className="flex justify-between items-center z-10 mt-20 h-fit">
                <p className="text-2xl font-bold text-white">Favoris</p>
            </div>
            {loading ? (
                <p className="text-white">Chargement...</p>
            ) : favoris.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {favoris.map((recette) => (
                        <Card key={recette.id} recette={recette} onClick={() => handleRecetteClick(recette)} />
                    ))}
                </div>
            ) : (
            <p className="text-white">Aucune recette favorite</p>
            )}
            <div className="flex justify-center mt-8">
                <ul className="flex space-x-2">
                    {paginationRange.map((pageNumber, index) => (
                    <li key={index} className={`px-3 py-1 rounded-full ${pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        <button onClick={() => setPage(pageNumber)}>{pageNumber}</button>
                    </li>
                    ))}
                </ul>
                </div>
            </main>}
            
        </div>
    );
}