import React, { useEffect, useState } from "react";

import Spinner from "./Spinner";

import SiteAPI from "../vendor/Services"; // site api call services

import openai from "../vendor/Openai"; // openai api

const TranslateCom: React.FC = () => {
  const [allLanguages, setAllLanguages] = useState<any>([]); // holds values of all languages

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
  const [translatedText, setTranslatedText] = useState<string>(""); // holds the translated text

  const [baseLanguage, setBaseLanguage] = useState<string>("");
  const [translatedToLanguage, setTranslatedToLanguage] = useState<string>("");

  const translateLan = async (): Promise<any> => {
    setRequest({ status: true, error: "" });
    setTranslatedText("");


    //texting for empty strings
    if (!baseLanguage) {
      setRequest({ status: false, error: "Please Enter Base Language" });
      return;
    }

    if (!translatedToLanguage) {
      setRequest({
        status: false,
        error: "Please Enter translated To Language",
      });
      return;
    }

    if (!baseText) {
      setRequest({ status: false, error: "Please Enter Base Text" });
      return;
    }
    try {
      const response: any = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: `Translate this into fr:how are you`,
        prompt: `Translate from ${baseLanguage} to ${translatedToLanguage}: ${baseText}`,
        // prompt: `Translate: I am coming from english to igbo`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      if (response.status != 200) {
        setRequest({ status: false, error: "Opps, something went wrong" });
        return;
      }
      setRequest({ status: false, error: "" });

      const translation: string = response.data.choices[0].text.trim();
      setTranslatedText(translation);
      // console.log(translation)
    } catch (error: any) {
      setRequest({
        status: false,
        error: "Cannot perform translation at the moment, try again!",
      });
    }
  };

  useEffect(() => {
    let fetchLan = async () => {
      SiteAPI.getAllCountries()
        .then((response) => {
          if (response.status != 200) {
            //code to run on bad response
            setPageLoading({
              status: false,
              message: "failed",
            });
            return;
          }
          //runs the section on successfull response
          setAllLanguages(response.data); // sets all languages to res received from api call
          setPageLoading({
            status: false,
            message: "success",
          });
        })
        .catch((err) => {
          setPageLoading({
            status: false,
            message: "failed",
          });
        });
      // try {
      //   let response = await fetch('https://api-bdc.net/data/countries?localityLanguage=en&key=bdc_e13fea42ca06486b8db1f7dfe520f7e5',{
      //     method: 'GET',
      //     headers:{
      //       'Content-Type': 'Application/json'
      //     }
      //   })
      // if(response.status != 200){
      //   //code to run on bad response
      //   setPageLoading({
      //     status: false,
      //     message: 'failed'
      //   })
      //   return
      // }
      // //runs the section on successfull response
      // let res = await response.json()
      // setAllLanguages(res) // sets all languages to res received from api call
      // setPageLoading({
      //   status: false,
      //   message: 'success'
      // })
      // } catch (error) {
      // setPageLoading({
      //   status: false,
      //   message: 'failed'
      // })
      // }
    };
    fetchLan();
  }, []);

  return (
    <div className="">
      {pageLoading.status && pageLoading.message == "" && <Spinner />}

      {!pageLoading.status && pageLoading.message == "success" && (
        <div className="shadow-xl mx-auto my-5 p-5">
          <h2 className="w-full p-4 text-center font-bold text-blue-400 text-3xl">
            Language Translation
          </h2>

          <div className="container flex justify-center items-center gap-1 py-5">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 text-2xl">
                Select Base Langauge
              </label>
              <select
                value={baseLanguage}
                onChange={(event) => setBaseLanguage(event.target.value)}
              >
                <option value={""}>Select Langauge</option>
                {allLanguages.map((lan: any, index: any) => (
                  <option key={index} value={lan.isoAlpha2}>
                    {lan.isoName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 text-2xl">
                Select Translated Langauge
              </label>
              <select
                value={translatedToLanguage}
                onChange={(event) =>
                  setTranslatedToLanguage(event.target.value)
                }
              >
                <option value={""}>Select Langauge</option>
                {allLanguages.map((lan: any, index: any) => (
                  <option key={index} value={lan.isoAlpha2}>
                    {lan.isoName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center py-5">
            <div className="w-full flex flex-col">
              <label className="text-gray-700 text-2xl">
                Enter your Text Here
              </label>
              <textarea
                rows={4}
                className="w-full resize-none"
                value={baseText}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBaseText(event.target.value)
                }
              />
            </div>
          </div>

          {translatedText && (
            <div className="flex justify-center items-center py-5">
              <div className="w-full flex flex-col">
                <label className="text-gray-700 text-2xl">
                  Translated Text
                </label>
                <p className="text-slate-700 shadow-xl p-4">
                  The translated text above is:{" "}
                  <strong className="text-black">
                    <br />
                    {translatedText}
                  </strong>
                </p>
              </div>
            </div>
          )}

          {request.error && (
            <div className="text-center">
              <p className="text-red-500">{request.error}</p>
            </div>
          )}

          {request.status ? (
            <Spinner />
          ) : (
            <div className="text-center">
              <button
                className="p-2 my-4 bg-blue-500 text-white rounded"
                onClick={translateLan}
              >
                Translate Language
              </button>
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

export default TranslateCom;
