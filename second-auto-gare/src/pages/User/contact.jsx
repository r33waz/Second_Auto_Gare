import React, { useState } from 'react'
import rightRevel from "../../assets/images/rightrevel.png"
import leftRevel from "../../assets/images/leftrevel.png"
import centerRevel from "../../assets/images/center.png"
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

function Contact() {
    const [isOpen, setisOpen] = useState(false)
    const handelOpen = () => {
        setisOpen(!isOpen)
    }
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()

    const Onsubmit = (value) => {
        console.log(value)
    }
    return (
        <div className='container mx-auto'>
            <section>
                <div className={`relative flex flex-col justify-center `}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.65322787261!2d85.24373135767756!3d27.708935957714655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1707492932344!5m2!1sen!2snp"
                        className={`w-full border-none  duration-500 ${isOpen ? "h-[85vh] filter grayscale-0" : "h-96 filter grayscale "}`}
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div className={`absolute top-3 lg:hidden md:hidden  right-0 w-fit gap-2 duration-500 ${isOpen ? "opacity-0" : " "}`}>
                        <h1 className={`lg:text-5xl md:text-4xl text-sm bg-purple text-white p-2 rounded`}>Click arrow</h1>
                    </div>
                    <div className={`absolute  left-[50%] right-[50%] flex  justify-center `} >
                        <div className={`absolute lg:flex md:flex hidden    items-center justify-center lg:w-[1000px] md:w-[1000px]  gap-2 duration-500 ${isOpen ? "opacity-0" : " "}`}>
                            <h1 className={`lg:text-5xl md:text-4xl text-lg`}>Let's make something awsome together</h1>
                        </div>
                        <button className={`${!isOpen ? "duration-500" : "rotate-180 duration-500"} absolute justify-center -bottom-52  `} onClick={handelOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="p-1 bg-white rounded-full shadow-lg text-purple" width="40" height="40" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 7v8.25L15.25 12l.75.66l-4.5 4.5l-4.5-4.5l.75-.66L11 15.25V7zm-.5 15C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5m0-1a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <h1 className='pt-6 text-4xl font-thin text-center'>Get in touch</h1>
                <h2 className='pt-1 text-sm font-thin text-center'>Leave a feedback</h2>
                <div className="flex flex-wrap items-center justify-center gap-5 pt-10 lg:flex-nowrap md:flex-wrap lg:justify-around md:justify-around">

                    <div className="flex gap-5 duration-300 p-3 rounded-md text-white hover:scale-105 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            className="duration-300 bg-purple rounded-xl"
                        >
                            <path
                                fill="currentcolor"
                                d="M18.93 20q-2.528 0-5.184-1.266q-2.656-1.267-4.934-3.555q-2.28-2.289-3.546-4.935Q4 7.598 4 5.07q0-.458.3-.763Q4.6 4 5.05 4h2.473q.408 0 .712.257t.411.658L9.142 7.3q.07.42-.025.733q-.094.313-.332.513L6.59 10.592q.616 1.118 1.361 2.076q.745.959 1.59 1.817q.87.87 1.874 1.62q1.004.749 2.204 1.414l2.139-2.177q.244-.263.549-.347q.305-.083.674-.033l2.104.43q.407.1.661.41q.254.311.254.713v2.435q0 .45-.306.75q-.305.3-.763.3M6.12 9.654l1.92-1.766q.096-.076.124-.211q.03-.135-.01-.25l-.443-2.12q-.039-.153-.135-.23T7.327 5H5.275q-.115 0-.192.077t-.077.192q.029 1.025.32 2.14q.293 1.116.795 2.245m8.45 8.334q1.014.502 2.16.743q1.148.24 2 .257q.115 0 .192-.076q.077-.077.077-.193v-2.007q0-.154-.077-.25q-.077-.097-.23-.135l-1.85-.379q-.116-.038-.203-.01q-.086.03-.182.125zm0 0"
                            />
                        </svg>
                        <div className="flex flex-col">
                            <small className="text-gray-600">Phone</small>
                            <span className="text-lg font-semibold text-purple hover:text-black">
                                8888-8888-888
                            </span>
                        </div>
                    </div>
                    <div
                        className="flex duration-300 gap-5 p-3 rounded-md  text-white  hover:scale-105 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            className="duration-300 bg-purple rounded-xl"
                        >
                            <path
                                fill="currentColor"
                                d="M4.615 19q-.69 0-1.152-.462Q3 18.075 3 17.385V6.615q0-.69.463-1.152Q3.925 5 4.615 5h14.77q.69 0 1.152.463q.463.462.463 1.152v10.77q0 .69-.462 1.152q-.463.463-1.153.463zM12 12.115l-8-5.23v10.5q0 .269.173.442t.442.173h14.77q.269 0 .442-.173t.173-.442v-10.5zM12 11l7.692-5H4.308zM4 6.885V6v11.385q0 .269.173.442t.442.173H4z"
                            />
                        </svg>
                        <div className="flex flex-col">
                            <small className="text-gray-600">Email</small>
                            <span className="text-lg font-semibold text-purple hover:text-black">
                                hello@example.com
                            </span>
                        </div>
                    </div>
                    <div
                        className="flex gap-5 p-3  text-white rounded-md  hover:scale-105 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            className="duration-300 bg-purple rounded-xl"
                        >
                            <path
                                fill="currentColor"
                                d="m15 19.923l-6-2.1l-5 1.94V5.781l5-1.704l6 2.1l5-1.94v14.04zm-.5-1.22v-11.7l-5-1.745v11.7zm1 0L19 17.55V5.7l-3.5 1.304zM5 18.3l3.5-1.342v-11.7L5 6.45zM15.5 7.004v11.7zm-7-1.746v11.7z"
                            />
                        </svg>
                        <div className="flex flex-col">
                            <small className="text-gray-600">Address</small>
                            <span className="text-lg font-semibold text-purple hover:text-black">
                                Jl. Soekarno-Hatta
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='mt-8'>
                <form onSubmit={handleSubmit(Onsubmit)}>
                    <div className='flex flex-col justify-center gap-3 p-3 '>
                        <div className='flex flex-wrap justify-center gap-3'>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-purple'><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8" /></svg>
                                    <input id='fullname' type='text' placeholder='Your fullname' className='w-full outline-none' {...register("fullname", { required: true })} />
                                </div>
                                {errors.fullname && <small className='text-xs text-red'>Enter your fullname</small>}
                            </div>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-purple'><path fill="currentColor" d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" /></svg>
                                    <input id='email' type='text' placeholder='Your fullname' className='w-full outline-none' {...register("email", { required: true })} />
                                </div>
                                {errors.fullname && <small className='text-xs text-red'>Enter your email </small>}
                            </div>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className='text-purple' viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.772 14.772 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" /></svg>

                                    <input id='phonenumber' type='text' placeholder='Your fullname' className='w-full outline-none' {...register("phonenumber", { required: true })} />
                                </div>
                                {errors.fullname && <small className='text-xs text-red'>Enter your phonenumber</small>}
                            </div>



                        </div>
                        <div className='flex flex-col items-end w-full lg:px-14'>
                            <div className='flex flex-col w-full'>
                                <textarea id='message' className='w-full h-32 p-2 border border-gray-500 outline-none ' placeholder='Enter your query' {...register("message", { required: true })} />
                                {errors.message && <small className='text-xs text-red'>Enter your message</small>}
                            </div>
                            <button type='submit' className='w-full px-5 py-3 mt-2 text-center text-white border-2 bg-purple lg:w-40 md:w-40'>{isSubmitting ? "Submitting" : "Submit"}</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Contact