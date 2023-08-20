import { useState,useEffect } from "react";
// import memesData from "../memesData";

const Meme = () => {

    // const [url,setUrl]=useState("http://i.imgflip.com/1bij.jpg");
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });


    const handleChange=(e)=>{
        setMeme(prev=>{
            return {...prev,
                [e.target.name]:e.target.value 
            }
        })
    }

    const [allMeme, setAllMeme] = useState([]);

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(response=>response.json())
        .then(data=>setAllMeme(data.data.memes))
    },[]);


   //// // we can also write the above useEffect function as 

//    useEffect(()=>{
//     async function  fetchData()
//     {
//         const response=await fetch("https://api.imgflip.com/get_memes");
//         const data=await response.json();
//         setAllMeme(data.data.memes);
//     }
//     fetchData();
//    },[])





    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMeme.length);
        const url = allMeme[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    return (
        <main>
            <div className="form">
                <input type="text" className="form--input" placeholder="top-text" name="topText" onChange={handleChange} value={meme.topText} />
                <input type="text" className="form--input" placeholder="bottom-text" name="bottomText" onChange={handleChange} value={meme.bottomText}/>
                <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img className="meme--image" src={meme.randomImage} alt="" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;