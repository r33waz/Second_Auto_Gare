import React from 'react';
import logo from "../../assets/images/kidmfond.jpg";
import nexonImage from "../../assets/images/nexon.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sportage from "../../assets/images/sportage.jpg";
import luxuryCar from "../../assets/images/luxury.jpg";
import SUV from "../../assets/images/toyota.jpg";
import subSUV from "../../assets/images/kia.jpg";
import sedan from "../../assets/images/sedan.png";
import { Link } from "react-router-dom";
import rightRevel from "../../assets/images/rightrevel.png"
import leftRevel from "../../assets/images/leftrevel.png"
import centerRevel from "../../assets/images/center.png"

function Home() {
  function LeftArrow({ onClick }) {
    return (
      <div onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="lg:w-12 md:h-12 w-8 h-8 rounded-full bg-purple bg-opacity-85 cursor-pointer hover:bg-purple absolute top-[40%] left-8 p-2 z-10 active:bg-purple "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    );
  }

  function RightArrow({ onClick }) {
    return (
      <div onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="lg:w-12 md:h-12 w-8 h-8  rounded-full bg-purple bg-opacity-85 cursor-pointer hover:bg-purple absolute top-[40%] right-8 p-2 z-10 active:bg-purple "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    );
  }
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // eslint-disable-next-line no-sparse-arrays
  const carLogos = [
    {
      name: "Subaru",
      logo: "https://www.carlogos.org/car-logos/subaru-logo-2019-640.png",
    },
    {
      name: "Renault",
      logo: "https://www.carlogos.org/logo/Renault-logo-2015-640x550.jpg",
    },
    {
      name: "Honda",
      logo: "https://www.carlogos.org/car-logos/honda-logo-2000-full-640.png",
    },
    {
      name: "Toyota",
      logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe-download.png",
    },
    {
      name: "Ford",
      logo: "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
    },
    {
      name: "Volkswagen",
      logo: "https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg",
    },
    {
      name: "Mazda",
      logo: "https://www.carlogos.org/car-logos/mazda-logo-2018-vertical-640.png",
    },
    ,
    {
      name: "Hundai",
      logo: "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
    },
    ,
    {
      name: "Nissan",
      logo: "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png",
    },
    ,
    {
      name: "KIA",
      logo: "https://www.carlogos.org/logo/Kia-symbol-640x321.jpg",
    },
  ];


  return (
    <>
      <div className="text-white bg-[url('assets/images/backimg.jpg')] bg-cover bg-no-repeat lg:h-[500px] md:h-[300px] h-[475px] ">
        <div className="">
          <div className="relative flex flex-col h-[500px] items-center pt-6 gap-4 ">
            <div className="flex flex-col items-center justify-center lg:w-3/5 from-white">
              <h1 className="mb-4 text-5xl font-bold animate__animated animate__fadeIn animate__delay-0.6s">
                Second Auto Gare
              </h1>
              <h2 className="mb-4 text-4xl font-bold animate__animated animate__fadeIn animate__delay-0.7s">Your Trusted Vehicle Rental Partner</h2>
              <div className="justify-around -bottom-32 lg:absolute md:absolute lg:inline-block md:hidden">
                <div className='items-center hidden lg:flex md:flex justify-evenly'>
                  <img src={rightRevel} className='object-contain animate__animated animate__fadeInLeft animate__delay-1s' />
                  <img src={centerRevel} className='object-contain animate__animated animate__fadeIn animate__delay-0.8s' />
                  <img src={leftRevel} className='object-contain animate__animated animate__fadeInRight animate__delay-1s' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20  lg:mt-32 md:mt-32">
        <section>
          <Slider {...settings}>
            {carLogos.map((i, idx) => {
              return (
                <img
                  key={idx}
                  src={i?.logo}
                  alt={i?.name}
                  className="w-20 p-16 h-60"
                />
              );
            })}
          </Slider>
        </section>
        <section className="px-2 mt-5 bg-gray-300 lg:px-14 md:px-14">
          <div className="grid gap-4 pt-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="">
              <img
                src={sportage}
                alt="Hundai"
                className="h-full lg:object-cover md:object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 ">
              <h1 className="text-2xl font-bold">About Second Auto Gare</h1>
              <p className="text-sm italic text-justify w-fit lg:w-full md:w-3/3 ">
                Seconds Auto Gare is your one-stop destination for renting
                vehicles that cater to your specific needs. Our online
                platform provides easy access to a wide range of cars,
                including SUVs, sedans, and luxury vehicles, all maintained to
                the highest standards. We also offer a live chat feature that
                connects you directly with our team, ensuring a seamless
                rental experience.
              </p>
              <Link
                href="/"
                className="px-2 py-1 text-white rounded bg-purple w-fit bg-opacity-90 hover:bg-opacity-100"
              >
                Read More →
              </Link>
            </div>
          </div>
          <div className="flex flex-col pb-5 mt-5 text-center">
            <h1 className="text-3xl font-bold break-words">
              Why Choose Second Auto Gare?
            </h1>
            <p className="text-justify w-fit lg:w-fit md:w-full lg:text-center">
              We’re committed to providing quality service to our customers,
              ensuring that each rental experience is smooth and hassle-free.
              Here are some of the benefits of choosing Second Auto Gare:
            </p>
          </div>
        </section>
        <section className="pt-5 :bg--bg">
          <div className="lg:px-14 md:px-14 ">
            <div className="grid gap-10 px-5 text-black lg:p-0 md:p-0 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
              <div className="flex gap-2 duration-300 bg-gray-200 rounded-md felx-col hover:bg-purple hover:text-white hover:bg-opacity-80 ">
                <div className="p-5">
                  <h3>.1</h3>
                  <h1 className="text-3xl">Wide Range of Vehicles</h1>
                  <p className="pt-2">
                    We offer a diverse range of cars, including SUVs, sedans,
                    and luxury vehicles, to cater to your specific needs 🚗.
                  </p>
                </div>
              </div>
              <div className="flex duration-300 bg-gray-200 rounded-md felx-col hover:bg-purple hover:text-white hover:bg-opacity-80">
                <div className="p-5">
                  <h3>.2</h3>
                  <h1 className="text-3xl">Live chat</h1>
                  <p className="pt-2">
                    We offer a live chat option to the user to directly
                    contact with the buyer and seller 💬.
                  </p>
                </div>
              </div>
              <div className="flex duration-300 bg-gray-200 rounded-md felx-col hover:bg-purple hover:text-white hover:bg-opacity-80">
                <div className="p-5">
                  <h3>.3</h3>
                  <h1 className="text-3xl">24/7 Customer Support</h1>
                  <p className="pt-2">
                    Our team is available around the clock to assist you with
                    any queries or concerns you may have, ensuring a seamless
                    rental experience 📞.
                  </p>
                </div>
              </div>
              <div className="flex duration-300 bg-gray-200 rounded-md felx-col hover:bg-purple hover:text-white hover:bg-opacity-80">
                <div className="p-5">
                  <h3>.4</h3>
                  <h1 className="text-3xl">Flexible Rental Periods</h1>
                  <p className="pt-2">
                    We offer flexible rental periods, catering to your
                    specific needs, whether it’s a short-term or long-term
                    rental ⏳.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-10 ">
          <div className="uppercase lg:px-14 md:px-14">
            <h1 className="text-3xl ">Cars Category</h1>
            <div className="grid gap-10 pt-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
              <div className="flex flex-col w-full gap-2 image ">
                <Link
                  to=""
                  className="w-32 px-2 py-1 text-center text-white bg-purple bg-opacity-90 hover:bg-opacity-100"
                >
                  SUB-SUV
                </Link>
                <img
                  src={luxuryCar}
                  alt="SUBsuv image"
                  className="object-fill w-full h-56 lg:object-cover md:object-cover"
                />
              </div>

              <div className="flex flex-col w-full gap-2 image">
                <Link
                  to=""
                  className="w-32 px-2 py-1 text-center text-white bg-purple bg-opacity-90 hover:bg-opacity-100"
                >
                  SUV
                </Link>
                <img
                  src={SUV}
                  alt="SUBsuv image"
                  className="object-fill w-full h-56 lg:object-cover md:object-cover"
                />
              </div>
              <div className="flex flex-col w-full gap-2 image">
                <Link
                  to=""
                  className="w-32 px-2 py-1 text-center text-white bg-purple bg-opacity-90 hover:bg-opacity-100"
                >
                  SUB-SUV
                </Link>
                <img
                  src={subSUV}
                  alt="SUBsuv image"
                  className="object-fill w-full h-56 lg:object-cover md:object-cover"
                />
              </div>
              <div className="flex flex-col w-full gap-2 image">
                <Link
                  to=""
                  className="w-32 px-2 py-1 text-center text-white bg-purple bg-opacity-90 hover:bg-opacity-100"
                >
                  Sedan
                </Link>
                <img
                  src={sedan}
                  alt="Sedan Image"
                  className="object-fill w-full h-56 lg:object-cover md:object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-10">
          <div className="flex flex-wrap justify-between gap-5 p-8 text-black bg-gray-200 ig:tems-center lg:flex-nowrap md:flex-nowrap">
            <div className="flex items-center">
              <p className="text-justify text-gray-800 lg:w-full md:w-80">
                At Second Auto Care, we're committed to sustainability and
                reducing our carbon footprint. We ensure that our vehicles are
                maintained to the highest standards, reducing emissions and
                promoting environmental health.
              </p>
            </div>
            <img
              src={logo}
              alt="image"
              className="object-cover w-full lg:object-fill h-96 md:object-fill "
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
