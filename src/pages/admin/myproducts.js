import Head from "next/head";
import Link from "next/link";
import AdminLayout from "@/components/layout-admin";
import AdminUploadModal from "@/components/adminuploadmodal";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Mockup from "@/components/mockup";
import { isTokenValid } from "@/utils/JWTVerifier";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import CloseConfirm from "@/components/close-confirm-modal";

export default function MyProducts () {
    const router = useRouter();
    const [mockups, setMockups] = useState(null);
    const [pageNo, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [colors, setColors] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [tokenExists, setTokenExists] = useState(false);
    let isReady = router.isReady;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    }, []);
    useEffect(() => {
      const jwtToken = localStorage.getItem("token")
      if(jwtToken === undefined || !isTokenValid(jwtToken))
        router.push("/admin");
      else
        setTokenExists(true);
      getAllColorsAndSizes();
      getMockups();
    }, []);

  const getMockups = async () => {
    const url = new URLSearchParams({
        pageNo: pageNo,
        pageSize: 5
    })  
    const response = await axios.get(
        "http://localhost:8080/api/mockup/getAllMockups?" + url
    );
    setMockups(response.data.content);
    setPageSize(response.data.totalPages);
  }

  const deleteMockup = async (mockupId) => {
    const response = axios.delete(
      "http://localhost:8080/api/mockup/deleteMockup/" + mockupId, {
        headers : {
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      }
    );
    router.reload();
  }

  const getAllColorsAndSizes = async () => {
    axios.get(
      "http://localhost:8080/api/colorsAndSizes/getColorsAndSizes"
    ).then((response) => {
      setColors(response.data.colors);
      setSizes(response.data.sizes);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const getAvailableSizes = (skuMapping) => {
        var availableSizes = []
        skuMapping.forEach(sku => {
            if(!availableSizes.includes(sku.size.size))
                availableSizes.push(sku.size.size);
        });
        return availableSizes;
  }

  const getAvailableColors = (skuMapping) => {
        var availableColors = []
        skuMapping.forEach(sku => {
            if(!availableColors.includes(sku.color.hexValue))
                availableColors.push(sku.color.hexValue);
        });
        return availableColors;
  }

  const handleSubmit = (data) => {
    createMockup(data);
  }

  const uploadImagesOnline = async (file1, file2) => {
    const imageRef1 = ref(storage, `mockups/${file1.name + v4()}`);
    const imageRef2 = ref(storage, `mockups/${file2.name + v4()}`)
    await uploadBytes(imageRef1, file1);
    await uploadBytes(imageRef2, file2);
    const url1 = await getDownloadURL(imageRef1);
    const url2 = await getDownloadURL(imageRef2);
    return { url1, url2 };
  }

  const createMockup = async (mockup) => {
    console.log(mockup.frontImage + " " + mockup.backImage);
    const {url1,url2} = await uploadImagesOnline(mockup.frontImage, mockup.backImage);
    axios.post(
      "http://localhost:8080/api/mockup/addMockup",
      {
        ...mockup,
        frontImage: url1,
        backImage: url2
      } 
    ).then((response) => {
      getMockups();
    }).catch((err) => {
      console.log(mockup);
      console.log(err);
    })
  }

  useEffect(()=>{
    getMockups();
  }, [pageNo]);

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
        <title>Madrasda | My Products</title>
        </Head>
        
        <AdminLayout>
        <section className="body-font overflow-hidden font-algeria
                            md:ml-32">
        <div className="px-5 my-10 mx-auto">
            <h1 className="text-3xl text-primary 
                           md:ml-20">MOCKUPS </h1>
            <div className="flex flex-wrap justify-center">
            
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-96 flex items-center justify-center m-5 rounded duration-200 ease-in-out">  
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                        <AdminUploadModal
                          colors={colors}
                          sizes={sizes}
                          onSubmit={handleSubmit}
                        />
                        <p className="font-semibold font-base">Upload Mockup</p>
                        <p className="font-light text-gray font-sm">Add them to your product list for vendors</p>
                    </div>
                </div>

                {   mockups &&

                    mockups.map((m) => {
                        return (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
                              <span className="flex justify-end">
                                <CloseConfirm mockup={true} delete={(e) => {if(e) deleteMockup(m.id);}}/>
                              </span>
                              <Mockup 
                                key={m.id}
                                image={m.frontImage}
                                model={m.model}
                                name={m.name}
                                sizes={getAvailableSizes(m.skuMapping)}
                                colors={getAvailableColors(m.skuMapping)}
                              />
                            </div>
                        )
                    })
                }
            </div>
                <div className="flex justify-center mt-32">
                    <button className="bg-[#a51535] hover:bg-[#560b21] text-white font-small py-2 px-4 rounded-l" onClick={
                        () => {
                            setPage(pageNo===0 ? 0 : pageNo-1)
                        }
                    }>
                        Prev
                    </button>
                    <button className="bg-[#a51535] hover:bg-[#560b21] text-white font-small py-2 px-4 rounded-r" onClick={
                        () => {
                            setPage(pageNo===pageSize-1 ? pageNo : pageNo+1)
                        }
                    }>
                        Next
                    </button>
                </div>
        </div>
        </section>
        </AdminLayout>
    </>
  );
}