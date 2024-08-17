import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('logout-btn').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out successfully!');
        window.location.href = 'signin.html';
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
});

document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        timestamp: new Date()
    }).then(() => {
        alert('Post created successfully!');
        loadPosts();
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
});

function loadPosts() {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    getDocs(collection(db, 'posts')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const li = document.createElement('li');
            li.textContent = `${post.title} - ${post.content}`;
            postsList.appendChild(li);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteDoc(doc(db, 'posts', doc.id)).then(() => {
                    alert('Post deleted successfully!');
                    loadPosts();
                }).catch((error) => {
                    alert('Error: ' + error.message);
                });
            });

            li.appendChild(deleteBtn);
        });
    });
}

window.onload = loadPosts;
