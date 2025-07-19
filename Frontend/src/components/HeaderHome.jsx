import logo from "../assets/logo.png";

export default function HeaderHome() {
  return (
    <>
      <div className="flex p-4 items-center md:p-0 md:justify-center">
        <img src={logo} alt="Linracy" className="w-2/5 h-auto md:w-[30%]" />
      </div>
    </>
  );
}
