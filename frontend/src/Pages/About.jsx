import React from 'react'
import Title from '../Components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever is a modern clothing brand built on the idea that great style is timeless. We blend current fashion trends with classic designs to create versatile collections that suit every mood, moment, and personality. Whether you're looking for everyday comfort or standout pieces, our goal is to help you express yourself with confidence and ease.</p>
          <p>At Forever, quality and authenticity matter. Each garment is carefully crafted using premium fabrics and ethical production practices. We’re committed to delivering fashion that not only looks good but also feels right — clothes you’ll reach for today, tomorrow, and for years to come. Because true style lasts Forever.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission is to create timeless, high-quality fashion that empowers individuals to express their true selves with confidence. At Forever, we aim to bridge the gap between trend and tradition by designing clothing that feels current yet enduring. We are committed to sustainability, ethical craftsmanship, and providing an inclusive fashion experience that inspires people to look good, feel good, and live boldly — today and forever.</p>
        </div>
      </div>

        <div className='text-xl py-4 '>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5 '>
            <b> Quality Assurance: </b>
            <p className='text-gray-600'>We ensure the highest standards of quality by using premium fabrics and conducting thorough checks at every stage of production.</p>
          </div>
          <div className='border-t border-b px-10 md:px-16 sm:py-20 flex flex-col gap-5 '>
            <b> Convenience </b>
            <p className='text-gray-600'>Shopping with Forever is simple, seamless, and accessible — from easy navigation to fast, reliable delivery right to your doorstep.</p>
          </div>
          <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5 '>
            <b> Exceptional Customer Service: </b>
            <p className='text-gray-600'>Our dedicated support team is here to ensure a smooth, personalized experience, ready to assist you at every step with care and promptness.</p>
          </div>
        </div>
        <NewsLetterBox/>
    </div>
  )
}

export default About
