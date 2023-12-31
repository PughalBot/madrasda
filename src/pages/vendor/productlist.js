import Head from "next/head";
import VendorLayout from "@/components/layout-vendor";
import Image from "next/image";
import ProductTable from "@/components/product-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getRole, isTokenValid} from "@/utils/JWTVerifier";

export default function ProductList() {
  const [tokenExists, setTokenExists] = useState(false);
  const router = useRouter();
  let isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getProductDetails = async () => {
    const response = await axios.get(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/vendor/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const id = response.data.vendor.id;
    const prod = await axios.get(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/vendor/getProductsByVendor/" +
        id
    );
    setProducts(prod.data.content);
    console.log(prod.data.content);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken === undefined || !isTokenValid(jwtToken) || getRole(jwtToken) !== 'ROLE_VENDOR')
      router.push("/vendor");
    else {
      setTokenExists(true);
      getProductDetails();
    }
  }, []);

  
  if(loading && isReady)
  return (<div className='z-50 h-screen w-screen overflow-hidden'>
  <Image src="/loader.gif" width={1920} height={1080} className="object-cover object-center w-full h-full"/>
  </div>);
    return (
        <>
            <Head>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.png" />
            <title>Madrasda | Product List</title>
            </Head>

      {tokenExists && <VendorLayout>
        <main
          className='body-font font-raj overflow-hidden
                                 md:ml-36'>
          <div className='mt-20 px-5 md:my-10 mx-auto'>
            <h1
              className='text-3xl text-primary 
                               md:ml-20 md:mt-10'>
              VIEW PRODUCTS
            </h1>
            <div className='mt-4 md:ml-20'>
              {products && (
                <ProductTable
                  products={products}
                  setProducts={setProducts}
                />
              )}
            </div>
          </div>
        </main>
      </VendorLayout> }
    </>
  );
}
