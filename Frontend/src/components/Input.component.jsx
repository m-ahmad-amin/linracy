import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({placeholder, type, value, setUserData, name}) {

    const [eyeState, setEyeState] = useState(`show ${type}`);

    function handleChange(e) {
        setUserData((pre) => {
            return {
                ...pre,
                [name]: e.target.value
            }
        })
    }

    function toggleEye() {
        if (eyeState === "show password") {
            setEyeState("don't show")
        } else {
            setEyeState(`show ${type}`);
        }
    }

    return (
        <>
            <div className="md:w-96 md:h-10 bg-[#fff] border border-[#878484] rounded-md text-black p-1 flex justify-between focus-within:border-[#e63946] focus-within:border-2">
                <input className={` placeholder:text-base focus:outline-none w-full`} value={value} type={eyeState === "show password" ? "password" : "text"} placeholder={placeholder} onChange={handleChange}></input>

                {eyeState === "show password" ? <Eye size={20} className="hover:cursor-pointer" onClick={toggleEye} /> : eyeState === "don't show" && <EyeOff size={20} className="hover:cursor-pointer" onClick={toggleEye} />}
            </div>
            {/* e63946 */}
        </>
    )
}