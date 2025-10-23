import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// ✅ Use your real Firebase config (same as in index.html)
const firebaseConfig = {
    apiKey: "AIzaSyDFdtbWCk1WQuUpO-_zGZimRxHJYylrsNg",
    authDomain: "academy-7c5e3.firebaseapp.com",
    projectId: "academy-7c5e3",
    storageBucket: "academy-7c5e3.firebasestorage.app",
    messagingSenderId: "456264214675",
    appId: "1:456264214675:web:41baac9e06e23d21474566",
    measurementId: "G-7ZD5VC4Y7F"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginMessage = document.getElementById("loginMessage");
const messagesContainer = document.getElementById("messagesContainer");

// ================== LOGIN ==================
loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginMessage.textContent = "✅ Logged in successfully!";
        loginMessage.style.color = "green";
    } catch (error) {
        loginMessage.textContent = "⚠ Invalid email or password!";
        loginMessage.style.color = "red";
    }
});

// ================== AUTH STATE LISTENER ==================
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        loadMessages();
    } else {
        dashboardSection.style.display = "none";
        loginSection.style.display = "block";
    }
});

// ================== LOGOUT ==================
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
});

// ================== LOAD MESSAGES ==================
async function loadMessages() {
    messagesContainer.innerHTML = "<p>Loading messages...</p>";
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        if (querySnapshot.empty) {
            messagesContainer.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messagesContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const card = document.createElement("div");
            card.classList.add("message-card");
            card.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><em>${new Date(data.timestamp).toLocaleString()}</em></p>
      `;
            messagesContainer.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        messagesContainer.innerHTML = "<p>⚠ Failed to load messages.</p>";
    }
}
