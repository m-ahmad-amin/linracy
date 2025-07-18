import HeaderHome from "../components/HeaderHome";
import MainHome from "../components/MainHome";

export default function HomePage() {
    
  return (
    <>
      <div className="flex justify-center h-dvh md:justify-between">
        <div className="h-full w-[20%] hidden md:block"></div>

        <div className="md:w-[60%]">
          <HeaderHome />
          <MainHome />
        </div>

        <div className="h-full w-[20%] hidden md:block"></div>
      </div>
    </>
  );
}
