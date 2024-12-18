import React from 'react'
import { useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SwiperButton = () => {

    const swiper = useSwiper()

    return (
        <div className=''>
                <button className='hidden lg:flex absolute left-8 top-[40%] z-50 text-4xl w-20 h-20 text-[#307bc4]' onClick={() => swiper.slidePrev()}> <FaChevronLeft /> </button>
                <button className='hidden lg:flex absolute right-0 top-[40%]  z-50 text-4xl w-20 h-20 text-[#307bc4]' onClick={() => swiper.slideNext()}> <FaChevronRight /> </button>
        </div>
    )
}

export default SwiperButton