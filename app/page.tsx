'use client'
import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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',  dangerouslyAllowBrowser: true});

export default function Home() {
   const [prompt, setPrompt] = useState('');
   const [imageUrl, setImage] = useState('');
   const [loading, setLoading] = useState(false);

  const apiCall = async()=>{
    setLoading(true);
    try{
      const responce= await openai.images.generate({
        prompt:prompt
      }) 
     const image_url= responce.data[0].url
     if(image_url!=undefined || image_url!=null){
        setImage(image_url)
        setLoading(false);
     }
     console.log(image_url)

    }catch(e){
      console.log(e)
      setLoading(false);
    }
  }

  function handleTextareaChange(e:any) {
    setPrompt(e.target.value);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Middle of the image */}
      <div className="relative md:w-80 md:h-50 mb-30">
        <img
          src= {imageUrl !==''? imageUrl : "imgipanai.jpeg"}  // Replace with your actual image source
          alt="Middle Image"
          className="mx-auto"
        />
      </div>
      {loading?
       <div>Loading .......</div>  
       :null
    }

      {/* Bottom side with text input and ok button */}
      <div className="flex items-center space-x-6">
        <textarea
          name="text" 
          rows={2}
          placeholder="Enter text..."
          className="p-2 mt-5 border border-gray-300 rounded text-blue-400 md:w-[20rem]"
          onChange={handleTextareaChange}
        />
        <button className="px-4 py-2  mt-10 bg-blue-500 text-white rounded" onClick={()=>apiCall()}>OK</button>
      </div>
    </div>
  );
}
