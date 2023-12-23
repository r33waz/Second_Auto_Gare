import logo from "../../assets/images/kidmfond.jpg";
import nexonImage from "../../assets/images/nexon.jpeg";
import { motion } from "framer-motion";
import hundaiLogo from "../../assets/images/hundai.png";
import kiaLogo from "../../assets/images/kia.png";
import hondaLogo from "../../assets/images/honda.png";
import toyotaLogo from "../../assets/images/toyota.png";
import tataLogo from "../../assets/images/Untitled-removebg-preview.png";
import sportage from "../../assets/images/sportage.jpg";
import luxuryCar from "../../assets/images/luxury.jpg";
import SUV from "../../assets/images/toyota.jpg";
import subSUV from "../../assets/images/kia.jpg";
import sedan from "../../assets/images/sedan.png";
import Flip from "react-reveal/Flip";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto :bg--bg">
      <div className="relative h-[800px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={nexonImage} alt="Car Image" className="object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute w-2/3 lg:w-1/3 md:w-1/3 tracking-widest h-[668px] top-32 left-20">
            <h1 className="text-5xl font-bold text-transparent from-white to-blue bg-gradient-to-tl bg-clip-text gradient_text">
              Second Auto Gare - Your Trusted Vehicle Rental Partner
            </h1>

            <p className="text-xs italic font-light text-white">
              In this website, we provide services like renting a vehicle, live
              chat between the customer and seller, category page, and also
              include the landing page of the website.
            </p>
          </div>
        </motion.div>
      </div>
      <section>
        <Flip left cascade>
          <div className="flex pt-20 flex-wrap items-center justify-between gap-3 p-5 lg:px-14 md:px-14 ">
            <img
              src={kiaLogo}
              alt="Hundai"
              className="bg-white rounded-full w-40 h-40"
            />
            <img
              src={toyotaLogo}
              alt="Hundai"
              className="bg-white rounded-full w-40 h-40"
            />
            <img
              src={hundaiLogo}
              alt="Hundai"
              className="bg-white rounded-full w-40 h-40 "
            />
            <img
              src={hondaLogo}
              alt="Hundai"
              className="bg-white rounded-full w-40 h-40 "
            />
            <img
              src={tataLogo}
              alt="Hundai"
              className="bg-white rounded-full w-40 h-40 "
            />
          </div>
        </Flip>
      </section>
      <section className="mt-5 bg-gray-300 :bg--bg lg:px-14 md:px-14 ">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-4">
          <div className=" ">
            <img src={sportage} alt="Hundai" className="object-cover" />
          </div>
          <Fade bottom cascade>
            <div className="flex flex-col justify-center gap-5 tit :text-white">
              <h1 className="text-2xl font-bold">About Second Auto Gare</h1>
              <p className="w-full text-sm italic text-justify lg:w-2/3 md:w-2/3">
                Seconds Auto Gare is your one-stop destination for renting
                vehicles that cater to your specific needs. Our online platform
                provides easy access to a wide range of cars, including SUVs,
                sedans, and luxury vehicles, all maintained to the highest
                standards. We also offer a live chat feature that connects you
                directly with our team, ensuring a seamless rental experience.
              </p>
              <Link href="/" className="font-semibold underline ">
                Read More
              </Link>
            </div>
          </Fade>
        </div>
        <Fade bottom cascade>
          <div className="flex flex-col pb-5 mt-5 text-center">
            <h1 className="text-3xl font-bold break-words">
              Why Choose Second Auto Gare?
            </h1>
            <p>
              We’re committed to providing quality service to our customers,
              ensuring that each rental experience is smooth and hassle-free.
              Here are some <br></br>of the benefits of choosing Second Auto
              Gare:
            </p>
          </div>
        </Fade>
      </section>
      <section className="pt-5 :bg--bg">
        <div className="lg:px-14 md:px-14 ">
          <div className="grid gap-10 text-black lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <Fade left>
              <div className="flex bg-gray-500 rounded-md felx-col">
                <div className="p-5">
                  <h3>.1</h3>
                  <h1 className="text-3xl">Wide Range of Vehicles</h1>
                  <p>
                    We offer a diverse range of cars, including SUVs, sedans,
                    and luxury vehicles, to cater to your specific needs 🚗.
                  </p>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div className="flex bg-gray-500 rounded-md felx-col">
                <div className="p-5">
                  <h3>.2</h3>
                  <h1 className="text-3xl">Live chat</h1>
                  <p>
                    We offer a live chat option to the user to directly contact
                    with the buyer and seller 💬.
                  </p>
                </div>
              </div>
            </Fade>
            <Fade left>
              <div className="flex bg-gray-500 rounded-md felx-col">
                <div className="p-5">
                  <h3>.3</h3>
                  <h1 className="text-3xl">24/7 Customer Support</h1>
                  <p>
                    Our team is available around the clock to assist you with
                    any queries or concerns you may have, ensuring a seamless
                    rental experience 📞.
                  </p>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div className="flex bg-gray-500 rounded-md felx-col">
                <div className="p-5">
                  <h3>.4</h3>
                  <h1 className="text-3xl">Flexible Rental Periods</h1>
                  <p>
                    We offer flexible rental periods, catering to your specific
                    needs, whether it’s a short-term or long-term rental ⏳.
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
      <section className="pt-10 :bg--bg">
        <div className="uppercase lg:px-14 md:px-14">
          <h1 className="text-3xl ">Cars Category</h1>
          <div className="grid gap-10 pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 :text-black">
            <div className="relative image">
              <Fade left>
                <img src={luxuryCar} alt="Luxury" />
                <h1 className="absolute text-2xl border-2 border-black top-36 right-72">
                  Luxury
                </h1>
              </Fade>
            </div>

            <div className="relative image ">
              <Fade right>
                <img src={SUV} alt="suv" />
                <h1 className="absolute text-2xl border-2 border-black top-36 right-72">
                  SUV
                </h1>
              </Fade>
            </div>

            <div className="relative image">
              <Fade left>
                <img src={subSUV} alt="SUBsuv image" className="h-[375px]" />
                <h1 className="absolute text-2xl border-2 border-black top-36 right-72">
                  subSUV
                </h1>
              </Fade>
            </div>

            <div className="relative w-full image">
              <Fade right>
                <img src={sedan} alt="Sedan Image" />
                <h1 className="absolute text-2xl border-2 border-black top-36 right-72">
                  sedan
                </h1>
              </Fade>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10">
        <div className="flex items-center justify-between p-8 text-black bg-gray-200 :bg--bg">
          <div className="flex flex-col">
            <p className="text-gray-800 :text-white">
              At Second Auto Care, we're committed to sustainability and
              reducing our carbon footprint. We ensure that our vehicles are
              maintained to the highest standards, reducing emissions and
              promoting environmental health.
            </p>
          </div>
          <img
            src={logo}
            alt="image"
            className="rounded-full h-96 w-96 gradient_text logo-shadwo tilt_image"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
