import React from 'react'
import googlePlay from '../../assets/Image/googlePlay.png'
import appStore from '../../assets/Image/appStore.png'
import arrow from '../../assets/Image/arrow-down.png'
import footerImage from '../../assets/Image/footerImage.png'
import Image from 'next/image'

export default function Application() {
  return (
    <div className="mb-14 md:container my-28">
      <div className=" px-7">
        <div className="lg:flex lg:justify-between items-center">
            <div className='flex flex-col lg:items-start justify-center items-center w-full lg:w-1/3 relative'>
                <div className="content">
                <h3 className="xl:text-[40px] lg:text-[30px] md:text-[20px] text-right font-[500] my-4 lg:my-3 md:w-[400px]">مهمتنا هي توفير خدمات منزلك بأقل التكاليف</h3>
                <p className='text-[20px] font-[400] text-[#ADB3DA]'>حمل تطبيقنا مجانا </p>
                <p className='text-[20px] font-[400] text-[#ADB3DA]'> استمتع بالطلب السريع للفني و الخدمة في اي وقت  </p>
                </div>
                <div className='lg:absolute lg:-left-[30%] top-[50%] w-[80px]'><Image src={arrow} alt='arrow' className='w-full'></Image></div>
                <div className='flex items-center gap-5'>
                    <Image src={appStore} alt='appStore' className='md:w-[160px] w-[120px]'></Image>
                    <Image src={googlePlay} alt='googlePlay' className='md:w-[200px] w-[160px]'></Image>
                </div>
                
            </div>
            <div className='lg:w-[500px] h-full'>
                <div className='h-[450px] relative w-full'>
                    <div className='h-[450px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] z-30'><Image src={footerImage} alt='footerImage' className='w-full'></Image></div>
                    <div className='md:h-[400px] md:w-[400px] h-[250px] w-[250px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#eeeeffd2] z-20'></div>
                    <div className='md:h-[200px] md:w-[200px] h-[200px] w-[200px] absolute md:top-0 md:left-0 top-[15%] left-[10%]  rounded-full bg-[#F7F7FF] z-10'></div>
                    <div className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] absolute md:bottom-[0%] md:right-[10%] bottom-[15%] right-[10%] rounded-full bg-[#F7F7FFB0] z-10'></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
