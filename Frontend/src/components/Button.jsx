export default function Button({name, handleClick}) {
    return (
        <>
            <button onClick={handleClick} className="h-9 md:h-10 border border-[#e63946] rounded-md text-white transition-all bg-[#e63946] hover:bg-[#e24a57]">{name}</button>
        </>
    )
}