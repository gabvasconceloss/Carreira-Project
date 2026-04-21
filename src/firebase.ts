import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do seu projeto Trilha Jovem
const firebaseConfig = {
  apiKey: "AIzaSyBhIICUwGBc0WS1VKN6aPAlmbgHH9-rmwE",
  authDomain: "trilha-jovem-76bae.firebaseapp.com",
  projectId: "trilha-jovem-76bae",
  storageBucket: "trilha-jovem-76bae.firebasestorage.app",
  messagingSenderId: "274515880203",
  appId: "1:274515880203:web:967fce5aef009840ff1a0e",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Banco de Dados e exporta para usarmos no Mural
export const db = getFirestore(app);
