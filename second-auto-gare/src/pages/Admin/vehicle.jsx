import React from 'react';
import { Card } from "../../components/common/card"
import { getData } from "../../service/axiosservice"
import { useEffect, useState } from "react"
import { Button } from "../../shadcn_ui/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn_ui/ui/tabs"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

function Vehicle() {
    const [vehicle, setVehicle] = useState()

    const getVehicle = async () => {
        try {
            const resp = await getData("/api/v1/get_allvehicles");
            setVehicle(resp);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    console.log(vehicle)

    const handelSearch = async (e) => {
        const resp = await getData(`/api/v1/vehicle/?brand=${e}`)
        setVehicle(resp);
    }

    const vehicleSearchColor = async (e) => {
        const resp = await getData(`/api/v1/vehicle/color/?color=${e}`)
        setVehicle(resp);
    }

    const vehicleSearchTransmission = async (e) => {
        const resp = await getData(`/api/v1/vehicle/transmission/?transmission=${e}`)
        setVehicle(resp);
    }

    const vehicleSearchFule = async (e) => {
        const resp = await getData(`/api/v1/vehicle/fule_type/?fule_type=${e}`)
        setVehicle(resp);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    useEffect(() => {
        getVehicle()

    }, [])
    return (
        <>
            <div className="flex flex-col w-full gap-80 lg:gap-12 md:gap-14">
                <div className="relative z-50 w-full h-40 gap-20 bg-purple ">
                    <div className="absolute flex flex-wrap justify-center w-full gap-8 lg:flex-nowrap md:flex-nowrap lg:top-20 md:top-12 top-12">
                        <Card>
                            <div className="flex flex-col animate__animated animate__fadeInUp">
                                <div className="flex justify-between">
                                    <h1 className="text-2xl">Total Vehicles</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="p-2 rounded-md bg-purple bg-opacity-20 text-purple">
                                        <path fill="currentColor" d="M6 19v1q0 .425-.288.713T5 21H4q-.425 0-.712-.288T3 20v-8l2.1-6q.15-.45.538-.725T6.5 5H9V3h6v2h2.5q.475 0 .863.275T18.9 6l2.1 6v8q0 .425-.287.713T20 21h-1q-.425 0-.712-.288T18 20v-1zm-.2-9h12.4l-1.05-3H6.85zM5 12v5zm2.5 4q.625 0 1.063-.437T9 14.5q0-.625-.437-1.062T7.5 13q-.625 0-1.062.438T6 14.5q0 .625.438 1.063T7.5 16m9 0q.625 0 1.063-.437T18 14.5q0-.625-.437-1.062T16.5 13q-.625 0-1.062.438T15 14.5q0 .625.438 1.063T16.5 16M5 17h14v-5H5z" />
                                    </svg>
                                </div>
                                <h1 className="text-5xl text-purple">
                                    {vehicle?.count ? vehicle?.count : "0"}
                                </h1>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex flex-col animate__animated animate__fadeInUp">
                                <div className="flex justify-between">
                                    <h1 className="text-2xl">For Sale</h1>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="p-2 rounded-md bg-purple bg-opacity-20 text-purple" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8m-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184M232 93.37A40.81 40.81 0 0 1 210.63 72H232ZM45.37 72A40.81 40.81 0 0 1 24 93.37V72ZM24 162.63A40.81 40.81 0 0 1 45.37 184H24ZM210.63 184A40.81 40.81 0 0 1 232 162.63V184Z" /></svg>
                                </div>
                                <h1 className="text-5xl text-purple">
                                    {vehicle?.data?.filter((e) => e.status === "sell").length ? vehicle?.data?.filter((e) => e.status === "sell").length : "0"}
                                </h1>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex flex-col animate__animated animate__fadeInUp">
                                <div className="flex justify-between">
                                    <h1 className="text-2xl">For Rent</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="p-2 rounded-md bg-purple bg-opacity-20 text-purple" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8.385 6.885q-1.042 0-1.771-.729q-.73-.728-.73-1.77q0-1.04.73-1.77t1.77-.731q.893 0 1.562.572t.904 1.428h7.265v1h-1v2h-1v-2H10.85q-.235.855-.904 1.428q-.67.572-1.561.572m0-1q.617 0 1.058-.442q.442-.441.442-1.058q0-.618-.442-1.059q-.441-.441-1.058-.441q-.618 0-1.059.44q-.441.442-.441 1.06q0 .617.441 1.058q.441.442 1.059.442m.23 11.038q.31 0 .54-.23q.23-.23.23-.54q0-.309-.23-.539q-.23-.23-.54-.23q-.31 0-.539.23q-.23.23-.23.54q0 .31.23.54q.23.23.54.23m6.769 0q.31 0 .539-.23q.23-.23.23-.54q0-.31-.23-.54q-.23-.23-.54-.23q-.309 0-.539.23q-.23.23-.23.54q0 .31.23.54q.23.23.54.23M6 14.407l1.496-4.3q.067-.216.241-.335q.174-.12.386-.12h7.754q.212 0 .386.12q.174.12.24.335l1.497 4.3V20.2q0 .199-.128.326q-.127.128-.326.128h-.092q-.199 0-.326-.128Q17 20.4 17 20.2v-1.546H7V20.2q0 .199-.128.326q-.127.128-.326.128h-.092q-.199 0-.326-.128Q6 20.4 6 20.2zm1.304-.754h9.392l-1.046-3h-7.3zm-.304 1v3zm0 3h10v-3H7z" /></svg>
                                </div>
                                <h1 className="text-5xl text-purple">{vehicle?.data?.filter((e) => e.status === "rent").length ? vehicle?.data?.filter((e) => e.status === "rent").length : "0"}</h1>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="w-full px-2">
                    <div className='flex items-center justify-between h-20 gap-2'>
                        <div className='flex flex-col w-full gap-2'>
                            <label className='text-lg font-light'>Filter by brand</label>
                            <select className='h-8 pl-2 overflow-auto transition duration-500 ease-in-out rounded' onChange={(e) => e.target.value && handelSearch(e.target.value)}>
                                <option disabled selected>Select an option</option>
                                <option value="kia">KIA</option>
                                <option value="hundai">Hundai</option>
                                <option value="nissan">Nissan</option>
                                <option value="toyota">Toyota</option>
                                <option value="ford">Ford</option>
                                <option value="honda">Honda</option>
                                <option value="mitsubisi">Mitsubisi</option>
                                <option value="renult">Renult</option>
                                <option value="mercedes">Mercedes</option>

                                <option value="bmw">BMW</option>
                                <option value="suzuki">Suzuki</option>
                                <option value="mahendra">Mahendra</option>
                                <option value="jeep">Jeep</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label className='text-lg font-light'>Filter by color</label>
                            <select className='h-8 pl-2 duration-700 rounded' onChange={(e) => e.target.value && vehicleSearchColor(e.target.value)}>
                                <option disabled selected>Select an option</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                                <option value="gray">Gray</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label className='text-lg font-light'>Filter by transmission</label>
                            <select className='h-8 pl-2 rounded' onChange={(e) => e.target.value && vehicleSearchTransmission(e.target.value)}>
                                <option disabled selected>Select an option</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label className='text-lg font-light'>Filter by fule type</label>
                            <select className='h-8 pl-2 rounded' onChange={(e) => e.target.value && vehicleSearchFule(e.target.value)}>
                                <option disabled selected>Select an option</option>
                                <option value="petrol">Petrol</option>
                                <option value="desele">Desele</option>
                                <option value="electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                    <Tabs defaultValue="account" className="w-full ">
                        <TabsList className="grid w-full grid-cols-2 gap-4 bg-gray-500 bg-opacity-40">
                            <TabsTrigger className='w-full vehicle-sell h-8  data-[state=active]:bg-red rounded-md data-[state=active]:text-white text-lg duration-500' value="account">Sell</TabsTrigger>
                            <TabsTrigger value="password" className='w-full h-8 vehicle-rent rounded-md data-[state=active]:bg-green data-[state=active]:text-white text-lg duration-300' >Rent</TabsTrigger>
                        </TabsList>
                        {
                            vehicle ? <>
                            <TabsContent value="account"><div className="grid gap-5 px-2 mt-8 place-items-center gap-x-4 lg:grid-cols-3 md:gris-cols-3 sm:grid-cols-1">
                                {vehicle?.data.filter((e) => e.status === "sell").map((i) => {
                                    return <div key={i.id} className="flex flex-col items-center w-full gap-3 px-2 border shadow-[0px_0px_6px_2px_#00000024]">
                                        <div>
                                            <div>Car Details</div>
                                        </div>
                                        <div className="grid gap-4">
                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={30}
                                                keyboard={{
                                                    enabled: true,
                                                }}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                navigation={true}
                                                modules={[Keyboard, Pagination, Navigation]}
                                                className="mySwiper"
                                            >
                                                {
                                                    i?.imageUrl.map((e) => {
                                                        return <SwiperSlide key={e.id} className='h-40'>
                                                            <img src={e} className='object-contain' />
                                                        </SwiperSlide>
                                                    })
                                                }

                                            </Swiper>
                                            <div className="text-center">
                                                <h2 className="text-2xl font-semibold">{i?.model}</h2>
                                                <p className="text-gray-500 dark:text-gray-400">Rs-{i?.price}</p>
                                            </div>
                                            <form className="flex flex-col gap-2">
                                                <div className='grid grid-cols-2 gap-1'>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold">
                                                            Brand
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="brand"
                                                            type="text"
                                                            defaultValue={i?.brand} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="color">
                                                            Color
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="color"
                                                            type="text"
                                                            defaultValue={capitalizeFirstLetter(i?.color)} />
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-2 gap-1'>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="year">
                                                            Year of Manufacture
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="year"
                                                            type="text"
                                                            value="2020" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="mileage">
                                                            Mileage
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="mileage"
                                                            type="text"
                                                            value="15" />
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                    <label className="text-sm font-semibold" htmlFor="fuel_type">
                                                        Fuel Type
                                                    </label>
                                                    <input
                                                        className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                        id="fuel_type"
                                                        type="text"
                                                        defaultValue="Petrol" />
                                                </div>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="transmission">
                                                            Transmission Type
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="transmission"
                                                            type="text"
                                                            defaultValue={i?.transmission} />
                                                    </div></div>

                                                <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                    <label className="text-sm font-semibold" htmlFor="doors">
                                                        Number of Doors
                                                    </label>
                                                    <input
                                                        className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                        id="doors"
                                                        type="text"
                                                        defaultValue={i?.doors} />
                                                </div>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="people">
                                                            Number of People
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="people"
                                                            type="text"
                                                            defaultValue={i?.number_of_people} />
                                                    </div></div>

                                                <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                    <label className="text-sm font-semibold" htmlFor="displacement">
                                                        Displacement
                                                    </label>
                                                    <input
                                                        className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                        id="displacement"
                                                        type="text"
                                                        defaultValue={i?.displacement} />
                                                </div>
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="category">
                                                            Category
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="category"
                                                            type="text"
                                                            defaultValue={i?.category} />
                                                    </div></div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-semibold" htmlFor="status">
                                                        Status
                                                    </label>
                                                    <select className='w-full h-8 pl-2 '>
                                                        <option disabled selected defaultValue={i?.status}>{i?.status}</option>
                                                        <option value="sell">Sell</option>
                                                        <option value="rent">Rent</option>
                                                    </select>
                                                </div>
                                                <div className="flex w-full gap-2">

                                                    <Button className="w-full h-8 text-white rounded bg-blue">Update</Button>
                                                    <Button className="w-full h-8 text-white rounded bg-red">Delete</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>;
                                })}
                            </div></TabsContent>
                                
                                <TabsContent value="password"> <div className="grid gap-5 px-2 mt-8 place-items-center gap-x-4 lg:grid-cols-3 md:gris-cols-3 sm:grid-cols-1">
                                    {vehicle?.data.filter((e) => e.status === "rent").map((i) => {
                                        return <div key={i.id} className="flex flex-col items-center w-full gap-3 px-2 border shadow-[0px_0px_6px_2px_#00000024]">
                                            <div>
                                                <div>Car Details</div>
                                            </div>
                                            <div className="grid gap-4">
                                                <Swiper
                                                    slidesPerView={1}
                                                    spaceBetween={30}
                                                    keyboard={{
                                                        enabled: true,
                                                    }}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    navigation={true}
                                                    modules={[Keyboard, Pagination, Navigation]}
                                                    className="mySwiper"
                                                >
                                                    {
                                                        i?.imageUrl.map((e) => {
                                                            return <SwiperSlide key={e.id} className='h-40'>
                                                                <img src={e} className='object-contain' />
                                                            </SwiperSlide>
                                                        })
                                                    }

                                                </Swiper>
                                                <div className="text-center">
                                                    <h2 className="text-2xl font-semibold">{i?.model}</h2>
                                                    <p className="text-gray-500 dark:text-gray-400">Rs-{i?.price}</p>
                                                </div>
                                                <form className="flex flex-col gap-2">
                                                    <div className='grid grid-cols-2 gap-1'>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold">
                                                                Brand
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="brand"
                                                                type="text"
                                                                defaultValue={i?.brand} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="color">
                                                                Color
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="color"
                                                                type="text"
                                                                defaultValue={capitalizeFirstLetter(i?.color)} />
                                                        </div>
                                                    </div>

                                                    <div className='grid grid-cols-2 gap-1'>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="year">
                                                                Year of Manufacture
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="year"
                                                                type="text"
                                                                value="2020" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="mileage">
                                                                Mileage
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="mileage"
                                                                type="text"
                                                                value="15" />
                                                        </div>
                                                    </div>

                                                    <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="fuel_type">
                                                            Fuel Type
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="fuel_type"
                                                            type="text"
                                                            defaultValue="Petrol" />
                                                    </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="transmission">
                                                                Transmission Type
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="transmission"
                                                                type="text"
                                                                defaultValue={i?.transmission} />
                                                        </div></div>

                                                    <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="doors">
                                                            Number of Doors
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="doors"
                                                            type="text"
                                                            value="4" />
                                                    </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="people">
                                                                Number of People
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="people"
                                                                type="text"
                                                                value="5" />
                                                        </div></div>

                                                    <div className='grid grid-cols-2 gap-1'><div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="displacement">
                                                            Displacement
                                                        </label>
                                                        <input
                                                            className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                            id="displacement"
                                                            type="text"
                                                            value="1200" />
                                                    </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-semibold" htmlFor="category">
                                                                Category
                                                            </label>
                                                            <input
                                                                className="w-full h-8 p-2 border border-gray-300 rounded-md"
                                                                id="category"
                                                                type="text"
                                                                value="compactsuv" />
                                                        </div></div>

                                                    <div className="space-y-1">
                                                        <label className="text-sm font-semibold" htmlFor="status">
                                                            Status
                                                        </label>
                                                        <select className='w-full h-8 pl-2 '>
                                                            <option value="sell">Sell</option>
                                                            <option value="rent">Rent</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex w-full gap-2">

                                                        <Button className="w-full h-8 text-white rounded bg-blue">Update</Button>
                                                        <Button className="w-full h-8 text-white rounded bg-red">Delete</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>;
                                    })}
                            </div></TabsContent></> : <div className='flex justify-center'>No vehicle found🚗</div>
                        }

                    </Tabs>

                </div>
            </div>

        </>
    )
}

export default Vehicle