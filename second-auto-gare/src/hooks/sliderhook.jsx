import React from 'react'
import { useSwiper } from 'swiper/react'

function SliderHook() {
    const swiper = useSwiper()
  return (
      <div className='absolute top-0 z-50 flex justify-between w-full px-4'>
          <button className='text-white rounded-full bg-purple' onClick={() => swiper.slidePrev()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14.41 18.16L8.75 12.5l5.66-5.66l.7.71l-4.95 4.95l4.95 4.95z" />
              </svg>
          </button>
          <button className='text-white rounded-full bg-purple' onClick={() => swiper.slideNext()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m8.59 18.16l5.66-5.66l-5.66-5.66l-.7.71l4.95 4.95l-4.95 4.95z" />
              </svg>
          </button>
      </div>
  )
}

export default SliderHook
