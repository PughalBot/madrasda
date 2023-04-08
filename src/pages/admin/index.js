import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios";

export default function Adminlogin() {
    const [mail,setmail]=useState();
    const [password,setpassword]=useState();
const adminlogin = () =>{
    // console.log(mail,password);
    axios
      .post('http://localhost:8080/api/auth/loginAdmin', {
        email: mail,
        password: password
      })
      .then((response) => {
        console.log(response.data);
        if(response.status === 200) {
            sessionStorage.setItem("token", response.data.token);
            window.location.href = '/admin/vendorlist';
        }
      })
      .catch((err)=>{
        console.log(err.response.data.message);
        document.getElementById("responsesection").innerHTML=err.response.data.message;
      })
      ;
}
  return (
    <>
    <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <title>Madrasda | Login</title>
      </Head>
      <div className="bg-center bg-no-repeat bg-cover flex bg-[url(https://cdn.discordapp.com/attachments/812329575953858620/1078262102269104199/Login.png)] w-screen h-screen">
            <div className='w-full bg-cover bg-center flex-center flex-row bg-transparent max-w-md m-auto backdrop-blur-md bg-black/60 rounded-3xl drop-shadow-2xl py-8 px-16'>
            <div className="flex flex-wrap justify-center">
                <div className="w-24">
                    <img src="/logo.png" alt="LOGO"/>
                </div>
            </div>
            <div className='flex flex-wrap mt-2 justify-center'>
            </div>
            <h1 className='text-2xl text-white font-medium mt-2 mb-12 text-center'>
                LOGIN
            </h1>
                <form>
                    <div className='text-base text-[#A5153F] m-2 text-center' id="responsesection"></div>
                    <div>
                        <label htmlFor='email' className='text-white'>Username</label>
                        <input
                            type='email'
                            className={'w-full p-2 text-primary rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'}
                            id='username'
                            placeholder='example@example.com' onChange={(e)=>setmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='text-white'>Password</label>
                        <input
                            type='password'
                            className={'w-full p-2 text-primary rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'}
                            id='password'
                            placeholder='**********'
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        {/* <Link href="/admin/vendorlist"> */}
                        <button type="button" className={`bg-[#A5153F] cursor-pointer py-2 px-5 text-l text-white rounded focus:outline-none `} onClick={adminlogin}>
                            Login
                        </button>
                        {/* </Linfk> */}
                    </div>
                </form>
            <br/>
            </div>
        </div>
    </>
  )
}
