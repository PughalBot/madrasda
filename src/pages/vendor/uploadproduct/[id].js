import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import VendorLayout from '@/components/layout-vendor'
import Image from "next/image"
import axios from "axios";
import {useRouter} from "next/router";
import {isTokenValid} from "@/utils/JWTVerifier"
import {storage} from "../../.././firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {uuidv4} from "@firebase/util";
import {TextField} from '@mui/material'

export default function ViewProd() {

    const [tokenExists, setTokenExists] = useState(false);
    const router = useRouter();
    let isReady = router.isReady;
    const {id} = router.query;
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [basePrice, setBasePrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [profit, setProfit] = useState(0);
    const [audience, setAudience] = useState("");
    const [tax, setTax] = useState(0);
    const [currenId, setCurId] = useState(null);
    const [publishStatus, setPublishStatus] = useState(true);
    const [productImages, setProductImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [template, setTemplate] = useState(null);

    const uploadProduct = async () => {
        if (!template && productImages.length === 0) return;

        var colorId = [];
        if (selectedColors) {
            selectedColors.forEach((color) => {
                colorId.push(color.id);
            });
        }

        const data = {
            name: name,
            audience: audience,
            description: desc,
            basePrice: Number(basePrice),
            shipping: Number(shipping),
            discount: Number(discount),
            total: Number(total),
            profit: Number(profit),
            tax: Number(tax),
            publishStatus: publishStatus,
            vendor: {
                id: template.vendorId,
            },
            mockupId: template.mockup.id,
            colors: colorId,
        };

        const uploadPromises = productImages.map(async (image) => {
            const url = await uploadBlob(image.imgUrl);
            return {color: image.color, imageUrl: url};
        });
        const uploadedImages = await Promise.all(uploadPromises);
        data.productImages = uploadedImages

        if (template.frontDesignPlacement) {
            data.frontDesignPlacement = JSON.stringify(template.frontDesignPlacement);
            data.frontDesignUrl = template.frontDesignImage;
        } else {
            data.backDesignPlacement = JSON.stringify(template.backDesignPlacement);
            data.backDesignUrl = template.backDesignImage;
        }

        if (data.productImages[0].imgUrl !== null) {
            const response = await axios.post(
                "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/product/createProduct",
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        }
        const tempResponse = await axios.delete(
            'https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/templates/deleteTemplate/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        router.push('/vendor/templatelist');
    };


    const uploadBlob = async (blobUrl) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const imageRef = ref(storage, `products/${new Date().getTime()}`);
        const metadata = {
            contentType: 'image/jpeg'
        };
        await uploadBytes(imageRef, blob, metadata);
        const url = await getDownloadURL(imageRef);
        return url;
    }

    useEffect(() => {
        setProfit(0);
        setLoading(true);
    }, []);

    useEffect(() => {
        if (isReady)
            getTemplateDetails();
    }, [isReady]);

    useEffect(() => {
        setProfit(total - basePrice - (discount * 0.01 * total));

    }, [basePrice, total, discount])

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        if (jwtToken === undefined || !isTokenValid(jwtToken))
            router.push("/vendor");
        else {
            setTokenExists(true);
        }
    }, []);

    const getDataUrlFromFile = (file) => {
        console.log(file);
        return URL.createObjectURL(file);
    };

    useEffect(() => {
        if (productImages.length > 0) {
        }
    }, [productImages]);

    const handleRemove = (image) => {
        if (image)
            setProductImages(productImages => {
                const images = productImages.filter(item => item.imgUrl !== image.imgUrl);
                console.log(images);
                return images;
            });
    }

    const getTemplateDetails = async () => {
        const response = await axios.get(
            `https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/templates/getTemplate/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        );
        setLoading(false)
        setTemplate(response.data);
        setSizes(getAvailableSizes(response.data.mockup.skuMapping));
        setColors(getAvailableColors(response.data.mockup.skuMapping));
        setBasePrice(response.data.mockup.basePrice);
    }

    const handleColorSelection = (selectedColor) => {
      const index = selectedColors.findIndex(
        (color) => color.id === selectedColor.id
      );
      if (index !== -1) {
        setSelectedColors(
          selectedColors.filter((color) => color.id !== selectedColor.id)
        );
      } else {
        setSelectedColors([...selectedColors, selectedColor]);
      }
    };

    const getAvailableSizes = (skuMapping) => {
      var availableSizes = [];
      skuMapping.forEach((sku) => {
        if (!availableSizes.includes(sku.size.size))
          availableSizes.push(sku.size.size);
      });
      return availableSizes;
    };

    const getAvailableColors = (skuMapping) => {
      var availableColors = [];
      skuMapping.forEach((sku) => {
        if (
          availableColors.findIndex((item) => item.id === sku.color.id) === -1
        ) {
          availableColors.push({
            id: sku.color.id,
            hexValue: sku.color.hexValue,
            color: sku.color.color,
          });
        }
      });
      return availableColors;
    };

    if (loading && isReady && template)
      return (
        <div className='z-50 h-screen w-screen overflow-hidden'>
          <Image
            src='/loader.gif'
            width={1920}
            height={1080}
            className='object-cover object-center w-full h-full'
          />
        </div>
      );

    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/logo.png' />
          <title>Madrasda</title>
        </Head>

        {tokenExists && <VendorLayout>
          <main
            className='overflow-hidden font-algeria
                    md:ml-36'>
            <div className='mt-20 px-5 md:my-10 mx-auto'>
              <div className='md:ml-20 md:mt-10'>
                <h1 className='body-font text-primary text-3xl'>
                  Edit Product Info
                </h1>
              </div>
              <hr
                className='h-px md:ml-20 my-6 bg-black border-1 dark:bg-primary
                       lg:mr-12'></hr>
              <div className='md:ml-20 lg:ml-32'>
                <h1 className='title-font font-medium text-xl pb-3'>Title</h1>
                <div
                  className='mb-6 ml-2 mt-1
                            lg:mr-96'>
                  <input
                    type='text'
                    className='bg-white border border-[#D9D9D9] text-sm rounded-lg focus:ring-primary focus:border-[#D9D9D9] block w-full p-2.5'
                    placeholder='Enter the title of your product'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <h1 className='title-font font-medium text-xl pb-3'>
                  category
                </h1>
                <div
                  className='mb-6 ml-2 mt-1
                            lg:mr-96'>
                  <input
                    type='text'
                    className='bg-white border border-[#D9D9D9] text-sm rounded-lg focus:ring-primary focus:border-[#D9D9D9] block w-full p-2.5'
                    placeholder='Enter the target of your product'
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>
                <div className='ml-2'>
                  <h2 className='title-font font-medium text-xl mb-6'>
                    Description
                  </h2>
                  <textarea
                    id='comment'
                    rows='4'
                    className='bg-white border border-[#D9D9D9] text-sm rounded-lg focus:ring-primary focus:border-[#D9D9D9] block w-full p-2.5'
                    placeholder='Enter the description for your product'
                    required
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                {template && (
                  <div className='mb-6 ml-2'>
                    <h2 className='title-font font-medium text-xl mb-6'>
                      {template.frontDesignPlacement ? "Front" : "Back"} Design
                    </h2>
                    <div className='flex flec col ml-12 '>
                      {template && (
                        <img
                          className='w-36 rounded-lg'
                          src={
                            template.frontDesignImage ||
                            template.backDesignImage
                          }
                          alt='picture'></img>
                      )}
                    </div>
                    <h2 className='title-font font-medium text-xl mb-6'>
                      {template.frontDesignPlacement
                        ? "Front Design"
                        : "Back Design"}{" "}
                      Placement
                    </h2>
                    <div className='flex text-xl text-primary'>
                      {template.frontDesignPlacement ||
                        template.backDesignPlacement}
                    </div>
                  </div>
                )}
              </div>
              <hr
                className='h-px my-6 bg-black border-1 dark:bg-primary
                       md:ml-20 
                       lg:mr-12'></hr>
              <div className='md:ml-20 lg:ml-32'>
                <h1 className='title-font font-medium text-2xl pb-8'>
                  Product Details
                </h1>
                <div>
                  <h1>Choose Colors</h1>
                  <div className='flex flex-wrap'>
                    {colors &&
                      colors.map((color) => {
                        return (
                          <div
                            className='flex flex-col my-4 items-center px-2'
                            key={color.id}>
                            <button
                              className={`border-2 border-gray rounded-full w-10 h-10 focus:outline-none ${
                                selectedColors.findIndex(
                                  (item) => item.id === color.id
                                ) !== -1
                                  ? "border-primary border-[3px]"
                                  : ""
                              }`}
                              onClick={() => {
                                handleColorSelection({
                                  id: color.id,
                                  hexValue: color.hexValue,
                                });
                              }}
                              style={{
                                backgroundColor: color.hexValue,
                              }}></button>
                            <p className='text-[10px] mx-auto'>{color.color}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <h1>Select Your Color Wise Product Images</h1>
                <div className='items-center mt-3 mb-3'>
                  <div className='flex flex-wrap'>
                    {selectedColors &&
                      selectedColors.map((color) => {
                        return (
                          <div
                            className='my-4 space-x-5 items-center px-2'
                            key={color.id}>
                            <button
                              className={`border-2 border-gray rounded-full w-10 h-10 focus:outline-none ${
                                currenId === color.id
                                  ? "border-primary border-[3px]"
                                  : ""
                              }`}
                              onClick={() => {
                                setCurId(color.id);
                              }}
                              style={{
                                backgroundColor: color.hexValue,
                              }}></button>
                            <p className='text-[10px] mx-auto'>{color.color}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div>
                  {currenId && (
                    <div className='ml-2'>
                      <label
                        htmlFor='dropzone-file'
                        className='flex flex-col items-center justify-center w-full px-3 h-auto border-2 border-[#D9D9D9] border-dashed rounded-lg cursor-pointer bg-white'>
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <svg
                            aria-hidden='true'
                            className='w-10 h-10 mb-3 text-black-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
                          </svg>
                          <p className='mb-2 text-sm text-black'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>
                          </p>
                        </div>
                        <input
                          id='dropzone-file'
                          type='file'
                          accept='image/jpeg'
                          className='hidden'
                          onChange={(e) => {
                            if (
                              e.target.files[0] !== null &&
                              e.target.files[0] !== undefined
                            )
                              setProductImages((productImages) => [
                                ...productImages,
                                {
                                  color: currenId,
                                  imgUrl: getDataUrlFromFile(e.target.files[0]),
                                },
                              ]);
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className='mt-6'>Available Sizes</div>
                <div className='flex justify-start items-center mt-3 mb-3 space-x-4'>
                  {sizes &&
                    sizes.map((item) => {
                      return (
                        <div key={uuidv4()} className='relative'>
                          <button
                            className='w-20 text-sm justify-center shadow-md  shadow-gray hover:shadow-gray
                                                    transition-colors duration-150 shadow-grey transition-shadow
                                                    p-3 rounded-lg hover:shadow-lg bg-primary text-white'>
                            {item}
                          </button>
                        </div>
                      );
                    })}
                </div>
                {/* Image Preview */}
                {productImages && currenId && (
                  <div className='space-x-3 justify-center flex flex-wrap'>
                    {productImages.map((image) => {
                      if (image.color === currenId) {
                        return (
                          <div
                            key={uuidv4()}
                            onClick={() => handleRemove(image)}>
                            <span className='cursor-pointer'> X </span>
                            <img className='h-28 w-h-28' src={image.imgUrl} />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
              <hr
                className='h-px my-6 bg-black border-1 dark:bg-primary
                       md:ml-20 
                       lg:mr-12'></hr>
              <div
                className='md:ml-20
                        lg:ml-32'>
                <h1 className='title-font font-medium text-2xl pb-8'>
                  Payment Details
                </h1>
                <div
                  className='grid gap-3 ml-2 mb-2 md:grid-cols-2 '
                  style={{ width: "40rem" }}>
                  <div>
                    <TextField
                      type='numeric'
                      className={"text-2xl w-72"}
                      label={"Maximum retail Price (₹)"}
                      placeholder='₹'
                      required
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      type='numeric'
                      className='text-2xl w-72 text-bold text-black'
                      placeholder='₹'
                      disabled
                      value={basePrice}
                      label={"Base Price (₹)"}
                    />
                  </div>
                  <div>
                    <TextField
                      type='numeric'
                      className='text-2xl w-72'
                      label={"Discount / Offer %"}
                      placeholder='%'
                      required
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>

                  <div>
                    <TextField
                      type='numeric'
                      label={"Profit Earned (₹)"}
                      className='text-2xl w-72'
                      value={profit}
                      readOnly
                      error={profit < 0}
                      color={profit > 0 ? "success" : ""}
                      focused
                    />
                  </div>
                </div>
              </div>
              <div className=' mt-14 flex justify-center '>
                <button
                  type='button'
                  onClick={() => uploadProduct()}
                  className='text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-4
         focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  Upload Product
                </button>
              </div>
            </div>
          </main>
        </VendorLayout> }
      </>
    );
}
