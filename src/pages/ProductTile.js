import Image from "next/image";

const ProductTile = (props) => {
    return (
        <div className="lg:w-1/4 md:w-1/4 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded
        drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)]
        duration-200 ease-in-out">
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
                <span className="mt-1 line-through text-gray pr-1">₹899s</span>
                <span className="title-font text-xs font-medium text-[#088240]">22% OFF</span>
            </div>
        </div>
    )
}
export default ProductTile
