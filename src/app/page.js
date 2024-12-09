import About from "@/components/About";
import Banner from "@/components/Banner";
import BookNow from "@/components/BookNow";
import Image from "next/image";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <BookNow></BookNow>
      <About></About>
    </div>
  );
}
