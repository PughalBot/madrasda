import Head from "next/head";
import SearchVendor from "@/components/search-vendor";
import Payments from "@/components/payments";
import AdminLayout from "@/components/layout-admin";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid, getRole } from "@/utils/JWTVerifier";
import PayoutConfirm from "@/components/payout-confirm";
import {uuidv4} from "@firebase/util";
import {Grow} from "@mui/material";

export default function CustomerDetails() {
  const router = useRouter();
  const [tokenExists, setTokenExists] = useState(false);
  const [payouts, setPayouts] = useState([]);
  let isReady = router.isReady;

  const getAllPayoutRequest = async () => {
    const response = await axios.get(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/admin/getPayoutRequestedVendors",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setPayouts(response.data);
  };

  const completePayout = async (id) => {
    const response = await axios.post(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/admin/completePayout/" + id
    );
    getAllPayoutRequest();
  };


  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken === undefined || !isTokenValid(jwtToken) || getRole(jwtToken) !== 'ROLE_ADMIN')
      router.push("/admin");
    else
      setTokenExists(true);
      getAllPayoutRequest();
    
  }, []);


  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
        <title>Madrasda | Payments</title>
      </Head>
      
      {tokenExists && <AdminLayout>
        <main
          className='body-font overflow-hidden font-algeria
                                md:ml-32'>
          <div className='px-5 my-10 mx-auto'>
            <h1
              className='text-3xl text-primary 
                               md:ml-20 md:mt-10'>
              PAYMENT REQUESTS
            </h1>
            {payouts.length === 0 && (
              <h1 className='text-xl md:ml-20 md:mt-10'>No payouts </h1>
            )}
            {payouts &&
              payouts.map((vendor, index) => (
                <Grow key={uuidv4()} in timeout={(index + 1) * 500 % ((700) * 5)}>
                  <div key={uuidv4()}
                       className='flex mt-4 md:ml-20 lg:mr-20'>
                    <div className='container mt-8 bg-[#D9D9D9] rounded-lg w-full'>
                      <div className=' ml-8 mb-2 mr-20 mt-4 '>
                        <Image src={vendor.imgUrl} width={70} height={70} />
                        <h1 className='text-2xl text-primary font-bold mb-6'>
                          {vendor.name}
                        </h1>
                        <div className='flex mb-2'>
                          <h2 className='mb-2 w-2/6 md:w-96 text-lg font-medium text-black flex items-center'>
                            Payout Requested
                          </h2>
                          <h2 className='mb-2 w-2/6 md:w-96 text-lg font-medium text-black flex items-center'>
                            ₹{Number(vendor.payoutAmount).toLocaleString("en-IN")}
                          </h2>
                        </div>
                        <PayoutConfirm
                            payout={(e) => {
                              if (e) completePayout(vendor.payoutId);
                            }}
                        />
                      </div>
                    </div>
                  </div>
                </Grow>
              ))}
          </div>
        </main>
      </AdminLayout>}
    </>
  );
}
