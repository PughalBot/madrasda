import React from 'react'
import Head from 'next/head'
import VendorLayout from '@/components/layout-vendor'
import Link from 'next/link'

export default function ViewProd () {
    function lol() {
        alert("Your Product has been uploaded Successfully!!")
    }
  return (
    <>
    <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <title>Madrasda</title>
    </Head>
    
    <VendorLayout>
    <main className='overflow-hidden font-algeria
                    md:ml-36'>
    <div className="px-5 my-10 mx-auto">
        <div className="md:ml-20 md:mt-10">
          <h1 className="body-font text-primary text-3xl">Edit Product Info</h1>
        </div>
        <hr className="h-px md:ml-20 my-6 bg-black border-1 dark:bg-primary
                       lg:mr-12"></hr>
        <div className="md:ml-20 lg:ml-32"> 
            <h1 className="title-font font-medium text-2xl pb-8">1.Information</h1>
            <h2 className="ml-2 title-font font-medium text-xl">Title*</h2>
            <p className="ml-2 text-lg text-gray">250 characters max</p>
            <div className="mb-6 ml-2 mt-1
                            lg:mr-96">
                <input type="text" className="bg-white border border-[#D9D9D9] text-white text-sm rounded-lg focus:ring-primary focus:border-[#D9D9D9] block w-full p-2.5" placeholder="Enter the title of your product"/>
            </div>
            <div className="ml-2">
                <h2 className="title-font font-medium text-xl mb-6">Description*</h2>
            </div>
            <div className="mb-6 ml-2">
                <h2 className="title-font font-medium text-xl mb-6">Picture</h2>
                <div className="flex flec col ml-12 ">
                <img className="w-36 rounded-lg" src="https://cdn.discordapp.com/attachments/981618787491127306/1078972451930771486/Group_85.png" alt="picture"></img>
                <img className="ml-2 w-36 rounded-lg" src="https://cdn.discordapp.com/attachments/981618787491127306/1078972451930771486/Group_85.png" alt="picture"></img>
                </div>
            </div>
            <div className="flex items-center justify-center ml-2
                            lg:mr-96 ">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#D9D9D9] border-dashed rounded-lg cursor-pointer bg-white">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-black-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-black"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gary">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
        </div>
        <hr className="h-px my-6 bg-black border-1 dark:bg-primary
                       md:ml-20 
                       lg:mr-12"></hr>
        <div className="md:ml-20 lg:ml-32"> 
            <h1 className="title-font font-medium text-2xl pb-8">2.Product Details</h1>
            <h2 className="ml-2 title-font font-medium text-xl">Size & Fit</h2>
            <div className="ml-2">
                <h2 className="title-font font-medium text-xl">Material*</h2>
                    <p className="text-lg text-gray">250 characters max</p>
                    <div className="mb-6 mt-1 lg:mr-96 ">
                    <input type="text" className="bg-white border border-[#D9D9D9] text-white text-sm rounded-lg focus:ring-primary focus:border-[#D9D9D9] block w-full p-2.5" placeholder="Enter name of your Material"/>
                    </div>
            </div>
            <h2 className="ml-2 mb-6 title-font font-medium text-xl">Specifications*</h2>
            <div className="grid gap-6 ml-2 mb-2 
                            md:grid-cols-2
                            lg:mr-96">
                <div>
                    <label for="first_name" className="block mb-2 text-lg font-medium text-black">Sleeve Length</label>
                    <input type="text" className="bg-black-50 border-b border-gray text-black text-sm block w-full p-2.5" placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="last_name" className="block mb-2 text-lg font-medium text-black">Print or Pattern Type</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black text-sm block w-full p-2.5" placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">Weave Type</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5 " placeholder="Text" required>
                    </input>
                </div>  
                <div>
                    <label for="phone" className="block mb-2 text-lg font-medium text-black ">Ocassion</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5   " placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="website" className="block mb-2 text-lg font-medium text-black">Gender</label>
                    <input type="url" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5   " placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="website" className="block mb-2 text-lg font-medium text-black">Color</label>
                    <input type="url" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5   " placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="website" className="block mb-2 text-lg font-medium text-black">Fit</label>
                    <input type="url" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5   " placeholder="Text" required>
                    </input>
                </div>
                <div>
                    <label for="website" className="block mb-2 text-lg font-medium text-black">Add Specification</label>
                    <input type="url" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5 " placeholder="Text" required/>
                    <div className="flex justify-center">
                    <button type="button" className="focus:outline-none text-black bg-white border border-black hover:bg-white font-medium rounded-lg text-sm px-3 py-1 mt-2">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <hr className="h-px my-6 bg-black border-1 dark:bg-primary
                       md:ml-20 
                       lg:mr-12"></hr>
        <div className="md:ml-20 
                        lg:ml-32"> 
            <h1 className="title-font font-medium text-2xl pb-8">3.Payment Details</h1>
            <div className="grid gap-6 ml-2 mb-2 
                            md:grid-cols-2
                            lg:mr-96">
                <div>
                    <label for="first_name" className="block mb-2 text-lg font-medium text-black">Base Price</label>
                    <input type="text" className="bg-black-50 border-b border-gray text-black text-sm block w-full p-2.5" placeholder="₹" required>
                    </input>
                </div>
                <div>
                    <label for="last_name" className="block mb-2 text-lg font-medium text-black">Shipping Charges</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black text-sm block w-full p-2.5" placeholder="₹" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">GST</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5 " placeholder="%" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">Maximum retail Price</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5 " placeholder="₹" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">Discount/ Offer</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black   text-sm    block w-full p-2.5 " placeholder="%" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">Profit</label>
                    <input type="text" class="bg-white border border-gray text-gray text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" value="Profit earned" disabled readonly/>
                </div>
                </div>
        </div>
        <div className=" mt-14 flex justify-center ">
        <Link href="/vendor/templatelist">
        <button type="button" class="text-white bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Save as Draft</button>
        </Link>        <button onClick={lol} type="button" class="text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Upload Product</button>
        </div>
    </div>
    </main>
    </VendorLayout>
    </>
  )
}
