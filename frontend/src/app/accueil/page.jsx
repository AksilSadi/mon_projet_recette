"use client";
import "./globals.css";
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../../composants/header.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faAngleDown,faFilter } from '@fortawesome/free-solid-svg-icons'
import AjoutRecette from '../../composants/ajoutRecette';
import { useState } from 'react';
import axios from 'axios';
import Card from '../../composants/card';
import DetailsRecette from '../../composants/detailsRecette.jsx';
export default function accueil(){
    const [showForm, setShowForm] = useState(false);
    const[recettes, setRecettes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const searchTotalPages=Math.ceil(((searchResults?.total)|| 16)/16) || 1;
    const [selectedRecette, setSelectedRecette] = useState(null);
    const[ajout, setAjout] = useState(false);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(((recettes?.total)|| 16)/16) || 1;
    const [showdetails, setShowDetails] = useState(false);
    const[loading, setLoading] = useState(false);
    const[reverse,setReverse]= useState(false);
    const[reverse2,setReverse2]= useState(false);
    const[temps,setTemps]=useState("Temps");
    const[categorie,setcategorie]=useState("Categorie");
    const[deletedFilter,setDeletedFilter]=useState(false);
    const[loadingEffect,setLoadingEffect]=useState(false)


    const handleRecetteClick = (recette) => {
        setSelectedRecette(recette);
        setShowDetails(true);
    };

    const handleAddRecette = () => {
        setShowForm(!showForm);
        setAjout(!ajout);
    }

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                setLoadingEffect(true)
                let url=`http://localhost:4000/recettes/card?page=${page}&limit=16`;
                if(temps!="Temps"){
                    const tempsNombre=parseInt(temps.slice(1,3));
                    url+=`&temps=${tempsNombre}`
                }
                if(categorie!="Categorie"){
                    url+=`&categorie=${categorie}`
                }
                const response = await axios.get(url);
                console.log(response);
                setRecettes(response.data.data);
            } catch (error) {
                console.error("Error fetching recettes:", error);
            }finally{
                setLoadingEffect(false);
            }
        };
        fetchRecettes();
    }, [page, ajout,deletedFilter,temps,categorie]);

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
  const recherchepagination=getPaginationRange(searchPage,searchTotalPages)
    return (
        <div className="flex flex-col w-full h-full px-10 main">
            <Header terme={setSearchTerm} results={setSearchResults} page={setSearchPage} loading={setLoading} temps={temps} categorie={categorie}/>

            {showForm && <AjoutRecette onClick={handleAddRecette} />}

            {showdetails ? (
            <DetailsRecette recette={selectedRecette} />
            ) : searchTerm != "" ? (
            <div>
                <div className="flex justify-between items-center mt-8 h-fit">
                <p className="text-2xl font-bold text-white">Recherche</p>
                </div>
                <div className='flex items-center z-2 relative mt-8'>
                <p className='font-semibold text-gray-100 text-md'>Filters:</p>
                <div className='drop relative bg-white/15 backdrop-blur-md ml-4 rounded-[20px] px-4 py-2' onClick={()=>{
                                    setReverse(!reverse);}}>
                                   <span className='text-white text-sm'>{temps}</span>
                                  <FontAwesomeIcon
                                      icon={faAngleDown}
                                      className={reverse ? 'icone rotate' : 'icone'} />
                                 <ul className='absolute -bottom-[180px] left-0 mt-2 w-full bg-gray-600 rounded shadow' style={{ display: reverse ? 'block' : 'none' }}>
                                    <li onClick={() => setTemps("≤15 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤15 min</li>
                                    <li onClick={() => setTemps("≤30 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤30 min</li>
                                    <li onClick={() => setTemps("≤45 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤45 min</li>
                                    <li onClick={() => setTemps("≤60 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤60 min</li>
                                    </ul>
                
                                </div>
                                {temps!="Temps"?<button
                                    onClick={()=> {setTemps("Temps");setDeletedFilter(!deletedFilter);}}
                                    className="relative h-5 text-center top-[-20px]  text-black text-[12px] bg-gray-500  rounded-full px-[7px] anime"
                                >
                                    &times;
                            </button>:null}
                                <div className='drop relative bg-white/15 backdrop-blur-md ml-4 rounded-[20px] px-4 py-2' onClick={()=>{
                                    setReverse2(!reverse2);}}>
                                   <span className='text-white text-sm'>{categorie}</span>
                                  <FontAwesomeIcon
                                      icon={faAngleDown}
                                      className={reverse2 ? 'icone rotate' : 'icone'} />
                                 <ul className='absolute -bottom-[200px] h-[180px] overflow-auto left-0 mt-2 w-full bg-gray-600 rounded shadow' style={{ display: reverse2 ? 'block' : 'none' }}>
                                    <li onClick={() => setcategorie("Entrée")} className='p-2 hover:bg-gray-700 cursor-pointer'>Entrée</li>
                                    <li onClick={() => setcategorie("Plat principal")} className='p-2 hover:bg-gray-700 cursor-pointer'>Plat principal</li>
                                    <li onClick={() => setcategorie("Accompagnement")} className='p-2 hover:bg-gray-700 cursor-pointer'>Accompagnement</li>
                                    <li onClick={() => setcategorie("Dessert")} className='p-2 hover:bg-gray-700 cursor-pointer'>Dessert</li>
                                    <li onClick={() => setcategorie("Soupe")} className='p-2 hover:bg-gray-700 cursor-pointer'>Soupe</li>
                                    <li onClick={() => setcategorie("Salade")} className='p-2 hover:bg-gray-700 cursor-pointer'>Salade</li>
                                    <li onClick={() => setcategorie("Amuse-bouche")} className='p-2 hover:bg-gray-700 cursor-pointer'>Amuse-bouche</li>
                                    <li onClick={() => setcategorie("Sandwich")} className='p-2 hover:bg-gray-700 cursor-pointer'>Sandwich</li>
                                    <li onClick={() => setcategorie("Quiche")} className='p-2 hover:bg-gray-700 cursor-pointer'>Quiche</li>
                                    <li onClick={() => setcategorie("Gratin")} className='p-2 hover:bg-gray-700 cursor-pointer'>Gratin</li>
                                    <li onClick={() => setcategorie("Sauté")} className='p-2 hover:bg-gray-700 cursor-pointer'>Sauté</li>
                                    <li onClick={() => setcategorie("Pâtes")} className='p-2 hover:bg-gray-700 cursor-pointer'>Pâtes</li>
                                    <li onClick={() => setcategorie("Spécialité régionale")} className='p-2 hover:bg-gray-700 cursor-pointer'>Spécialité régionale</li>
                                    <li onClick={() => setcategorie("Petit déjeuner")} className='p-2 hover:bg-gray-700 cursor-pointer'>Petit déjeuner</li>
                                    <li onClick={() => setcategorie("Boisson")} className='p-2 hover:bg-gray-700 cursor-pointer'>Boisson</li>
                                    <li onClick={() => setcategorie("Snack")} className='p-2 hover:bg-gray-700 cursor-pointer'>Snack</li>
                                    <li onClick={() => setcategorie("Vegan")} className='p-2 hover:bg-gray-700 cursor-pointer'>Vegan</li>
                                    </ul>
                
                                </div>
                                {categorie!="Categorie"?<button
                                    onClick={()=> {setcategorie("Categorie");setDeletedFilter(!deletedFilter);}}
                                    className="relative h-5 text-center top-[-20px]  text-black text-[12px] bg-gray-500  rounded-full px-[7px] anime"
                                >
                                    &times;
                            </button>:null}
                                </div>
                {loading?<div className="w-2 h-2 border-2 border-gray-100 border-t-transparent rounded-full animate-spin" />: searchResults.length > 0 ? (
                <div className="flex flex-wrap justify-start mt-8">
                    {searchResults.map((recette) => (
                    <Card key={recette.id} recette={recette} onClick={() => handleRecetteClick(recette)} />
                    ))}
                </div>
                ) : (
                <p className="text-white mt-4">Aucune recette trouvée</p>
                )}
                <div className="flex justify-center mt-8">
                <ul className="flex space-x-2">
                    {recherchepagination.map((pageNumber, index) => (
                    <li key={index} className={`px-3 py-1 rounded-full ${pageNumber === searchPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        <button onClick={() => setPage(pageNumber)}>{pageNumber}</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            
            ) : (
            <main className="w-full h-full mt-10">
                <div className="flex justify-between">
                <p className='font-bold text-white text-2xl'>Recettes</p>
                <button
                    className='text-white px-2 py-2 rounded-lg mb-8 boutton flex items-center'
                    style={{ backgroundColor: "#0029FF" }}
                    onClick={handleAddRecette}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="ml-2">Ajouter une recette</p>
                </button>
                </div>
                <div className='flex items-center z-2 relative'>
                <p className='font-semibold text-gray-100 text-md'>Filters:</p>
                <div className='drop relative bg-white/15 backdrop-blur-md ml-4 rounded-[20px] px-4 py-2' onClick={()=>{
                                    setReverse(!reverse);}}>
                                   <span className='text-white text-sm'>{temps}</span>
                                  <FontAwesomeIcon
                                      icon={faAngleDown}
                                      className={reverse ? 'icone rotate' : 'icone'} />
                                 <ul className='absolute -bottom-[180px] left-0 mt-2 w-full bg-gray-600 rounded shadow' style={{ display: reverse ? 'block' : 'none' }}>
                                    <li onClick={() => setTemps("≤15 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤15 min</li>
                                    <li onClick={() => setTemps("≤30 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤30 min</li>
                                    <li onClick={() => setTemps("≤45 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤45 min</li>
                                    <li onClick={() => setTemps("≤60 min")} className='p-2 hover:bg-gray-700 cursor-pointer'>≤60 min</li>
                                    </ul>
                
                                </div>
                                {temps!="Temps"?<button
                                    onClick={()=> {setTemps("Temps");setDeletedFilter(!deletedFilter);}}
                                    className="relative h-5 text-center top-[-20px]  text-black text-[12px] bg-gray-500  rounded-full px-[7px] anime"
                                >
                                    &times;
                            </button>:null}
                                <div className='drop relative bg-white/15 backdrop-blur-md ml-4 rounded-[20px] px-4 py-2' onClick={()=>{
                                    setReverse2(!reverse2);}}>
                                   <span className='text-white text-sm'>{categorie}</span>
                                  <FontAwesomeIcon
                                      icon={faAngleDown}
                                      className={reverse2 ? 'icone rotate' : 'icone'} />
                                 <ul className='absolute -bottom-[200px] h-[180px] overflow-auto left-0 mt-2 w-full bg-gray-600 rounded shadow' style={{ display: reverse2 ? 'block' : 'none' }}>
                                    <li onClick={() => setcategorie("Entrée")} className='p-2 hover:bg-gray-700 cursor-pointer'>Entrée</li>
                                    <li onClick={() => setcategorie("Plat principal")} className='p-2 hover:bg-gray-700 cursor-pointer'>Plat principal</li>
                                    <li onClick={() => setcategorie("Accompagnement")} className='p-2 hover:bg-gray-700 cursor-pointer'>Accompagnement</li>
                                    <li onClick={() => setcategorie("Dessert")} className='p-2 hover:bg-gray-700 cursor-pointer'>Dessert</li>
                                    <li onClick={() => setcategorie("Soupe")} className='p-2 hover:bg-gray-700 cursor-pointer'>Soupe</li>
                                    <li onClick={() => setcategorie("Salade")} className='p-2 hover:bg-gray-700 cursor-pointer'>Salade</li>
                                    <li onClick={() => setcategorie("Amuse-bouche")} className='p-2 hover:bg-gray-700 cursor-pointer'>Amuse-bouche</li>
                                    <li onClick={() => setcategorie("Sandwich")} className='p-2 hover:bg-gray-700 cursor-pointer'>Sandwich</li>
                                    <li onClick={() => setcategorie("Quiche")} className='p-2 hover:bg-gray-700 cursor-pointer'>Quiche</li>
                                    <li onClick={() => setcategorie("Gratin")} className='p-2 hover:bg-gray-700 cursor-pointer'>Gratin</li>
                                    <li onClick={() => setcategorie("Sauté")} className='p-2 hover:bg-gray-700 cursor-pointer'>Sauté</li>
                                    <li onClick={() => setcategorie("Pâtes")} className='p-2 hover:bg-gray-700 cursor-pointer'>Pâtes</li>
                                    <li onClick={() => setcategorie("Spécialité régionale")} className='p-2 hover:bg-gray-700 cursor-pointer'>Spécialité régionale</li>
                                    <li onClick={() => setcategorie("Petit déjeuner")} className='p-2 hover:bg-gray-700 cursor-pointer'>Petit déjeuner</li>
                                    <li onClick={() => setcategorie("Boisson")} className='p-2 hover:bg-gray-700 cursor-pointer'>Boisson</li>
                                    <li onClick={() => setcategorie("Snack")} className='p-2 hover:bg-gray-700 cursor-pointer'>Snack</li>
                                    <li onClick={() => setcategorie("Vegan")} className='p-2 hover:bg-gray-700 cursor-pointer'>Vegan</li>
                                    </ul>
                
                                </div>
                                {categorie!="Categorie"?<button
                                    onClick={()=> {setcategorie("Categorie");setDeletedFilter(!deletedFilter);}}
                                    className="relative h-5 text-center top-[-20px]  text-black text-[12px] bg-gray-500  rounded-full px-[7px] anime"
                                >
                                    &times;
                            </button>:null}
                                </div>
                                

                {loadingEffect ? (
                <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                <div className="flex flex-wrap justify-start mt-3">
                    {recettes?.length > 0 ? (
                    recettes.map((recette) => (
                        <Card key={recette.id} recette={recette} onClick={() => handleRecetteClick(recette)} />
                    ))
                    ) : (
                    <p className="text-white mt-4">Aucune recette trouvée</p>
                    )}
                </div>
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
            </main>
            )}
        </div>
        );

}