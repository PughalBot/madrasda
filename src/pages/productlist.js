import Image from "next/image";
import Head from "next/head";
import ClientLayout from "@/components/layout-client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductTile from "@/pages/ProductTile";
export default function ProductList () {

  const [pageData, setPageData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  let isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      }, 1000);
  }, []);
  // useEffect(() =>{
  //   const fetchPage = async () => {
  //     const res=await axios.get("http://localhost:8080/api/client/allProducts?pageNo=" + pageNo + "&pageSize=" + pageSize);
  //     setPageData(res.data);
  //   }
  //   fetchPage();
  // },[]);

  if(loading && isReady)
  return (<div className='z-50 h-screen w-screen overflow-hidden'>
  <Image src="/loader.gif" width={1920} height={1080}/>
  </div>);
  return (
    <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.png" />
      <title>Madrasda | Product List</title>
    </Head>
    
    <ClientLayout>
    <section className="body-font font-algeria">
      <div className="px-5 py-24 mx-auto">
      <h1 className="text-3xl text-primary md:ml-10 md:mt-4">PRODUCT LIST</h1>
        <div className="flex flex-wrap justify-center">
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
        </div>
        <br/>
        <div className="flex justify-center mt-8"> 
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <a href="#" className="px-3 py-2 ml-0 leading-tight text-primary bg-white border border-primary rounded-l-lg hover:bg-primary hover:text-white">Previous</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">2</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary border border-primary bg-white hover:bg-primary hover:text-white">3</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">6</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">7</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">8</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">9</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">10</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-primary bg-white border border-primary rounded-r-lg hover:bg-primary hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    </ClientLayout>
    </>
  );
}
