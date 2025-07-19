import HeaderHome from "../components/HeaderHome";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center h-dvh md:justify-between">
        <div className="bg-red-700 h-full w-[20%] hidden md:block"></div>

        <div className="md:w-[60%]">
          <HeaderHome />
        </div>

        <div className="bg-red-500 h-full w-[20%] hidden md:block"></div>
      </div>
    </>
  );
}
