"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "../composants/formulaire.jsx";
export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
    const textRef = useRef(null);
    const formRef = useRef(null);
    
    const [positions, setPositions] = useState({
      textX: 0,
      formX: 0,
      textWidth: 0,
      formWidth: 0
    });
  
    useEffect(() => {
    if (textRef.current && formRef.current) {
      const textPosition = textRef.current.getBoundingClientRect();
      const formPosition = formRef.current.getBoundingClientRect();
  
      setPositions({
        textX: textPosition.left,
        formX: formPosition.left,
        textWidth: textPosition.width,
        formWidth: formPosition.width,
      });
    }
  }, []);
  
    const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  
    if (textRef.current && formRef.current) {
      textRef.current.style.transition = "transform 0.7s ease-in-out";
      formRef.current.style.transition = "transform 0.7s ease-in-out";
  
      if (isLogin) {
        const maxWidth = Math.max(positions.textWidth, positions.formWidth);
  
        textRef.current.style.transform = `translateX(${
          positions.formX - positions.textX + (positions.formWidth - maxWidth)
        }px)`;
  
        formRef.current.style.transform = `translateX(${
          positions.textX - positions.formX + (positions.textWidth - maxWidth) + 100
        }px)`;
      } else {
        textRef.current.style.transform = "translateX(0)";
        formRef.current.style.transform = "translateX(0)";
      }
    }
  };


  return (
    <div className="flex w-full h-full bg-[url('../../public/background6.jpg')] bg-cover bg-center"  >
      <div className="flex-col w-screen min-w-full h-full min-h-screen">
      <div className="h-20 w-screen min-w-full"></div>

      <div className="w-full px-8 py-8 flex md:flex-row sm:justify-between xl:px-20 items-center sm:items-center relative">
        
        {/* Bloc texte à gauche */}
        <div
          ref={textRef}
          className="hello mb-8 md:mb-20 flex flex-col justify-center"
        >
         <p className="text-3xl sm:max-xl:text-5xl xl:text-5xl text-white font-semibold">
          {isLogin ? "Rejoignez MAXIL" : "Ne Ratez Aucune Recette Gourmande"}
        </p>

        <p className="mt-12 text-white">
          {isLogin
            ? "Créez un compte pour enregistrer vos recettes préférées, partager vos créations et recevoir des recommandations personnalisées."
            : "MAXIL vous propose chaque jour de nouvelles recettes simples, originales ou traditionnelles. Que vous soyez débutant ou passionné, trouvez l'inspiration idéale."}
        </p>

        <hr className="mt-12 text-white md:w-72 border-2 border-solid border-white" />

        <p className="mt-12 text-white">
          {isLogin
            ? "Organisez vos menus de la semaine, explorez de nouvelles idées et échangez avec une communauté de passionnés."
            : "Parcourez les recettes par thème ou ingrédient, créez votre carnet personnel et préparez vos plats avec plaisir et simplicité."}
        </p>

          <button
            className="mt-12 px-4 py-2 text-black font-semibold bg-white rounded-lg shadow hover:bg-gray-200 transition boutton"
            onClick={(e) => {
              e.preventDefault();
              handleSwitch();
            }}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </div>

        {/* Composant Formulaire */}
        <div
          ref={formRef}
          className="form-container"
        >
          <Form isLogin={isLogin} />
        </div>
      </div>
    </div>
    </div>
    
  );
}
