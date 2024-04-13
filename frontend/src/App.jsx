import { useState } from "react";
import { MdGTranslate } from "react-icons/md";
import axios from "axios";

const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post("http://localhost:5000/translate", {
      text,
      targetLanguage,
    });
    return response.data.translation;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Failed to translate text");
  }
};

export default function App() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const handleTranslate = async () => {
    try {
      const translation = await translateText(originalText, targetLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <main className="bg-[url('/hero_img.jpg')] h-screen bg-cover bg-center relative flex flex-col justify-center items-center gap-8 lg:flex-row">
      <img
        src="./logo.svg"
        alt="logo"
        className="absolute top-16 lg:top-20 left-[50%] translate-x-[-50%] "
      />
      <div>
        <div className=" h-fit md:h-[300px] w-[500px] bg-[rgba(0,0,0,.7)] overflow-hidden rounded-lg p-4">
          <div className="navbar bg-[rgba(0,0,0,0)]">
            <div className="flex-1">
              <a className="btn btn-ghost text-lg">Detect Language</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a onClick={() => setTargetLanguage("en")}>English</a>
                </li>
                <li>
                  <a onClick={() => setTargetLanguage("fr")}>French</a>
                </li>
                <li>
                  <a onClick={() => setTargetLanguage("bn")}>Bangla</a>
                </li>
                <li>
                  <a onClick={() => setTargetLanguage("hi")}>Hindi</a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="bg-[rgba(0,0,0,.1)]" />
          <div>
            <textarea
              name=""
              id=""
              cols="60"
              rows="5"
              placeholder="Enter Your Text here"
              className="border-none outline-none bg-[rgba(0,0,0,0)] p-2"
              onChange={(e) => setOriginalText(e.target.value)}
            ></textarea>
            <div className="grid place-items-end">
              <button
                className="btn bg-sky-700 border-none text-gray-50"
                onClick={handleTranslate}
              >
                <MdGTranslate /> Translate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="h-fit md:h-[300px] w-[500px] bg-[rgba(0,0,0,.7)] overflow-hidden rounded-lg md:p-4">
          <div>
            <textarea
              name=""
              id=""
              cols="60"
              rows="5"
              placeholder="Your Transleted Text here"
              className="border-none outline-none bg-[rgba(0,0,0,0)] p-2"
              value={translatedText}
              onChange={() => ""}
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}
