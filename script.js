document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let comment = document.getElementById('comment').value;
    let image = document.getElementById('image').files[0];

    if (image) {
        let storageRef = firebase.storage().ref('images/' + image.name);
        storageRef.put(image).then(function(snapshot) {
            storageRef.getDownloadURL().then(function(url) {
                saveComment(username, comment, url);
            });
        });
    } else {
        saveComment(username, comment, null);
    }
});

function saveComment(username, comment, imageUrl) {
    db.collection('comments').add({
        username: username,
        comment: comment,
        imageUrl: imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('commentForm').reset();
        loadComments();
    }).catch(function(error) {
        console.error('Error adding document: ', error);
    });
}

function loadComments() {
    db.collection('comments').orderBy('timestamp', 'desc').onSnapshot(function(snapshot) {
        let postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
        snapshot.forEach(function(doc) {
            let data = doc.data();
            let post = document.createElement('div');
            post.classList.add('post');
            post.innerHTML = `<h3>${data.username}</h3><p>${data.comment}</p>`;
            if (data.imageUrl) {
                post.innerHTML += `<img src="${data.imageUrl}" alt="User image">`;
            }
            postsContainer.appendChild(post);
        });
    });
}

loadComments();
