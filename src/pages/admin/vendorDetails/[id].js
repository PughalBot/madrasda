import Head from "next/head";
import LineGraph from "@/components/linegraph";
import Image from "next/image";
import AdminLayout from "@/components/layout-admin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isTokenValid, getRole } from "@/utils/JWTVerifier";
import axios from "axios";

export default function VendorDetails() {
  const [tokenExists, setTokenExists] = useState(false);
  const router = useRouter();
  let isReady = router.isReady;
  const { id } = router.query;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      }, 1000);
  }, []);

  const getVendorDetails = async () => {
    axios
      .get("https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/vendor/vendorDetails/" + id)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(isReady)
        getVendorDetails();
  }, [isReady]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token")

      if (jwtToken === undefined || !isTokenValid(jwtToken) || getRole(jwtToken) !== 'ROLE_ADMIN')
          router.push("/admin");
      else
          setTokenExists(true);
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
            <title>Madrasda | Vendor Details</title>
            </Head>

            {tokenExists && <AdminLayout>
                { details &&
                <main className="body-font overflow-hidden font-algeria
                                md:ml-32">
                <div className="px-5 my-10 mx-auto">
                <h1 className="text-3xl text-primary 
                               md:ml-20 md:mt-30">MY VENDORS</h1>
                
                <div className="md:ml-24 mt-10 flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <Image className="rounded-3xl" src={details.vendor.imgUrl} width={100} height={100} />
                        <div className="flex flex-col">
                            <h2 className="font-bold text-xl">{details.vendor.name}</h2>
                            <h2 className="text-lg">{details.vendor.email}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-right text-lg">Company URL</h1>
                        <h1 className="text-right font-bold text-xl">{details.vendor.companyUrl}</h1>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-right text-lg">Company Name</h1>
                        <h1 className="text-right font-bold text-xl">{details.vendor.companyName}</h1>
                    </div>
                </div>
                
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-14 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 w-1/2 md:w-1/3">
                                <h1 className="title-font font-bold text-xl">Total Products</h1>
                                <h2 className="title-font font-bold text-3xl text-primary">{details.salesAnalysis ? details.salesAnalysis.totalProducts : 0}</h2>
                            </div>
                            <div className="p-4 w-1/2 md:w-1/3">
                                <h1 className="title-font font-bold text-xl">Total Orders</h1>
                                <h2 className="title-font font-bold text-3xl text-primary">{details.salesAnalysis ? details.salesAnalysis.totalOrders : 0}</h2>
                            </div>
                            <div className="p-4 w-full md:w-1/3">
                                <h1 className="title-font font-bold text-xl">Total Profit Earned</h1>
                                <h2 className="title-font font-bold  text-3xl text-primary">{details.salesAnalysis ? details.salesAnalysis.totalProfit : 0}</h2>
                            </div>
                        </div>
                    </div>  
                </section>

                <div className='md:ml-20 flex justify-center items-center'>
                    <LineGraph monthlySales = {details.salesAnalysis ? details.salesAnalysis.monthlySales : []} />
                </div>

                <div className="flex flex-col justify-center items-center -mt-[140%] 
                                md:-mt-80 md:ml-20">
                    <h1 className="text-primary text-4xl font-semibold">WOAH!</h1>
                    <div className="flex text-lg justify-center items-center md:w-1/3">
                        <h2 className="p-1">We have sold</h2>
                        <h3 className="text-primary p-1 font-semibold text-2xl">{details.salesAnalysis ? details.salesAnalysis.productsSoldToday : 0}</h3>
                        <h2 className="p-1">products today!</h2>
                    </div>
                </div>

                {
                    details.productLadder && 
                    <div className="bg-[url('/templates-bg.png')] bg-no-repeat bg-cover mt-20
                                md:ml-20">
                            <h1 className="pl-5 pt-10 te    xt-xl text-white font-semibold
                                   md:pl-10 md:text-3xl">TOP SELLERS THIS WEEK</h1>
                            <div className="flex py-10 justify-around flex-wrap">
                                {
                                    details.productLadder[1] &&
                                    <div className="flex flex-col items-center pt-16 w-1/3 p-2">
                                    <Image src={details.productLadder[1].imgUrl} width={200} height={233.33}
                                           className="object-contain"/>
                                    <div className="py-4 px-5 z-1 -mt-4 w-fit border-4 border-primary rounded-full bg-white
                             text-xl text-primary font-semibold italic">#2
                                    </div>
                                </div>}
                                {   details.productLadder[0] &&
                                    <div className="flex flex-col items-center pb-26 w-1/3 p-2">
                                    <Image src={details.productLadder[0].imgUrl} width={200} height={233.33}
                                           className="object-contain"/>
                                    <div className="py-4 px-5 z-1 -mt-4 w-fit border-4 border-primary rounded-full bg-white
                            text-xl text-primary font-semibold italic">#1
                                    </div>
                                </div>}
                                {
                                    details.productLadder[2] &&
                                    <div className="flex flex-col items-center pt-32 w-1/3 p-2">
                                    <Image src={details.productLadder[2].imgUrl} width={200} height={233.33}
                                           className="object-contain"/>
                                    <div className="py-4 px-5 z-1 -mt-4 w-fit border-4 border-primary rounded-full bg-white
                            text-xl text-primary font-semibold italic">#3
                                    </div>
                                </div>}
                            </div>
                </div>}
                </div>
                </main>}
            </AdminLayout>}
        </>
    )
}
