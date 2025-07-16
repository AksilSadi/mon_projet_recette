import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
export default function Card({recette, onClick}) {
    return (
        <div key={recette.id} className="flex flex-col rounded-lg w-56 mr-6 px-6 py-4 bg-white/15 backdrop-blur-md anime" onClick={()=>onClick(recette)}>
            <Image
              src={`http://localhost:4000/file/${recette.image}`}
              className="h-80 object-cover w-[500px] rounded-lg"
                alt="Recette Image"
                width={500}
                height={320}
            />
            <p className="text-white text-center mt-1">{recette.titre}</p>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center">
                <div className="flex mr-2">
                  <FontAwesomeIcon icon={faStar} className="text-lg w-3 text-yellow-300" />
                <li className="list-none ml-1 text-base text-yellow-300 text-[12px]">
                  {recette.averageRating}
                </li>
                </div>
                <div className="flex mr-2">
                  <FontAwesomeIcon icon={faHeart} className="text-lg w-3 text-red-600" />
                  <li className="list-none ml-1 text-base text-white text-[12px]">{`${recette.favoriCount}`}</li>
                </div>
                <div className="flex mr-2">
                  <FontAwesomeIcon icon={faComment} className="text-lg w-3 text-white" />
                  <li className="list-none ml-1 text-base text-white text-[12px]">{recette.commentCount}</li>
                </div>
                
              </div>
            </div>
          </div>
    );
}