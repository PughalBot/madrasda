import Image from "next/image";
import CloseConfirm from "./close-confirm-modal";

function VendorListItem(props) {
    return (
        <div>
            <div className="block relative h-[200px] rounded overflow-hidden">
                <span className="w-full ml-5 flex justify-end">
                    <CloseConfirm />
                </span>
                <Image src={props.image} 
                alt="ecommerce" 
                height={200}
                width={200} 
                className="object-contain object-center w-50 h-50" />
            </div>
            <div className="h-[20%]">
                <h3 className="text-base font-bold title-font mt-4 text-center flex justify-center items-center">
                {props.vendorName}
                </h3>
            </div>
        </div>
    );
}

export default VendorListItem;