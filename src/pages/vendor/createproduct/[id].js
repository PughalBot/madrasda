import Head from 'next/head';
import Image from 'next/image';
import VendorLayout from '@/components/layout-vendor';
import UploadModal from '@/components/upload-modal';
import Link from 'next/link';
import axios from "axios";
import { fabric } from 'fabric';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid } from "@/utils/JWTVerifier";
import { storage } from "../../.././firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreateTemplate(props) {
  const [design, setDesign] = useState({});
  const [tokenExists, setTokenExists] = useState(false);
  const [template, setTemplateImage] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [position, setPosition] = useState("");
  const [front, setFront] = useState(true);
  const router = useRouter();
  const {id, audience, email} = router.query;
  const isReady = router.isReady;
  const [details, setDetails] = useState(null);
  const canvasWidth = 600;
  const canvasHeight = 650;

  useEffect(() => {
    if(isReady)
        getMockupDetails();
  }, [isReady]);

  useEffect(() => {
    if(!document.querySelector("canvas")){
        const canvasElement = document.createElement("canvas");
        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;
        canvasElement.style.marginLeft = "auto";
        canvasElement.style.marginRight = "auto";
        const container = document.querySelector(".canvas-container");
        if(!container)
            return;
        const firstChild = container.firstChild;
        container.insertBefore(canvasElement, firstChild);
        const canvas = new fabric.Canvas(canvasElement);
        setCanvas(canvas);
    }
  })

  useEffect(() => {
    const jwtToken = localStorage.getItem("token")
    if(jwtToken === undefined || !isTokenValid(jwtToken))
      router.push("/vendor");
    else
      setTokenExists(true);
  }, []);

  useEffect(() => {
      if (!canvas) {
        return;
      }
      canvas.clear();
      if(details !== null) {
        fetch(front ? details.frontImage : details.backImage)
        .then(result => result.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          fabric.Image.fromURL(url, (img) => {
          img.set(
            {
              crossOrigin: 'anonymous'
            }
          )
          img.scaleToHeight(canvasHeight);
          img.set({
            lockScalingX: true,
            lockScalingY : true,
            lockMovementX : true,
            lockMovementY : true,
            selectable : false
        })
        canvas.add(img);
        });
        if(design !== null){
          fetch(design.imgUrl)
          .then(result => result.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            fabric.Image.fromURL(
              url,
              (designImg) => {
                designImg.scaleToHeight(50);
                designImg.set({
                  left: 10,
                  top: 10,
                });
                canvas.add(designImg);
              }
            );
          })
        }
        canvas.renderAll();
        });
      }
    }, [canvas, details, front, design]);

  const getMockupDetails = async () => {
    const response = await axios.get(
        "http://localhost:8080/api/mockup/getMockup/" + id
    );
    setDetails(response.data);
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
            if(availableColors.findIndex((item) => item.id === sku.color.id) === -1){
                availableColors.push({id : sku.color.id, hexValue : sku.color.hexValue});
            }
        });
        return availableColors;
  }

  const saveImage = async () => {
      const data = await canvas.toDataURL({
        format: "jpeg"
      });
      const byteCharacters = atob(data.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      uploadBlob(blob)
  };

  const uploadBlob = async (blob) => {
    console.log(blob);
    const imageRef = ref(storage, `templates/${new Date().getTime()}`);
    await uploadBytes(imageRef, blob);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    setTemplateImage(url);
    saveTemplate(url);
  }

  const saveTemplate = async (image) => {
    const data = {
      mockup : {
        id : id
      }
    };
    if(front){
      data.frontDesign = {
        id : design.id
      };
      data.frontDesignImage = image;
      data.frontDesignPlacement = position;
    }else{
      data.backDesign = {
        id : design.id
      };
      data.backDesignImage = image;
      data.backDesignPlacement = position;
    }
    const response = await axios.post(
      "http://localhost:8080/api/templates/saveTemplate",
       data , {
        headers : {
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      }
    ).catch((err) => {
      console.log(err);
    });
    alert("Successfully Uploaded");
    console.log(response.data);
    router.push("/vendor/templatelist");
  }

  if(!isReady)
    return <div>Loading...</div>

  return (
    <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.png" />
      <title>Madrasda | Create Template</title>
    </Head>

    <VendorLayout>
    <section className="body-font font-algeria overflow-hidden
                        md:ml-56
                        lg:ml-36">
    <div className="px-5 my-10 mx-auto">
    <h1 className="text-3xl text-primary lg:ml-20 md:mt-10">CREATE TEMPLATE</h1>
      <div className="px-5 py-10 mx-auto flex justify-center">
        <div className="lg:w-5/6 flex justify-start flex-col
                        lg:flex-row">
          <div className='flex flex-col items-center bg-[#F0F0F0] p-4'>
            <div className='flex mb-8'>
              <button className={`text-xs rounded-full border-2 px-3 py-2 mx-1 border-gray ${position==="Center" ? 'bg-primary text-white' : 'bg-off-white'}`} value="Center" onClick={(e) => setPosition(e.target.value)}>Center</button>
              <button className={`text-xs rounded-full border-2 px-3 py-2 mx-1 border-gray ${position==="Top Left Corner" ? 'bg-primary text-white' : 'bg-off-white'}`} value="Top Left Corner" onClick={(e) => setPosition(e.target.value)}>Top Left Corner</button>
              <button className={`text-xs rounded-full border-2 px-3 py-2 mx-1 border-gray ${position==="Bottom Left Corner" ? 'bg-primary text-white' : 'bg-off-white'}`} value="Bottom Left Corner" onClick={(e) => setPosition(e.target.value)}>Bottom Left Corner</button>
              <button className={`text-xs rounded-full border-2 px-3 py-2 mx-1 border-gray ${position==="Top Right Corner" ? 'bg-primary text-white' : 'bg-off-white'}`} value="Top Right Corner" onClick={(e) => setPosition(e.target.value)}>Top Right Corner</button>
              <button className={`text-xs rounded-full border-2 px-3 py-2 mx-1 border-gray ${position==="Bottom Right Corner" ? 'bg-primary text-white' : 'bg-off-white'}`} value="Bottom Right Corner" onClick={(e) => setPosition(e.target.value)}>Bottom Right Corner</button>
            </div>
            <div className="canvas-container"></div>
          </div>
          <div className="w-full mt-6
                          lg:pl-10 lg:py-6 lg:mt-0 lg:w-1/2">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {details && details.name}
            </h1>
            <h1 className="text-primary capitalize text-2xl title-font font-medium mb-1">
              {audience}
            </h1>
            <UploadModal 
              chooseDesign={(e) => setDesign(e)}
            />
            <h1>
              {
                design && design.name
              }
            </h1>

            <div className='mt-6'>
            <p className='mb-2'>Select Side for Design</p>
            <div className='flex flex-row'>
              <button className={`text-sm rounded-full border-2 border-bg px-7 py-2 mr-2 ${front ? "bg-primary text-white" : ""}`} onClick={() => setFront(true)}>Front</button>
              <button className={`text-sm rounded-full border-2 border-bg px-7 py-2 mr-2 ${!front ? "bg-primary text-white" : ""}`} onClick={() => setFront(false)}>Back</button>
            </div>
            </div>

            <div className="mt-6">Available Colors</div>
            <div className="flex justify-start items-center mt-3 mb-3">
                <div className="relative">
                    <div className="flex flex-wrap space-x-1">
                        {
                        details && 
                        getAvailableColors(details.skuMapping).map((color) => {
                            return (
                                <div className='flex flex-col justify-center items-center px-2' key={color.id}>
                                  <button
                                    className={`border-2 border-gray rounded-full w-10 h-10 focus:outline-non`}
                                    style={{backgroundColor : color.hexValue}}
                                  ></button>
                                  <p className='text-[10px] mx-auto'>{color.color}</p>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
              </div>
              <div className="mt-6">Available Sizes</div>
              <div className="flex flex-wrap justify-start items-center mt-3 mb-3 ml-2">
                <div className="relative">
                  {details &&
                    getAvailableSizes(details.skuMapping).map((size) => {
                      return (
                        <button
                          key={size}
                          className={`w-14 text-sm justify-center mr-5 transition-colors duration-150 border rounded-lg focus:shadow-outline text-white border-gray bg-primary hover:text-white hover:border-primary'}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                </div>
              </div>
              <br></br>
            <div className="flex">
              <button className= "flex text-white bg-[#a5153F] border-0 py-3 px-10 focus:outline-none hover:bg-primary rounded-full" onClick={() => saveImage()}>
                Save Template
              </button>
            </div>
            <br></br>
          </div>
        </div>
      </div>
      </div>
    </section>
    </VendorLayout>
    </>
  );
}
