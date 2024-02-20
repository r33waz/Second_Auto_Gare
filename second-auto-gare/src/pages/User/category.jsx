import CategorySearch from '../../components/common/categorysearch'
import React from 'react'
import sideProfileCar from "../../assets/images/sideprofile.png"
import { Fade } from 'react-awesome-reveal'
import { Link } from 'react-router-dom'
import Suv from "../../assets/images/suv.png"
import Sedan from "../../assets/images/sedan.png"
import Hatchback from "../../assets/images/hatchback.png"
import Hybrid from "../../assets/images/hybrid.png"
import Van from "../../assets/images/delivery-van.png"
import Truck from "../../assets/images/container.png"
import Electric from "../../assets/images/electric-car.png"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

// Import Swiper styles
import "swiper/css";
function Category() {
    return (
        <div className='container mx-auto'>
            <section className='pt-8 lg:pt-16 md:pt-14 bg-light-bg'>
                <div className='flex items-center justify-center'>
                    <div className='flex flex-col items-center gap-5 lg:gap-10 md:gap-10'>
                        <Fade cascade >
                            <h2 className="">Find cars for sale and for rent near you</h2>
                            <h1 className='text-2xl font-semibold lg:text-6xl md:text-4xl'>Find Your Dream Car</h1>
                            {/* drop downs for brands , models, years,price*/}
                            <CategorySearch />
                            <img src={sideProfileCar} alt='image' className='object-cover w-full' />
                        </Fade>
                    </div>
                </div>
            </section>
            <section className='pt-8 lg:pt-16 md:pt-14'>
                <h1 className='text-4xl font-semibold text-center'>Browse by Type</h1>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 50,
                        },
                    }}
                    className="px-24 py-10 lg:px-12 md:px-12"
                >
                    <SwiperSlide className='z-30 w-20 h-10'>
                        <Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                            Suv
                            <img src={Suv} alt='SUV' className='w-12 h-12' /> {/* Adjusted size */}
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide><Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Sedan
                        <img src={Sedan} alt='Sedan' className='w-12 h-12' />
                    </Link></SwiperSlide>
                    <SwiperSlide><Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Hatchback
                        <img src={Hatchback} alt='Hatchback' className='w-12 h-12' />
                    </Link></SwiperSlide>
                    <SwiperSlide><Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Hybrid
                        <img src={Hybrid} alt='Hybrid' className='w-12 h-12' />
                    </Link></SwiperSlide>
                    <SwiperSlide><Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Van
                        <img src={Van} alt='Van' className='w-12 h-12' />
                    </Link></SwiperSlide>
                    <SwiperSlide><Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Truck
                        <img src={Truck} alt='Truck' className='w-12 h-12' />
                    </Link></SwiperSlide>
                    <SwiperSlide> <Link to="/carlisting" className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
                        Electric
                        <img src={Electric} alt='Electric' className='w-12 h-12' />
                    </Link></SwiperSlide>

                </Swiper>

            </section>
        </div>
    )
}

export default Category