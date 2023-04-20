import Head from 'next/head'
import VendorLayout from '@/components/layout-vendor'
import Accordion from '@/components/accordian'
import Link from 'next/link'
import Image from 'next/image'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid } from "@/utils/JWTVerifier"

export default function Feedback () {

  
  const [tokenExists, setTokenExists] = useState(false)
  const router = useRouter();
  let isReady = router.isReady;
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      }, 1000);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(inputValue==="")
      return; 
    try {
      const response = await fetch('http://localhost:8080/api/feedback/postFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({ query: inputValue,resolution: false }),
      }).then((res) => {
        console.log(res.data)
         alert("Query Successfully Sent");
         setInputValue('')}) ;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("token")
    if(jwtToken === undefined || !isTokenValid(jwtToken))
      router.push("/vendor");
    else
      setTokenExists(true);
  }, []);
  if(loading && isReady)
  return (<div className='z-50 h-screen w-screen overflow-hidden'>
  <Image src="/loader.gif" width={1920} height={1080}/>
  </div>);
  return (
    <>
    <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <title>Madrasda | Feedback</title>
    </Head>
      {tokenExists &&
    <VendorLayout>
    <main className='md:ml-32 overflow-hidden font-algeria'>
    <div className="mt-20 px-5 md:my-10 mx-auto">
        <div className="md:ml-20 md:mt-10">
          <h1 className="body-font text-primary text-3xl">QUERIES AND FEEDBACK</h1>
        </div>

        <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>
        
        <div className="md:ml-24 lg:ml-32"> 
            <h1 className="title-font font-medium text-2xl pb-8">1.Post your Queries:</h1>            
            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg focus:ring-white">
                        <label for="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-black bg-white focus:ring-white " placeholder="Write a comment..." required onChange={ (e)=> setInputValue(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t ">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg " onClick={handleSubmit}>
                            Post Query
                        </button>
                        
                    </div>
                </div>
              </form>
        </div>

        <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>
        
        <div className="md:ml-24 lg:ml-32"> 
            <h1 className="title-font font-medium text-2xl pb-8">2.FAQ:</h1>
            <Accordion title="What's included in the quoted daily rate?" content="this is content 1" />
            <Accordion title="What's included in the quoted daily rate?" content="this is content 1" />
            <Accordion title="What's included in the quoted daily rate?" content="this is content 1" />
            <Accordion title="What's included in the quoted daily rate?" content="this is content 1" />
            <Accordion title="What's included in the quoted daily rate?" content="this is content 1" />
        </div>


      <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>

      <div className="md:ml-24 lg:ml-32"> 
        <h1 className="title-font font-medium text-2xl pb-8">Admin Contact Details</h1>
        <h2>Whatsapp</h2>
        <h2>Email</h2>
        <h2>Phone Number</h2>
      </div>

      <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>

    </div>
    </main>
    </VendorLayout>}
    </>
  )
}
