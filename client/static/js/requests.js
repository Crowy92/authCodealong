async function getAllPosts(){
    try {
        const options = {
            headers: new Headers({"Authorization": localStorage.getItem('token')})
        }
        const response = await fetch('http://localhost:3000/posts', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }

}