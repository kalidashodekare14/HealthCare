
import About from "@/components/HomePage/About";
import Banner from "@/components/HomePage/Banner";
import BookNow from "@/components/HomePage/BookNow";
import Counter from "@/components/HomePage/Counter";
import HighService from "@/components/HomePage/HighService";
import SpecialistDoctor from "@/components/HomePage/SpecialistDoctor/SpecialistDoctor";
import Image from "next/image";



export default function Home() {
  return (
    <div className="bg-[#e6edf3]">
      <Banner></Banner>
      <BookNow></BookNow>
      <About></About>
      <Counter></Counter>
      <HighService></HighService>
      <SpecialistDoctor></SpecialistDoctor>
    </div>
  );
}
