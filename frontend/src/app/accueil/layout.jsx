"use client";

import { Toaster, toast } from "react-hot-toast"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCarrot, faHeart, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import Cookies from "js-cookie";




export default function RootLayout({ children }) {
  const handleLogout = () => {
    Cookies.remove('user');
    toast.success("Vous avez été déconnecté !");
  };

  return (
    <html lang="fr">
      <body>
        <Toaster position="top-center" /> 

        <div 
          className="relative min-h-screen flex" 
          style={{ 
            backgroundImage: "url('/background7.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/30 z-0">
          </div>
          
          <div 
            className={`w-[200px] h-screen fixed top-0 left-0 bg-white/15 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex flex-col items-start p-3`}
          >
            {/* Logo et titre MAXIL */}
            <div className='flex pl-3 pt-8 items-center mb-8'> {/* Ajout d'une marge en bas */}
              <p className='text-white text-3xl font-semibold'>MAXIL</p>
            </div>

            <ul className='flex flex-col w-full px-2'> 
              
              <li className={`flex items-center py-2 h-14 rounded-2xl pl-3 hover:bg-white/10 transition-colors cursor-pointer`}>
                <FontAwesomeIcon icon={faUtensils} className='text-lg w-5 text-white' />
                <span className='ml-3 text-base text-white'>Recette</span> 
              </li>

             
              <li className={`mt-1 flex items-center py-2 h-14 rounded-2xl pl-3 hover:bg-white/10 transition-colors cursor-pointer`}>
                <FontAwesomeIcon icon={faCarrot} className='text-lg w-5 text-white' />
                <span className='ml-3 text-base text-white'>Ingredients</span>
              </li>

              
              <li className={`mt-1 flex items-center py-2 h-14 rounded-2xl pl-3 hover:bg-white/10 transition-colors cursor-pointer`}>
                <FontAwesomeIcon icon={faHeart} className='text-lg w-5 text-white' />
                <span className='ml-3 text-base text-white'>Favoris</span>
              </li>
            </ul>

           
            <div 
              className={`flex w-full px-2 items-center py-2 h-14 rounded-2xl pl-3 hover:bg-white/10 transition-colors cursor-pointer absolute bottom-4`}
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-lg w-5 text-white' />
              <span className='ml-3 text-white text-base'>Déconnecter</span>
            </div>
          </div>
          <main>
          {children}
        </main> 
        </div>

         
      </body>
    </html>
  );
}