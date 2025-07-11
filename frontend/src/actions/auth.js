"use server";

import axios from "axios";

export default async function connexion(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await axios.post("http://localhost:4000/utilisateurs/login", {
      email: email,
      motDePasse: password,
    });

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      return { success: true, message: "Connexion réussie", data };
    }
  } catch (error) {
    // Axios encapsule les erreurs dans `error.response`
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message || "Erreur inconnue";

    return {
      success: false,
      message: `${serverMessage}`,
    };
  }
}
