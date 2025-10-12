import { useState, useEffect, useRef } from "react";

export default function Generator() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    randomImageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => setAllMemes(res.data.memes));
  }, []);

  function getRandomMemeImage() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * allMemes.length);
    } while (randomIndex === lastIndexRef.current && allMemes.length > 1);
    lastIndexRef.current = randomIndex;
    const url = allMemes[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImageUrl: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleClick() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImageUrl: getRandomMemeImage(),
    }));
  }

  return (
    <main className="pt-[72px] container mx-auto px-5">
      <div className="grid grid-cols-2 gap-6 py-4">
        <div>
          <label
            htmlFor="topText"
            className="block text-[14px] font-[400] mb-2"
          >
            Top Text
          </label>
          <input
            id="topText"
            name="topText"
            value={meme.topText}
            placeholder="One does not simply"
            onChange={handleChange}
            className="w-full block border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-[14px] placeholder:text-gray-600 text-gray-600"
            type="text"
          />
        </div>
        <div>
          <label
            htmlFor="bottomText"
            className="block text-[14px] font-[400] mb-2"
          >
            Bottom Text
          </label>
          <input
            type="text"
            id="bottomText"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            placeholder="Walk into Mordor"
            className="w-full block border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-[14px] placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <button
          onClick={handleClick}
          className="col-span-2 bg-gradient-to-r from-[#A818DA] to-[#711F8D] w-full rounded-md px-3 py-2 text-center text-white hover:cursor-pointer"
        >
          Get a new meme image 🖼
        </button>
      </div>

      <div className="relative">
        <img src={meme.randomImageUrl} className="w-full block" />
        <span className="block absolute top-10 w-full text-center text-[2rem] text-white tracking-[2px] uppercase [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000] font-[800]">
          {meme.topText}
        </span>
        <span className="block absolute bottom-10 w-full text-center text-[2rem] text-white tracking-[2px] uppercase [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000] font-[800]">
          {meme.bottomText}
        </span>
      </div>
    </main>
  );
}
