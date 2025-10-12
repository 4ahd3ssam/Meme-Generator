import TrollFace from "../assets/Troll Face.png";

export default function Header() {
  return (
    <header className="py-4 bg-gradient-to-r from-[#A818DA] to-[#711F8D] fixed w-full top-0 left-0 shadow-md z-[999]">
      <div className="container mx-auto px-5 flex gap-4 items-center text-white">
        <div className="size-[40px] flex items-center justify-center">
          <img
            className="w-full block"
            src={TrollFace}
            alt="Troll Face"
          />
        </div>
        <h1 className="font-bold text-[20px]">Meme Generator</h1>
      </div>
    </header>
  );
}
