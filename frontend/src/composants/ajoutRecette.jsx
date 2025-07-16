"use client";

import { use,useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from '../context/UserContext.jsx';

export default function AjoutRecette({ onClick }) {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const[id, setId] = useState(null);
    const [units, setUnits] = useState("");
    const [quantity, setQuantity] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [titre, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [type,setType] = useState("")
    const [image, setImage] = useState(null);
    const { user } = useUser();
    const [etapes, setEtapes] = useState("");

    const handleEtapesChange = (e) => {
        const rawText = e.target.value;

        // pour formater le texte en ajoutant un numéro de ligne
        const formatted = rawText
        .split("\n")
        .map((line, index) => line ? `${index + 1}- ${line.replace(/^\d+-\s*/, "")}` : "")
        .join("\n");

        setEtapes(formatted);
    };

    const handleAddIngredient = () => {
        if (ingredientName!="Ingrédients" && quantity!="" && units!="" && id) {
            setSelectedIngredients([...selectedIngredients, { name: ingredientName, quantity, units, id }]);
            setIngredientName("");
            setQuantity("");
            setUnits("");
            setId(null);
        }else{
            toast.error("pour ajouter un ingrédient, il faut remplir tous les 3 champs");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titre && description && etapes && time && selectedIngredients.length > 0) {
            const formData = new FormData();
            formData.append("titre", titre);
            formData.append("description", description);
            formData.append("etapes", etapes);
            formData.append("temps", time);
            formData.append("image", image);
            formData.append("type",type);
            formData.append("utilisateurId", user.id);
            try {
                const response = await axios.post("https://backend-xxr1.onrender.com/recettes", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200 || response.status === 201) {
                    toast.success("Recette ajoutée avec succès");
                    onClick();
                    const idIngredient=response.data.id;
                    const ingredientPromises = selectedIngredients.map((ingredient) => {
                        return axios.post("https://backend-xxr1.onrender.com/recette-ingredient", {
                            recetteId: idIngredient,
                            ingredientId: ingredient.id,
                            quantite: ingredient.quantity,
                            unite: ingredient.units,
                        });
                    });
                    await Promise.all(ingredientPromises);
                    setSelectedIngredients([]);
                    setTitle("");
                    setDescription("");
                    setEtapes("");
                    setTime("");
                    setImage(null);
                    setIngredientName("");
                    setQuantity("");
                    setUnits("");
                    setType("")
                    setId(null);
                }
            } catch (error) {
                toast.error("Erreur lors de l'ajout de la recette");
                console.error(error);
            }
        } else {
            toast.error("Veuillez remplir tous les champs requis et ajouter au moins un ingrédient.");
        }
    };

    useEffect(() => {
        console.log(user.id);
        const fetchIngredients = async () => {
            try {
                const response = await axios.get("https://backend-xxr1.onrender.com/ingredients/all");
                setIngredients(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des ingrédients :", error);
            }
        };
        fetchIngredients();
    }, []);

    return(
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-85 z-20">

          <form
            className="absolute top-1/2 left-1/2 transform w-[464px] -translate-x-1/2 -translate-y-1/2 rounded-xl py-5 px-10 backdrop-blur-md bg-white/20"
          onSubmit={handleSubmit}
          >
           <button
            onClick={onClick}
            type="button"
            className="absolute h-5 text-center top-[-8px] right-[-20px] text-black text-[12px] bg-gray-500 rounded-full px-[6px] anime"
           >
            &times;
           </button>
            <h2 className="text-xl font-semibold mb-2 text-white">Ajouter une recette</h2>

            <div className="flex">
            <div className="flex flex-col">
             <label className="block text-sm font-medium text-white">Titre</label>
             <input type="text" className="w-full p-2 mt-2 mb-2 rounded-lg bg-white/10 text-white placeholder:text-gray-300 outline-none" onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="ml-2">
             <label className="block text-sm font-medium text-white">Type de plat</label>
             <select className="w-full mt-2 mb-2 p-2 rounded bg-white/10 text-black outline-none" onChange={(e) => setType(e.target.value)} value={type}>
             <option value="Entrée">Entrée</option>
             <option value="Plat principal">Plat principal</option>
             <option value="Accompagnement">Accompagnement</option>
             <option value="Dessert">Dessert</option>
             <option value="Soupe">Soupe</option>
             <option value="Salade">Salade</option>
             <option value="Amuse-bouche">Amuse-bouche</option>
             <option value="Sandwich">Sandwich</option>
             <option value="Quiche">Quiche</option>
             <option value="Gratin">Gratin</option>
             <option value="Sauté">Sauté</option>
             <option value="Pâtes">Pâtes</option>
             <option value="Spécialité régionale">Spécialité régionale</option>
             <option value="Petit déjeuner">Petit déjeuner</option>
             <option value="Boisson">Boisson</option>
             <option value="Snack">Snack</option>
             <option value="Vegan">Vegan</option>
             </select>
            </div>
            </div>
            

            <label className="block text-sm font-medium text-white">Description</label>
            <textarea className="w-full p-2 mt-2 mb-2 rounded-lg bg-white/10 text-white placeholder:text-gray-300 outline-none" rows={3} onChange={(e)=>setDescription(e.target.value)}></textarea>

            <div className="mb-2">
            <label className="block text-sm font-medium text-white mb-2">Ingrédients</label>

            <div className="flex items-center space-x-2 mb-4">
                <select
                className="flex-1 p-2 rounded bg-white/10 text-black outline-none"
                onChange={(e) => {
                    setId(parseInt(e.target.selectedOptions[0].dataset.id));
                    setIngredientName(e.target.value);
                }} value={ingredientName}>
                <option value="">Ingredients</option>
                {ingredients.map((ingredient) => (
                    <option
                    key={ingredient.id}
                    value={ingredient.nom}
                    data-id={ingredient.id}
                    >
                    {ingredient.nom}
                    </option>
                ))}
                </select>


                <input type="number" placeholder="Quantité" className="w-20 p-2 placeholder:text-black text-black placeholder:text-[13px] text-sm rounded bg-white/10 outline-none" onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>

                <select className="w-28 p-2 rounded bg-white/10 text-black outline-none" onChange={(e) => setUnits(e.target.value)} value={units}>
                <option value="">Unité</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="L">L</option>
                <option value="nombre">nombre</option>
                <option value="pincée">pincée</option>
                <option value="cuillère à soupe">cuillère à soupe</option>
                <option value="cuillère à café">cuillère à café</option>
                <option value="tasse">tasse</option>
                </select>

                <button type="button" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={handleAddIngredient}>
                +
                </button>
            </div>

            {/* Liste des ingrédients ajoutés */}
            <div className="flex flex-wrap gap-2 mb-4">
            {
                selectedIngredients.map((ingredient, index) => (
                    <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full flex items-center space-x-2 mb-2 w-fit">
                        <span>{ingredient.name} - {ingredient.quantity} {ingredient.units}</span>
                        <button className="text-red-300 hover:text-red-500 text-sm" onClick={() => {
                            const newSelected = selectedIngredients.filter((_, i) => i !== index);
                            setSelectedIngredients(newSelected);
                        }}>&times;</button>
                    </span>
                ))
            }
            </div>

            </div>

            <label className="block text-sm font-medium text-white">Étapes</label>
            <textarea
                value={etapes}
                onChange={handleEtapesChange}
                className="w-full p-2 mt-2 mb-4 rounded-lg bg-white/10 text-white placeholder:text-gray-300 outline-none"
                rows={4}
                placeholder="Tapez les étapes ici..."
            />

            <label className="block text-sm font-medium text-white">Temps (minutes)</label>
            <input type="number" className="w-full p-2 mt-2 mb-2 rounded-lg bg-white/10 text-white placeholder:text-gray-300 outline-none" onChange={(e)=>setTime(e.target.value)} />

            <label className="block text-sm font-medium text-white">Image</label>
            <input type="file" accept="image/*" className="w-full mb-2 text-white" onChange={(e) => setImage(e.target.files[0])} />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Confirmer
            </button>
          </form>
        </div>
    )
}