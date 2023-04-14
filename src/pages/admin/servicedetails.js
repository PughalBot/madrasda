import Head from "next/head";
import SearchVendor from "@/components/search-vendor";
import Payments from "@/components/payments";
import AdminLayout from "@/components/layout-admin";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CustomerDetails () {
    const router = useRouter();
    const verifyToken = async () => {
    const url = new URLSearchParams({
      token: localStorage.getItem('token')
    })
    axios.get(
      "http://localhost:8080/api/auth/?" + url
    ).then((response) => {
      console.log("refreshed");
    }).catch((err) => {
      localStorage.removeItem("token");
      router.push("/admin");
    })
  }
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    } else {
      try {
        verifyToken();
      } catch (err) {
        router.push("/admin");
      }
    }
  }, []);
    return (
        <>
            <Head>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.png" />
            <title>Madrasda | Service Details</title>
            </Head>

            <AdminLayout>
                <main className="body-font overflow-hidden font-algeria
                                md:ml-32">
                <div className="px-5 my-10 mx-auto">
                <h1 className="text-3xl text-primary md:ml-20 md:mt-10">SERVICE DETAILS</h1>
               
                <div className="flex flex-row justify-start items-center mt-10 md:ml-20 md:mr-20 text-lg p-2">
                    <SearchVendor />
                </div>
                <div className='flex mt-4 md:ml-20 lg:mr-44'>
                    <div className="container mt-8 bg-[#D9D9D9] rounded-lg">
                        <div className=" ml-8 mb-2 mr-20 mt-4 ">
                            <h1 className="text-xl md:text-2xl font-medium text-black mb-6">Ship Rocket</h1>
                            <div className="flex mb-2">
                                <h2 className="text-lg font-medium w-2/3 md:w-96 text-black flex items-center">Services</h2>
                                <input type="text" className="bg-[#D9D9D9] text-gray text-lg w-5/6 md:w-96 p-2.5" value="Shipping, Invoices" disabled readonly/>
                            </div>
                            <div className="flex mb-2">
                                <h2 for="last_name" className="w-2/3 md:w-96 text-lg font-medium text-black flex items-center">Payment</h2>
                                <input type="text" className="bg-[#D9D9D9]  text-gray text-lg w-5/6 md:w-96 p-2.5" value="Rs.20/500gms" disabled readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-4 md:ml-20 lg:mr-44'>
                    <div className="container mt-8 bg-[#D9D9D9] rounded-lg">
                        <div className=" ml-8 mb-2 mr-20 mt-4 ">
                            <h1 className="text-xl md:text-2xl font-medium text-black mb-6">Razor Pay</h1>
                            <div className="flex mb-2">
                                <h2 className="text-lg font-medium w-2/3 md:w-96 text-black flex items-center">Services</h2>
                                <input type="text" className="bg-[#D9D9D9] text-gray text-lg w-5/6 md:w-96 p-2.5" value="Payment" disabled readonly/>
                            </div>
                            <div className="flex mb-2">
                                <h2 for="last_name" className="w-2/3 md:w-96 text-lg font-medium text-black flex items-center">Payment</h2>
                                <input type="text" className="bg-[#D9D9D9]  text-gray text-lg w-5/6 md:w-96 p-2.5" value="" disabled readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-4 md:ml-20 lg:mr-44'>
                    <div className="container mt-8 bg-[#D9D9D9] rounded-lg">
                        <div className=" ml-8 mb-2 mr-20 mt-4 ">
                            <h1 className="text-xl md:text-2xl font-medium text-black mb-6">Google Cloud Platform</h1>
                            <div className="flex mb-2">
                                <h2 className="text-lg font-medium w-2/3 md:w-96 text-black flex items-center">Services</h2>
                                <input type="text" className="bg-[#D9D9D9] text-gray text-lg w-5/6 md:w-96 p-2.5" value="Data and Image Storage" disabled readonly/>
                            </div>
                            <div className="flex mb-2">
                                <h2 for="last_name" className="w-2/3 md:w-96 text-lg font-medium text-black flex items-center">Payment</h2>
                                <input type="text" className="bg-[#D9D9D9]  text-gray text-lg w-5/6 md:w-96 p-2.5" value="" disabled readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-4 md:ml-20 lg:mr-44'>
                    <div className="container mt-8 bg-[#D9D9D9] rounded-lg">
                        <div className=" ml-8 mb-2 mr-20 mt-4 ">
                            <h1 className="text-xl md:text-2xl font-medium text-black mb-6">Twillio</h1>
                            <div className="flex mb-2">
                                <h2 className="text-lg font-medium w-2/3 md:w-96 text-black flex items-center">Services</h2>
                                <input type="text" className="bg-[#D9D9D9] text-gray text-lg w-5/6 md:w-96 p-2.5" value="OTP SMS verification" disabled readonly/>
                            </div>
                            <div className="flex mb-2">
                                <h2 for="last_name" className="w-2/3 md:w-96 text-lg font-medium text-black flex items-center">Payment</h2>
                                <input type="text" className="bg-[#D9D9D9]  text-gray text-lg w-5/6 md:w-96 p-2.5" value="" disabled readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-4 md:ml-20 lg:mr-44'>
                    <div className="container mt-8 bg-[#D9D9D9] rounded-lg">
                        <div className=" ml-8 mb-2 mr-20 mt-4 ">
                            <h1 className="text-xl md:text-2xl font-medium text-black mb-6">Image Stack</h1>
                            <div className="flex mb-2">
                                <h2 className="text-lg font-medium w-2/3 md:w-96 text-black flex items-center">Services</h2>
                                <input type="text" className="bg-[#D9D9D9] text-gray text-lg w-5/6 md:w-96 p-2.5" value="Store Images" disabled readonly/>
                            </div>
                            <div className="flex mb-2">
                                <h2 for="last_name" className="w-2/3 md:w-96 text-lg font-medium text-black flex items-center">Payment</h2>
                                <input type="text" className="bg-[#D9D9D9]  text-gray text-lg w-5/6 md:w-96 p-2.5" value="3875 exec tax" disabled readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </main>
            </AdminLayout>
        </>
    )
}