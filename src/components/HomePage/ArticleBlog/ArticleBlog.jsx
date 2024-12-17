"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa6';

const ArticleBlog = () => {

    const blogs = [
        {
            "id": "1",
            "title": "What is The Success rate of a root canel?",
            "date": "Sep 19, 2020",
            "description": "Nullam mauris vitae tortor sodales efficitur. Quisque orci ante.",
            "author": "Admin Rose",
            "likes": 0,
            "comments": 0,
            "image": "https://i.postimg.cc/RC1xSt2y/img.jpg"
        },
        {
            "id": "2",
            "title": "How to Maintain Oral Health Effectively?",
            "date": "Aug 15, 2021",
            "description": "Aenean suscipit magna at erat congue, in sodales ligula scelerisque.",
            "author": "Dr. Smith",
            "likes": 5,
            "comments": 2,
            "image": "https://i.postimg.cc/GtxWX0kd/img1.jpg"
        },
        {
            "id": "3",
            "title": "Top 5 Benefits of Regular Dental Checkups",
            "date": "Jan 05, 2022",
            "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
            "author": "Dental Care Team",
            "likes": 8,
            "comments": 4,
            "image": "https://i.postimg.cc/ZnmkPYvw/img2.jpg"
        },
        {
            "id": "4",
            "title": "Are Electric Toothbrushes Worth the Hype?",
            "date": "Mar 12, 2023",
            "description": "Curabitur sed eros vel lacus aliquet fermentum non at nibh.",
            "author": "Admin Rose",
            "likes": 3,
            "comments": 1,
            "image": "https://i.postimg.cc/Qt1GWKCB/img3.jpg"
        },
        {
            "id": "5",
            "title": "Best Foods for Stronger Teeth and Gums",
            "date": "Jul 22, 2023",
            "description": "Phasellus in nisi cursus, sollicitudin sapien id, laoreet erat.",
            "author": "Nutrition Expert",
            "likes": 6,
            "comments": 5,
            "image": "https://i.postimg.cc/LsrFX39K/img4.jpg"
        }
    ]


    return (
        <div className='mx-10'>
            <h1 className='text-3xl font-bold'>Recent Articles and Blogs</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    200: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
                modules={[Pagination]}
                className="my-10 h-[450px] cursor-pointer"
            >
                {
                    blogs.map((blog) => (
                        <SwiperSlide key={blog.id}>
                            <div className="card bg-base-100  h-[400px] shadow-md">
                                <figure className='relative'>
                                    <Image className='w-full h-60' src={blog.image} width={500} height={300} alt={blog.title} />
                                    <div className='absolute bottom-0 right-0 bg-[#307bc4] text-white py-2 px-3'>
                                        {blog.date}
                                    </div>
                                </figure>
                                <div className="p-5 border-b space-y-3">
                                    <h1 className='text-xl font-bold'>{blog.title}</h1>
                                    <p className='text-[16px]'>{blog.description}</p>
                                </div>
                                <div className='px-5 py-2 flex justify-between'>
                                    <p>By {blog.author}</p>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <span>{blog.likes}</span>
                                            <span><AiFillLike /></span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span>{blog.comments}</span>
                                            <span><FaCommentDots /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default ArticleBlog