// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8ca_n6Vw41vHTG9w5sxTXTUhIAvefpBw",
  authDomain: "deliveryconquista-6e8fc.firebaseapp.com",
  projectId: "deliveryconquista-6e8fc",
  storageBucket: "deliveryconquista-6e8fc.appspot.com",
  messagingSenderId: "430794099557",
  appId: "1:430794099557:web:91c63c1e3175d6eb022f8c",
  measurementId: "G-DFJPDNBP45"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Adicione esta verificação antes da lógica que lida com o envio do formulário de pedidos
// ...

// Verifica se o usuário está autenticado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.error('Usuário não autenticado. Faça login ou crie uma conta para fazer um pedido.');
    // Exibe a seção de autenticação
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('pedidoForm').style.display = 'none';
  }
});

// Captura o formulário
const formulario = document.getElementById('pedidoForm');

// Lida com o envio do formulário
formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Verifica se o usuário está autenticado novamente (pode ter mudado enquanto a página estava aberta)
  const user = auth.currentUser;
  if (!user) {
    console.error('Usuário não autenticado. Faça login ou crie uma conta para fazer um pedido.');
    // Exibe a seção de autenticação
    document.getElementById('authSection').style.display = 'block';
    return;
  }

  // Obtém dados do formulário
  const nomeCliente = document.getElementById('nomeCliente').value;
  const detalhesPedido = document.getElementById('detalhesPedido').value;

  // Estrutura o pedido
  const pedido = {
    nomeCliente,
    detalhesPedido,
  };

  // Envia o pedido para o Firebase Realtime Database
  const pedidosRef = ref(database, 'pedidos');
  push(pedidosRef, pedido);

  // Limpa campos do formulário após o envio
  formulario.reset();
});

// Captura o formulário de login
const loginForm = document.getElementById('loginForm');

// Adiciona ouvinte de eventos ao formulário de login
loginForm.addEventListener('submit', fazerLogin);

// Função para fazer login
function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;

  // Faz login no Firebase
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log('Usuário autenticado:', userCredential.user);
      // Oculta a seção de autenticação após o login
      document.getElementById('authSection').style.display = 'none';
      document.getElementById('pedidoForm').style.display = 'block';
    })
    .catch((error) => {
      console.error('Erro no login:', error.message);
    });
}

// Captura o formulário de registro
const registroForm = document.getElementById('registroForm');

// Adiciona ouvinte de eventos ao formulário de registro
registroForm.addEventListener('submit', fazerRegistro);

// Função para fazer registro
function fazerRegistro(event) {
  event.preventDefault();

  const email = document.getElementById('emailRegistro').value;
  const senha = document.getElementById('senhaRegistro').value;

  // Verifica se a senha atende aos requisitos mínimos
  if (senha.length < 6) {
    console.error('Erro no registro: A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  // Cria uma nova conta no Firebase
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log('Nova conta criada:', userCredential.user);
      // Após o registro, você pode automaticamente fazer login, ou pedir para o usuário fazer login manualmente
      // signInWithEmailAndPassword(auth, email, senha);
      // Oculta a seção de autenticação após o registro
      document.getElementById('authSection').style.display = 'none';
    })
    .catch((error) => {
      console.error('Erro no registro:', error.message);
    });
}
