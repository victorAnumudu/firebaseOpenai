import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import Spinner from "./Spinner";

import SiteAPI from "../vendor/Services"; // site api call services

import openai from "../vendor/Openai"; // openai api

const ImageGen: React.FC = () => {
  const [allLanguages, setAllLanguages] = useState<any>([]); // holds values of all languages

  const [genImage, setGenImage] = useState<string>('')

  const [pageLoading, setPageLoading] = useState({
    // handles spinner when a page is loading
    status: true,
    message: "",
  });

  const [request, setRequest] = useState({
    // handles spinner when a request is made
    status: false,
    error: "",
  });

  const [baseText, setBaseText] = useState<string>("");

  const generateImg = async (): Promise<any> => {
    setRequest({ status: true, error: "" });

    setGenImage('')

    //texting for empty strings

    if (!baseText) {
      setRequest({ status: false, error: "Please Enter Base Text" });
      return;
    }
    try {
      const response: any = await openai.createImage({
        // model: "text-davinci-003",
        // prompt: `Translate this into fr:how are you`,
        // prompt: `Translate from ${baseLanguage} to ${translatedToLanguage}: ${baseText}`,
        prompt: `image of a baby boy`,
        n: 1,
        size: "1024x1024",
        // temperature: 0.3,
        // max_tokens: 100,
        // top_p: 1.0,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,
      });

      if (response.status != 200) {
        setRequest({ status: false, error: "Opps, something went wrong" });
        return;
      }
      setRequest({ status: false, error: "" });

      const imageUrl: string = response.data.data[0].url;
      setGenImage(imageUrl);
      console.log(imageUrl)
    } catch (error: any) {
      setRequest({
        status: false,
        error: "Cannot perform translation at the moment, try again!",
      });
    }
  };

  useEffect(() => {
    const loading = setTimeout(()=>{
        setPageLoading({
            status: false,
            message: "success",
        });
    }, 1000)
    return ()=>{
        clearTimeout(loading)
    }
  }, []);

  return (
    <div className="">
      {pageLoading.status && pageLoading.message == "" && <Spinner />}

      {!pageLoading.status && pageLoading.message == "success" && (
        <div className="shadow-xl mx-auto my-5 p-5">
          <h2 className="w-full p-4 text-center font-bold text-blue-400 text-3xl">
            Image Generation
          </h2>

          <div className="flex justify-center items-center py-5">
            <div className="w-full flex flex-col">
              <label className="text-gray-700 text-2xl">
                Enter your Image Description
              </label>
              <textarea
                placeholder="e.g: generate a cute baby image"
                rows={4}
                className="w-full resize-none"
                value={baseText}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBaseText(event.target.value)
                }
              />
            </div>
          </div>

          {request.status ? (
            <Spinner />
          ) : (
            <div className="text-center">
              <button
                className="p-2 my-4 bg-blue-500 text-white rounded"
                onClick={generateImg}
              >
                Generate Image
              </button>
            </div>
          )}

          {genImage && (
            <div className="w-full shadow-xl flex-col justify-center items-center p-5 my-5 bg-gray-100">
              <div className="text-center flex flex-col">
                <p className="text-gray-700 text-2xl py-4">
                  Below is the Generated Image:
                </p>
              </div>
              <div className="shadow-xl max-w-[500px] m-auto p-1 my-2">
                  <img src={genImage} alt="AI Generated Image" />
                </div>
            </div>
          )}


          {request.error && (
            <div className="text-center">
              <p className="text-red-500">{request.error}</p>
            </div>
          )}

        </div>
      )}

      {!pageLoading.status && pageLoading.message != "success" && (
        <p className="text-red-500 p-5 m-5">
          Failed to load page, Please try to refresh page
        </p>
      )}
    </div>
  );
};

export default ImageGen;
