
export const dynamic = "force-dynamic"
import About from "@/components/HomePage/About";
import ArticleBlog from "@/components/HomePage/ArticleBlog/ArticleBlog";
import Banner from "@/components/HomePage/Banner/Banner";
import BookNow from "@/components/HomePage/BookNow";
import Counter from "@/components/HomePage/Counter";
import HealthServices from "@/components/HomePage/HealthServices";
import HighService from "@/components/HomePage/HighService";
import ServiceOffer from "@/components/HomePage/ServiceOffering/ServiceOffer";
import SpecialistDoctor from "@/components/HomePage/SpecialistDoctor/SpecialistDoctor";
import SuccessWork from "@/components/HomePage/SuccessWork";
import Image from "next/image";



export default function Home() {


  return (
    <div className="">
      <Banner />
      <BookNow />
      <About />
      <Counter />
      <HighService />
      <SpecialistDoctor />
      <HealthServices />
      <SuccessWork />
      <ServiceOffer />
      <ArticleBlog />
    </div>
  );
}
