import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {uuidv4} from "@firebase/util";
export default function RightsideDisc ({name, id, imgUrl}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      getVendorProducts();
    }, []);

    const getVendorProducts = async () => {
      const params = new URLSearchParams({
        pageNo : 0,
        pageSize: 4
      })
      const response = await axios.get(
        `https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/client/getProductsByVendor/${id}?` + params
      );
      setProducts(response.data.content);
    }

    return (
      <>
        <div
          className='hidden md:block overflow-hidden pl-2 
                     lg:pl-10 my-4 h-fit'>
          <span
            className='bg-secondary bg-opacity-95 flex flex-row justify-center items-center w-full
                        rounded-l-full rounded-r-none'>
            <div className='relative'>
              <Image
                className='animate-spin'
                src='/disc.png'
                width={500}
                height={500}
              />
              <div className='w-[220px] h-[220px] overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover objects-center rounded-full'>
                <Image
                  className='object-cover w-full h-full animate-spin hover:animate-none'
                  alt={name}
                  src={imgUrl}
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <Link href={`/products/${id}`}>
                <h1 className='font-prompt italic font-black text-3xl tracking-widest text-logo flex justify-end pr-10 text-center my-3 hover:text-5xl transition-all ease-in-out duration-500'>
                  {name}
                </h1>
              </Link>

              {/* -------- VISIBLE ONLY ON LARGE SCREENS --------  */}
              <div
                className='w-full h-full items-center justify-start px-4 py-2 hidden
                            md:flex'>
                {products &&
                  products.map((prod) => {
                    return (
                      <div
                        key={uuidv4()}
                        className='w-56 font-quest p-4 cursor-pointer border border-gray bg-tertiary m-2 rounded-sm'>
                        <Link href={`/productDetails/${prod.id}`}>
                          <div className='block relative h-36 rounded overflow-hidden'>
                            <Image
                              src={prod.colors[0].images[0]}
                              alt='ecommerce'
                              width={1080}
                              height={1920}
                              className='object-contain object-center w-full h-full block'
                            />
                          </div>
                          <div className='mt-4 flex flex-col'>
                            <h2 className='text-black title-font text-lg font-medium'>
                              {prod.name}
                            </h2>
                            <span className='mt-1 text-black text-xl'>
                              ₹
                              {Math.round(
                                prod.total - prod.total * prod.discount * 0.01
                              )}
                            </span>
                            <div className='flex justify-between'>
                              <span className='mt-1 line-through text-sm text-black'>
                                ₹{prod.total}
                              </span>
                              <span className='title-font font-semibold text-sm text-[#088240]'>
                                {prod.discount}% off
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}

                <div className='mr-5 z-10 relative md:scale-150 lg:scale-100'>
                  <Link href={`/products/${id}`}>
                    <Image
                      src='/prod-comp-showmore-right.png'
                      width={50}
                      height={50}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </span>
        </div>
        <span className='flex flex-col md:hidden bg-bg rounded-t-full rounded-b-3xl w-11/12 mx-auto'>
          <Link href={`products/${id}`} className='relative'>
            <Image
              className='mx-auto animate-spin'
              src='/disc.png'
              width={200}
              height={200}
            />
            <div className='w-[100px] h-[100px] overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover objects-center rounded-full'>
              <Image
                className='object-cover w-full h-full'
                alt={name}
                src={imgUrl}
                width={200}
                height={200}
              />
            </div>
          </Link>
          <h1 className='text-xl text-logo font-quest text-center'>
            {name}'s Products
          </h1>
          <div className='grid grid-cols-2'>
            {products &&
              products.map((prod) => {
                return (
                  <div
                    key={uuidv4()}
                    className='row-span-1 font-quest p-4 cursor-pointer border border-gray bg-tertiary m-2 rounded-sm'>
                    <Link href={`/productDetails/${prod.id}`}>
                      <div className='block relative h-36 rounded overflow-hidden'>
                        <Image
                          src={prod.colors[0].images[0]}
                          alt='ecommerce'
                          width={1080}
                          height={1920}
                          className='object-contain object-center w-full h-full block'
                        />
                      </div>
                      <div className='mt-4 flex flex-col'>
                        <h2 className='text-black title-font text-lg font-medium'>
                          {prod.name}
                        </h2>
                        <span className='mt-1 text-black text-xl'>
                          ₹
                          {Math.round(
                            prod.total - prod.total * prod.discount * 0.01
                          )}
                        </span>
                        <div className='flex justify-between'>
                          <span className='mt-1 line-through text-sm text-black'>
                            ₹{prod.total}
                          </span>
                          <span className='title-font font-semibold text-sm text-[#088240]'>
                            {prod.discount}% off
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </span>
      </>
    );
}
