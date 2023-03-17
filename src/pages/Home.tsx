import React, { useEffect, useState } from "react";


import TranslateCom from "../component/TranslateCom"; // for translation component
import ImageGen from "../component/ImageGen";
import Spinner from "../component/Spinner";

const Home: React.FC = () => {

  const [pageLoading, setPageLoading] = useState({
    // handles spinner when a page is loading
    status: true,
    message: "",
  });

  const [queryAction, setQueryAction] = useState<string>('translate')

  useEffect(() => {
    const loading = setTimeout(()=>{
        setPageLoading({
            status: false,
            message: "success",
        });
    }, 500)
    return ()=>{
        clearTimeout(loading)
    }
  }, []);

  return (
    <div className="">
    {pageLoading.status && pageLoading.message == "" && <Spinner />}

    {!pageLoading.status && pageLoading.message == "success" && 
      <div className="">
        <div className="w-full p-5 sticky top-[70px] bg-white">
          <label className="font-bold text-xl my-1 text-blue-500">Please Select Action to Perform</label>
          <select className='w-full' value={queryAction} onChange={(e)=>setQueryAction(e.target.value)}>
            <option value={''}>Select Option</option>
            <option value='translate'>Translate Language</option>
            <option value='generate image'>Image Generation</option>
          </select>
        </div>
        {!queryAction && 
          <div className="p-5 h-[600px] text-center font-bold text-3xl my-4 text-red-500">Opps! You've not selected an action yet!</div>
        }

        { queryAction == 'translate' && 
          <TranslateCom />
        }

        { queryAction == 'generate image' && 
          <ImageGen />
        }

      </div>
    }
    </div>
  );
};

export default Home;
