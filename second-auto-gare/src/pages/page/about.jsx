import React from 'react'
import useSWR from 'swr'
import { getData } from '../../service/axiosservice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SliderHook from '../../hooks/sliderhook.jsx';

function About() {
  const { data, isLoading } = useSWR('/api/v1/feedbacks', url => getData(url).then(res => res));
  console.log(data)
  return (
    <div className='container '>
      {
        isLoading ?
          <div className='flex justify-center'>
            <svg className='text-purple' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                <animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13" />
                <animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13" />
                <animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1" />
                <animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1" />
              </rect>
              <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                <animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1" />
                <animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13" />
                <animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13" />
                <animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1" />
              </rect>
              <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                <animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1" />
                <animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1" />
                <animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13" />
                <animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13" />
              </rect>
            </svg>
          </div>
          :
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[]}
            className="mySwiper"
          >
            {data?.data?.slice(0, 8).map((e, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center w-full px-2 ">
                  <div className="flex flex-col w-full p-2 px-1 py-1 text-center border border-gray-700 rounded-md sm:flex-row sm:text-left">
                    <div className="flex flex-col gap-4 py-2 pr-2">
                      <div className='flex items-center gap-3'>
                        <h1 className='px-4 py-2 text-center text-white rounded-full bg-purple'>{e?.fullname[0]}</h1>
                        <h2>{e?.fullname}</h2>
                      </div>
                      <p className="text-sm text-justify">{e?.message}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SliderHook/>
          </Swiper>
      }
    </div>
  )
}

export default About

