import React from 'react'

function Contact() {
    return (
        <div className='container mx-auto'>
            <section>
                <div className="flex justify-center items-center h-96 bg-[url('assets/images/sportage.jpg')] bg-opacity-30" >
                    <div className='flex flex-col items-center gap-2'>
                        <h1 className='text-5xl font-semibold'>Let's make something awsome together</h1>
                        <h2 className='text-lg '>Drop us a line,or give us a heads up if you're intrested in visiting us</h2>
                    </div>
                </div>
            </section>
            <section>
                <h1 className='pt-3 text-4xl font-thin text-center'>Get in touch</h1>
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
            <section className='mt-8 '>
                <form>
                    <div className='flex items-center justify-center '>
                        <div className='p-3 border-2'>
                            <div className='flex p-2 border border-gray-600 rounded-md lg:w-[450px] '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8" /></svg>
                                <input />
                            </div>
                        </div>
                        
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Contact