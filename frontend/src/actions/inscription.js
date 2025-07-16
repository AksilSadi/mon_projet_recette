"use server";

import axios from "axios";

export default async function inscription(state, formData) {
  const nom = formData.get("nom")?.trim();
  const prenom = formData.get("prenom")?.trim();
  const email = formData.get("email")?.trim();
  const password = formData.get("password")?.trim();
  const categry = formData.get("category")?.trim();

  const errors = {};

  if (!nom) errors.nom = "Le nom est requis.";
  if (!prenom) errors.prenom = "Le prénom est requis.";
  if (!email) errors.email = "L'email est requis.";
  if (!password) errors.password = "Le mot de passe est requis.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Certains champs sont manquants.",
      errors, 
    };
  }

  try {
    const response = await axios.post("https://backend-xxr1.onrender.com/utilisateurs", {
      nom,
      prenom,
      email,
      motDePasse: password,
      role: categry || "visiteur",
    });

    if (response.status === 200 || response.status === 201) {
        const data={
            nom,
            prenom,
            email,
            role: categry || "visiteur",
        }
      return { success: true, message: "Inscription réussie", data };
    }
  } catch (error) {
    const serverMessage = error.response?.data?.message || "Erreur inconnue";

    return {
      success: false,
      message: serverMessage,
      errors: {}, 
    };
  }
}
