"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormIngre({onClick,Nom,Categorie, Id, Ajout}) {
  const [showProfile, setShowForm] = useState(true);
  const addingredient = (e) => {
    e.preventDefault();
    if(Nom === "" || Categorie === "") {    
      axios.post("http://localhost:4000/ingredients", {
      nom: e.target[1].value,
      categorie: e.target[2].value,
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success("Ingrédient ajouté avec succès");
          Ajout();
          onClick();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erreur lors de l'ajout de l'ingrédient");
      });
    }else{
    axios.put(`http://localhost:4000/ingredients/${Id}`, {
          nom: e.target[1].value,
          categorie: e.target[2].value,
        })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              toast.success("Ingrédient modifié avec succès");
              Ajout();
              onClick();
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Erreur lors de la modification de l'ingrédient");
          });
    }
    e.target.reset();
  };


  return (
    <>
      {showProfile && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-85 z-20">

          <form
            className="absolute top-1/2 left-1/2 transform w-[464px] -translate-x-1/2 -translate-y-1/2 rounded-xl py-10 px-10 backdrop-blur-md bg-white/20"
          onSubmit={addingredient}
          >
           <button
            onClick={onClick}
            type="button"
            className="absolute h-5 text-center top-[-12px] right-[-18px] text-black text-[12px] bg-gray-500 rounded-full px-[6px] anime"
           >
            &times;
           </button>
            <label className="text-white font-semibold">
              Nom de l'ingrédient
            </label>
            <input
              type="text"
              className="w-full p-2 mt-2 mb-4 rounded-lg bg-white/10 text-white placeholder:text-gray-300 outline-none"
              placeholder="exemple: Carotte"
              defaultValue={Nom}
            />
            <label className="text-white font-semibold">Catégorie</label>
            <select className="w-full p-2 mt-2 mb-4 rounded-lg bg-white/10 text-black placeholder:text-gray-300 outline-none"
              defaultValue={Categorie}>
              <option value="legume">Légume</option>
              <option value="fruit">Fruit</option>
              <option value="viande">Viande</option>
              <option value="poisson">Poisson</option>
              <option value="produit laitier">Produit laitier</option>
              <option value="Pâtes">Pâtes</option>
              <option value="Huile">Huile</option>
              <option value="Épices">Épices</option>
              <option value="Herbes">Herbes</option>
              <option value="autre">Autre</option>
            </select>
            <button
              type="submit"
              className="w-full p-2 mt-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Confirmer
            </button>
          </form>
        </div>
      )}
    </>
  );
}
