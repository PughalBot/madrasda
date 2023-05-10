import Head from "next/head";
import AdminLayout from "@/components/layout-admin";
import AdminUploadModal from "@/components/adminuploadmodal";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import AdminMockup from "@/components/AdminMockup";
import {storage} from "../../firebaseConfig";
import {getRole, isTokenValid} from "@/utils/JWTVerifier";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CloseConfirm from "@/components/close-confirm-modal";
import { uuidv4 } from "@firebase/util";
import { v4 } from "uuid";

export default function MyProducts() {
  const router = useRouter();
  const [mockups, setMockups] = useState(null);
  const [pageNo, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  let isReady = router.isReady;
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (
      jwtToken === undefined ||
      !isTokenValid(jwtToken) ||
      getRole(jwtToken) !== "ROLE_ADMIN"
    )
      router.push("/admin");
    else setTokenExists(true);
    getAllColorsAndSizes();
    getMockups();
  }, []);

  const getMockups = async () => {
    const url = new URLSearchParams({
      pageNo: pageNo,
      pageSize: 5,
    });
    const response = await axios.get(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/mockup/getAllMockups?" +
        url
    );
    setMockups(response.data.content);
    console.log(response.data.content);
    setPageSize(response.data.totalPages);
  };

  const deleteMockup = async (mockupId) => {
    const response = axios.delete(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/mockup/deleteMockup/" +
        mockupId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    router.reload();
  };

  const getAllColorsAndSizes = async () => {
    axios
      .get(
        "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/colorsAndSizes/getColorsAndSizes"
      )
      .then((response) => {
        setColors(response.data.colors);
        setSizes(response.data.sizes);
      })
      .catch((err) => {
        console.log(err);
      });
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
      if (!availableColors.includes(sku.color.hexValue))
        availableColors.push(sku.color.hexValue);
    });
    return availableColors;
  };

  const handleSubmit = (data) => {
    createMockup(data);
  };

  const uploadBlob = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const imageRef = ref(storage, `admin-mockups/${new Date().getTime()}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(imageRef, blob, metadata);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const createMockup = async (mockup) => {
    const uploadPromises = mockup.images.map(async (image) => {
      const url = await uploadBlob(image.image);
      return { colorId: image.colorId, image: url };
    });
    const uploadedImages = await Promise.all(uploadPromises);
    mockup.images = uploadedImages;
    axios.post(
        "http://localhost:8080/api/mockup/addMockup", mockup
    ).then((response) => {
        getMockups();
    }).catch((err) => {
        console.log(err);
    })
  };

  useEffect(() => {
    getMockups();
  }, [pageNo]);
  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
        <title>Madrasda | Mockups</title>
      </Head>
      {tokenExists && (
        <AdminLayout>
          <section
            className='body-font overflow-hidden font-quest
                            md:ml-32'>
            <div className='mt-20 px-5 md:my-10 mx-auto'>
              <h1
                className='text-3xl text-primary
                           md:ml-20 mx-a'>
                MOCKUPS{" "}
              </h1>

              <div className='flex flex-wrap justify-start md:ml-20'>
                <div className='lg:w-1/4 md:w-3/4 p-4 w-full h-96 flex items-center justify-center m-5 rounded duration-200 ease-in-out'>
                  <div className='flex flex-col items-center justify-center cursor-pointer'>
                    <AdminUploadModal
                      colors={colors}
                      sizes={sizes}
                      onSubmit={handleSubmit}
                    />
                    <p className='font-semibold font-base pt-2'>
                      Upload Mockup
                    </p>
                    <p className='font-light text-bg font-sm'>
                      Add them to your product list for vendors
                    </p>
                  </div>
                </div>

                {mockups &&
                  mockups.map((m, i) => {
                    console.log(m.images);
                    return (
                      <div
                        key={uuidv4()}
                        className='lg:w-1/4 md:w-3/4 p-4 w-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out'>
                        <span key={uuidv4()} className='flex'>
                          <CloseConfirm
                            mockup={true}
                            delete={(e) => {
                              if (e) deleteMockup(m.id);
                            }}
                          />
                        </span>
                        <AdminMockup
                          donwload={false}
                          key={m.id}
                          image={m.frontImage || m.backImage || m.images[0]}
                          model={m.model}
                          name={m.name}
                          sizes={getAvailableSizes(m.skuMapping)}
                          colors={getAvailableColors(m.skuMapping)}
                          basePrice={m.basePrice}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className='flex justify-center mt-32'>
                <button
                  className='bg-[#fab337] hover:bg-[#ffa200] text-white font-small py-2 px-5 rounded mr-6'
                  onClick={() => {
                    setPage(pageNo === 0 ? 0 : pageNo - 1);
                  }}>
                  Prev
                </button>
                <button
                  className='bg-[#fab337] hover:bg-[#ffa200] text-white font-small py-2 px-5 rounded ml-6'
                  onClick={() => {
                    setPage(pageNo === pageSize - 1 ? pageNo : pageNo + 1);
                  }}>
                  Next
                </button>
              </div>
            </div>
          </section>
        </AdminLayout>
      )}
    </>
  );
}
