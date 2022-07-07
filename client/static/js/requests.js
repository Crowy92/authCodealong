async function getAllPosts(){
    try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }

}