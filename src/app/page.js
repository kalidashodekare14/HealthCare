
import About from "@/components/HomePage/About";
import Banner from "@/components/HomePage/Banner/Banner";
import BookNow from "@/components/HomePage/BookNow";
import Counter from "@/components/HomePage/Counter";
import HealthServices from "@/components/HomePage/HealthServices";
import HighService from "@/components/HomePage/HighService";
import SpecialistDoctor from "@/components/HomePage/SpecialistDoctor/SpecialistDoctor";
import Image from "next/image";



export default function Home() {
  return (
    <div className="font-poppins ">
      <Banner />
      <BookNow />
      <About />
      <Counter />
      <HighService />
      <SpecialistDoctor />
      <HealthServices />
    </div>
  );
}
