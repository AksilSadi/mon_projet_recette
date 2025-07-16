"use client";
import Header from '../../../composants/header.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash,faPen } from '@fortawesome/free-solid-svg-icons'
import "../globals.css";
import React, { use, useState,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import FormIngre from '../../../composants/formulaireIngr'
import axios from 'axios';
export default function Ingredient() {
    const [ingredients, setIngredients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [supprime, setSupprime] = useState(false);
    const [nom, setNom] = useState("");
    const [categorie, setCategorie] = useState("");
    const [id, setId] = useState(null);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(((ingredients?.total)|| 8)/8) || 1;
    const [ajout, setAjout] = useState(false);
    const[loading,setLoading] = useState(false);

    const handleAddIngredient = () => {
        setShowForm(!showForm);
    }
    const handleSadd = () => {
        setAjout(!ajout);
        setNom("");
        setCategorie("");
        setId(null);
    }
    const deleteIngredient = (id) => {
        axios.delete(`http://localhost:4000/ingredients/${id}`)
        .then(response => {
            toast.success("Ingredient supprimé avec succès");
            setSupprime(!supprime);
        })
        .catch(error => {
            toast.error("erreur lors de la suppression de l'ingrédient");
        });
    }

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

  useEffect(() => {
  const fetchIngredients = async () => {
    try {
     setLoading(true)
      const response = await axios.get(`http://localhost:4000/ingredients?page=${page}&limit=8`);
      setIngredients(response.data);
      
    } catch (error) {
      toast.error(error.message || "Erreur lors de la récupération des ingrédients");
    }finally{
        setLoading(false);
    }
  };
  fetchIngredients();
}, [page,supprime,ajout]);


    return (
        <div className="flex flex-col w-full h-full px-10 main z-10">
              <Header/>
              {showForm ?<FormIngre onClick={handleAddIngredient} Nom={nom} Categorie={categorie} Id={id} Ajout={handleSadd}/>:null }
            <main className="w-full h-full mt-10 z-10">
                <div className="flex justify-between">
                    <p className='font-bold text-white text-2xl'>Ingredients</p>
                    <button className='text-white px-2 py-2 rounded-lg boutton flex items-center' style={{backgroundColor:"#0029FF"}} onClick={handleAddIngredient}>
                        <FontAwesomeIcon icon={faPlus} />
                        <p className='ml-2'>Ajouter un ingredient</p>
                    </button>
                </div>
                <div className='mt-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2 shadow-lg mx-2'>
                <table className='w-full text-left text-white border-separate border-spacing-y-2'>
                    <thead className='text-gray-300'>
                        <tr className='border-b border-white/20'>
                            <th className='p-2'>Id</th>
                            <th className='p-2'>Nom</th>
                            <th className='p-2'>Catégorie</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                            <td colSpan={4} className="text-center py-4 text-white">
                                Chargement...
                            </td>
                            </tr>)
                        :ingredients?.data?.length > 0?
                        ingredients?.data?.map((ingredient) => (
                            <tr key={ingredient.id} className='border-b border-white/20 hover:scale-[1.05] transition-all duration-300 hover:bg-white/60 opacity-70'>
                                <td className='p-2'>{ingredient.id}</td>
                                <td className='p-2'>{ingredient.nom}</td>
                                <td className='p-2'>{ingredient.categorie}</td>
                                <td className='p-2'>
                                    <button className='text-blue-700 hover:underline hover:cursor-pointer' onClick={() => {
                                        setNom(ingredient.nom);
                                        setCategorie(ingredient.categorie);
                                        setId(ingredient.id);
                                        handleAddIngredient();
                                        
                                    }}>
                                        <FontAwesomeIcon icon={faPen} className='mr-1' />
                                    </button>
                                    <button className='text-red-700 hover:underline ml-4 hover:cursor-pointer' onClick={() => deleteIngredient(ingredient.id)}>
                                        <FontAwesomeIcon icon={faTrash} className='mr-1' />
                                    </button>
                                </td>
                            </tr>
                        )):<tr>
                            <td colSpan={4} className="text-center py-4 text-white">
                                Aucun ingrédient trouvé
                            </td>
                            </tr>}
                    </tbody>
                </table>
                <div className='flex justify-center items-center mt-4'>
                    <div className='flex space-x-2'>
                        {paginationRange.map((pageNum, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(pageNum)}
                                className={`px-3 py-1 rounded-full ${pageNum === page ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-500'}`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>
                    </div>
                </div>
                </main>
        </div>
    );
}