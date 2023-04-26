import Head from 'next/head'
import Carousel from '@/components/carousel'
import Image from 'next/image'
import ClientLayout from '@/components/layout-client'
import RightsideDisc from '@/components/rightside-disc'
import LeftsideDisc from '@/components/leftside-disc'
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../context/context";
import {uuidv4} from '@firebase/util'
import HotSellers from '@/components/hotsellers-client'
import { isTokenValid } from "@/utils/JWTVerifier";

export default function Home() {
  const router = useRouter();
  const ctx = useContext(UserContext);
  let isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (ctx.vendorList !== undefined && ctx.vendorList.length !== 0)
      setLoading(false);
    else {
      setLoading(true);
    }
  }, [ctx.vendorList]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setClient(true);
    }
  });

  if (loading && isReady)
    return (
      <div className='z-50 h-screen w-screen overflow-hidden'>
        <Image
          src='/loader.gif'
          width={1920}
          height={1080}
          className='object-cover object-center w-full h-full'
          alt={"Image"}
        />
      </div>
    );

  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
        <title>Madrasda</title>
      </Head>

      <ClientLayout client={client}>
        <Carousel />
        <h1 className='font-algeria font-bold text-3xl my-10 px-10'>
          OFFICIAL MERCHANDISE
        </h1>

        {ctx.vendorList.map((vendor, index) => {
          if (index % 2 === 0) {
            return (
              <RightsideDisc
                key={uuidv4()}
                id={vendor.id}
                name={vendor.name}
                imgUrl={vendor.imgUrl}
              />
            );
          } else {
            return (
              <LeftsideDisc
                key={uuidv4()}
                id={vendor.id}
                name={vendor.name}
                imgUrl={vendor.imgUrl}
              />
            );
          }
        })}
        <span id="hotsellers"></span>
        <HotSellers />
      </ClientLayout>
    </>
  );
}
