import React, { useState } from 'react';

const App = () => {
    const [image, setImage] = useState(null)

    const onChange = e => setImage(e.target.files[0])

    const handleSubmit = () => {
        if (!image) return

        const rf = new FileReader();
        rf.readAsDataURL(image);
        rf.onloadend = e => {
            const body = new FormData();
            body.set('key', process.env.REACT_APP_KEY)
            body.append("image", e.target.result.split(",").pop());
            body.append("name", image.name);
            fetch('https://api.imgbb.com/1/upload', {
                method: "POST",
                body
            })
                .then(res => {
                    console.log(res.json().then(console.log));
                    document.querySelector('#file').value = "";
                    setImage(null)
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <input type='file' onChange={onChange} id="file" />
            <button onClick={handleSubmit}>제출</button>
        </>
    )
}

export default App;