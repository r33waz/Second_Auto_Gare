import CategorySearch from '../../components/common/categorysearch'
import React from 'react'
import sideProfileCar from "../../assets/images/sideprofile.png"
import { Fade } from 'react-awesome-reveal'

function Category() {
    return (
        <div className='container mx-auto'>
            <section className='mt-8 lg:mt-16 md:mt-14'>
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
        </div>
    )
}

export default Category