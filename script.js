document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let comment = document.getElementById('comment').value;
    let image = document.getElementById('image').files[0];

    let post = document.createElement('div');
    post.classList.add('post');

    let postContent = `<h3>${username}</h3><p>${comment}</p>`;
    if (image) {
        let reader = new FileReader();
        reader.onload = function(e) {
            post.innerHTML = postContent + `<img src="${e.target.result}" alt="User image">`;
            document.getElementById('postsContainer').appendChild(post);
        }
        reader.readAsDataURL(image);
    } else {
        post.innerHTML = postContent;
        document.getElementById('postsContainer').appendChild(post);
    }

    document.getElementById('commentForm').reset();
});
