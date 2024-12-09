
import About from "@/components/HomePage/About";
import Banner from "@/components/HomePage/Banner";
import BookNow from "@/components/HomePage/BookNow";
import Counter from "@/components/HomePage/Counter";
import Image from "next/image";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <BookNow></BookNow>
      <About></About>
      <Counter></Counter>
    </div>
  );
}
