import Image from "next/image";
import Head from "next/head";
import ClientLayout from "@/components/layout-client";

export default function ProductList () {

  // const [pageData, setPageData] = useState([]);
  // const [pageNo, setPageNo] = useState(0);
  // const [pageSize, setPageSize] = useState(10);
  // useEffect(() =>{
  //   const fetchPage = async () => {
  //     const res=await axios.get("http://localhost:8080/api/client/allProducts?pageNo=" + pageNo + "&pageSize=" + pageSize);
  //     setPageData(res.data);
  //   }
  //   fetchPage();
  // },[]);

  return (
    <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.png" />
      <title>Madrasda | Product List</title>
    </Head>
    
    <ClientLayout>
    <section className="body-font font-algeria">
      <div className="px-5 py-24 mx-auto">
      <h1 className="text-3xl text-primary md:ml-10 md:mt-4">PRODUCT LIST</h1>
        <div className="flex flex-wrap justify-center">
          
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
              <Image src="/v-tee.png" 
              alt="ecommerce" 
              height={1080}
              width={1920} 
              className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
              <div className='flex flex-row items-center w-full'>
                <div className='flex justify-start'>
                  <h3 className="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                </div>
                <div className='flex justify-end w-full'>
                  <Image src="/wishlist.png" width={25} height={25} className=''/>
                </div>
            </div>
              <h2 className="title-font text-lg font-medium">Product Name</h2>
              <span className="mt-1 text-black pr-1">₹699</span>
              <span className="mt-1 line-through text-gray pr-1">₹899</span>
              <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
          </div>
        </div>
        <br/>
        <div className="flex justify-center mt-8"> 
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px">
              <li>
                <a href="#" class="px-3 py-2 ml-0 leading-tight text-primary bg-white border border-primary rounded-l-lg hover:bg-primary hover:text-white">Previous</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">1</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">2</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary border border-primary bg-white hover:bg-primary hover:text-white">3</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">4</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">5</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">6</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">7</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">8</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">9</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary hover:bg-primary hover:text-white">10</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-primary bg-white border border-primary rounded-r-lg hover:bg-primary hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    </ClientLayout>
    </>
  );
}