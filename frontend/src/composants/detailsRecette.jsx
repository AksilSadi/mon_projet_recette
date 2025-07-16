"use client";
import React, { use, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart,faEllipsisVertical}from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUser } from '../context/UserContext.jsx';
import image from '../../public/download.png';
import Image from 'next/image'
export default function DetailsRecette({ recette }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[liked,setLiked]=useState(false);
    const { user } = useUser();
    const [loading,setLoading]=useState(false);
    const [loadinglike,setLoadingLike]=useState(false);
    const[loadingComment,setLoadingComment]=useState(false);
    const[loadingAddcomment,setLoadingAddComment]=useState(false);
    const[loadingstar,setLoadingStar]=useState(false);
    const[loadindrating,setLoadingRating]=useState(false);
    const [note, setNote] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const etapesArray = recette.etapes.split("\r\n");
    const [comments, setComments] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [comment, setComment] = useState("");
    const [averageRating, setAverageRating] = useState(recette.averageRating || 0);
    const [estNote, setEstNote] = useState(false);
    

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recettes/${recette.id}/ingredients`);
                setIngredients(response.data.recetteIngredients);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        fetchIngredients();
    }, [recette.id]);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                setLoadingRating(true);
                const response = await axios.get(`http://localhost:4000/notation/recette/${recette.id}/average`);
                setAverageRating(response.data.average);
            } catch (error) {
                console.error("Error fetching average rating:", error);
            }finally {
                setLoadingRating(false);
            }
        };
        fetchAverageRating();
    }, [recette.id, averageRating, estNote]);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                setLoadingLike(true);
                const response = await axios.get(`http://localhost:4000/favoris/is/${user.id}/${recette.id}`);
                setLiked(response.data.isFavori);
            } catch (error) {
                console.error("Error fetching like status:", error);
            }finally {
                setLoadingLike(false);
            }
        };
        fetchLikeStatus();
    }, [recette.id, user.id]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
              setLoading(true);
                const response = await axios.get(`http://localhost:4000/notation/recette/${recette.id}/utilisateur/${user.id}`);
                setNote(response.data.note);
            } catch (error) {
                console.error("Error fetching rating:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchRating();
    }, [recette.id, user.id, estNote]);

    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComment(true);
            try {
                const response = await axios.get(`http://localhost:4000/recettes/${recette.id}/commentaires`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoadingComment(false);
            }
        };
        fetchComments();
    }, [recette.id,loadingAddcomment]);

    const handleLike = async () => {
        setLoadingLike(true);
        try {
            if (liked) {
                const response = await axios.delete(`http://localhost:4000/favoris`, {
                    data: {
                        utilisateurId: user.id,
                        recetteId: recette.id,
                    },
                });
                if (response.status === 200) {
                    setLiked(false);
                    toast.success("Recette retirée de vos favoris");
                }
            } else {
                const response = await axios.post(`http://localhost:4000/favoris`, {
                    utilisateurId: user.id,
                    recetteId: recette.id,
                });
                if (response.status === 200 || response.status === 201) {
                    setLiked(true);
                    toast.success("Recette ajoutée à vos favoris");
                }
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des favoris");
            console.error(error);
        } finally {
            setLoadingLike(false);
        }
    }

    const handleAddcommentaire = async (e) => {
        e.preventDefault();
        if (comment.trim() === "") {
            toast.error("Le commentaire ne peut pas être vide");
            return;
        }
        setLoadingAddComment(true);
        try {
            const response = await axios.post(`http://localhost:4000/commentaire`, {
                texte: comment,
                recetteId: recette.id,
                utilisateurId: user.id,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Commentaire ajouté avec succès");
                setComment("");
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout du commentaire");
            console.error(error);
        } finally {
            setLoadingAddComment(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/commentaire/${id}`);
            if (response.status === 200) {
                toast.success("Commentaire supprimé avec succès");
                setComments(comments.filter(c => c.id !== id));
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression du commentaire");
            console.error(error);
        }
    };
    const handleRateClick = async () => {
        if (note === null) {
            toast.error("Veuillez sélectionner une note avant de soumettre.");
            return;
        }
        setLoadingStar(true);
        try {
            const response = await axios.post(`http://localhost:4000/notation`, {
                note: note,
                utilisateurId: user.id,
                recetteId: recette.id,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Recette notée avec succès");
                setIsModalOpen(false);
                setNote(null);
                setEstNote(!estNote);
            }
        } catch (error) {
            toast.error("Erreur lors de la notation de la recette");
            console.error(error);
        } finally {
            setLoadingStar(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col ">
                <div className="w-full flex flex-col relative min-h-[400px] rounded-lg overflow-hidden mt-8">
          
          {/* Overlay flou pour le texte */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-white/20 backdrop-blur-md text-white p-4">
        
          {isModalOpen && (
          <div className="fixed inset-0  flex items-center justify-center z-50">
            <div className="bg-black/20 backdrop-blur-md text-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                onClick={()=> {setIsModalOpen(false);setNote(null);}}
                className="absolute text-center top-[-24px] right-[-20px] text-white text-xl bg-gray-500 rounded-2xl px-2 anime"
              >
                &times;
              </button>
              
              <div className="flex flex-col items-center">
                <div className="text-yellow-400 font-semibold mb-2 uppercase text-sm">Noter ceci</div>
                <div className="text-lg font-bold mb-4 text-center">{recette.titre}</div>
        
                <div className="flex justify-center mb-4">
                  <Rating
                        name="film-rating"
                        value={note}
                        max={5} 
                        precision={1} 
                        onChange={(e) => {
                        const newValue = e.target.value;
                        setNote(Number(newValue));
                        }}
                    />
                </div>
        
                <button className={`w-[200px] px-6 py-2 rounded-full anime transition-colors duration-300
                    ${note === null
                    ? 'bg-gray-600 text-white opacity-50 cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer'}
                `} onClick={handleRateClick} disabled={note === null}>
                  {loadingstar ? (
                <>
                  <div className="w-2 h-2 border-2 border-gray-100 border-t-transparent rounded-full animate-spin" />
                  Chargement...
                </>
              ) : (
                "Noter"
              )}
                </button>
              </div>
            </div>
          </div>
        )}
        
           <div className='flex w-full h-full'>
            <div className='w-1/2 pl-10'>
             <h2 className="text-2xl font-bold">{recette.titre}</h2>
             <p className='text-white mt-3 font-semibold'>Description:</p>
             <p className="text-[16px] mt-0.5 text-gray-200 leading-loose">{recette.description}</p>
             <div className='flex mt-3'>
              <p className='text-white font-semibold'>temps:</p>
             <span className='ml-1 text-gray-200'>{recette.temps} min</span>
             </div>
             <div className='flex mt-3 items-center'>
              <p className='text-white font-semibold'>type plat:</p>
              <span className='ml-1 text-gray-200'>{recette.type}</span>
             </div>
             <div className='flex flex-col mt-3'>
              <p className='text-white font-semibold'>Ingredients:</p>
              <ul className='list-disc ml-5 mt-1'>
                {ingredients.map((ingredient) => (
                  <li key={ingredient.id} className='text-gray-200 text-[16px]'>
                    {ingredient.ingredient.nom} - {ingredient.quantite} {ingredient.unite}
                  </li>
                ))}
              </ul>
             </div>
                <div className="flex mt-4 items-center">
                    {loading?<div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                    :<div className='flex justify-between items-center'>
                     {note!=null?<p className="text-lg text-gray-200">Ma note</p>:null}
                <div className="flex items-center px-4 py-0.5 rounded-2xl hover:bg-gray-500 group cursor-pointer" style={{ '--tw-bg-opacity': '0.2' }} onClick={()=>setIsModalOpen(true)}>
                    <FontAwesomeIcon
                        icon={faStar}
                        className={`w-5 h-5 stroke-yellow-400 ${
                            note !== null ? 'text-yellow-400' : 'text-transparent'
                        }`}
                        style={{ strokeWidth: 40 }}
                        />
                  <p className="text-lg ml-2 text-yellow-400">{note==null?`Noter`:`${note}/5`}</p>
                </div>                
                    </div>}
                    
                    {loadinglike?<div className="ml-10 w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    :<div className="flex items-center px-4 py-0.5 rounded-2xl hover:bg-gray-500 group cursor-pointer" style={{ '--tw-bg-opacity': '0.2' }} onClick={handleLike}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`w-5 h-5 stroke-red-600 ${
                            liked === true ? 'text-red-600' : 'text-transparent'
                        }`}
                        style={{ strokeWidth: 40 }}
                        />
                  <p className="text-lg ml-2 text-white">J'aime</p>
                </div>}
                {loadindrating?<div className="ml-10 w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                :<div className='flex items-center ml-10'>
                <FontAwesomeIcon icon={faStar} className="text-lg w-5 text-yellow-300" />
                <div className="flex pl-1">
                    <li className="list-none text-white text-[16px]">
                        {averageRating}
                    </li>
                    <li className="list-none ml-1 text-white text-[12px] self-center">
                        /5
                    </li>
               </div>
             </div>}
        
                </div>
            </div>
            <Image
             src={`http://localhost:4000/file/${recette.image}`}
             className="h-80 object-cover w-[500px] rounded-lg"
               alt="Recette Image"
               width={500}
               height={320}
            />
        
           </div>

        
          </div>
           
        </div>
        <section className="mt-6 pl-4 w-full bg-white/20 backdrop-blur-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Etapes</h3>
            {etapesArray.map((etape, index) => (
                <div key={index} className="mb-4">
                    <p className="text-gray-200">{` ${etape}`}</p>
                </div>
            ))}
        </section>
        <section className='mt-6 pl-4 w-full bg-white/20 backdrop-blur-md p-4 rounded-lg'>
        <form onSubmit={handleAddcommentaire} className="mb-4">
          <textarea 
            className="w-full p-3 rounded-md input text-white resize-none" 
            placeholder="Ajoutez un commentaire..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="mt-2 px-4 py-2 text-white bg-gray-500 anime rounded-md">{loadingAddcomment ? (
            <>
              <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Chargement...
            </>
          ) : (
            "Publier"
          )}</button>
        </form>
          <h2 className="text-2xl font-bold mb-4 text-white">Commentaires</h2>
          
              {/* Liste des commentaires */}
              {loadingComment?<div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              :<div className="max-h-60 overflow-y-auto pr-2">
                  {comments?.length === 0 ? (
              <p className="text-gray-200">Aucun commentaire pour le moment.</p>
              ) : (
              comments?.map((c, index) => (
                  <div key={index} className="flex p-3 rounded-xl h-14 mt-2 commentaire ml-2 py-2 mb-2">
                   <Image src={image} className="h-10 w-10 rounded-full" alt='erreur'/>
                  <div className='flex flex-col ml-2'>
                   <p className="text-xs font-semibold text-white"> {c?.utilisateur.nom} {c?.utilisateur.prenom}</p>
                   <p className="text-sm mt-1 text-gray-200">{c?.texte}</p>
                  </div>
                  {c?.utilisateur.id===user?.id?<div className="relative top-[-2px] right-[-20px] ">
                    <button onClick={() =>{ setMenuOpen(index); setShowMenu(!showMenu)}}>
                      <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-200 hover:text-white anime " />
                    </button>
                    </div>:null}
                     {menuOpen === index && showMenu && (
                      <div className="relative top-[-2px] right-[-32px] rounded commentaire z-10 anime">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="block px-4 py-2 text-white  text-sm w-full text-left"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
            ))
          )}
              </div>}
        </section>
        <div className='mt-10 h-10'>
          <p className='invisible'>aksil</p>
        </div>
        </div>
    );
}