import "./globals.css";
import Header from '../../composants/header.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function accueil(){
    return (
        <div className="flex flex-col w-full h-full px-10 main z-10">
           <Header/>
           <main className="w-full h-full mt-10 z-10">
            <div className="flex justify-between">
                <p className='font-bold text-white text-2xl'>Recettes</p>
                <button className='text-white px-2 py-2 rounded-lg mb-8 boutton flex items-center' style={{backgroundColor:"#0029FF"}}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="ml-2">Ajouter une recette</p>
                </button>
            </div>
            <div>
                {/*c'est ici que je dois afficher les card qui sont les recette! */}
            </div>
            </main>
        </div>
    );
}