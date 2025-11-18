import React from 'react'
import {assets} from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Rückgabe Bedingungen</p>
        <p className='text-gray-400'>Sie können bequem die Waren zurückgeben</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>14-Tage Rückgabe Guarantie</p>
        <p className='text-gray-400'>Sie können in 14 Tagen ohne Fragen Waren zurückgeben</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>24/7 Kundenservice</p>
        <p className='text-gray-400'>Jederzeit unterstützen wir Sie gerne weiter</p>
      </div>
    </div>
  )
}

export default OurPolicy
