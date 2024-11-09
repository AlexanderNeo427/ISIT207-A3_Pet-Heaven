import React, { useEffect, useRef, useState } from 'react'
import rabbit_1 from '../../assets/images/testimonials/rabbit_01.jpg'
import rabbit_2 from '../../assets/images/testimonials/rabbit_02.jpg'
import cat_1 from '../../assets/images/testimonials/cat_01.jpg'
import cat_2 from '../../assets/images/testimonials/cat_02.jpg'
import cat_3 from '../../assets/images/testimonials/cat_03.jpg'
import cat_4 from '../../assets/images/testimonials/cat_04.jpg'
import dog_1 from '../../assets/images/testimonials/dog_01.jpg'
import dog_2 from '../../assets/images/testimonials/dog_02.jpg'
import dog_3 from '../../assets/images/testimonials/dog_03.jpg'
import dog_4 from '../../assets/images/testimonials/dog_04.jpg'
import dog_5 from '../../assets/images/testimonials/dog_05.jpg'
import dog_6 from '../../assets/images/testimonials/dog_07.jpg'
import dog_7 from '../../assets/images/testimonials/dog_08.jpg'
import { keyframes } from 'framer-motion'

interface TestimonialData {
   imgURL: string
   reviewer?: string
   content?: string
}

interface TestimonialCarouselProps {
   reverseScrollDir?: boolean
   testimonialData: TestimonialData[]
}

const testimonialDataTop: TestimonialData[] = [
   { imgURL: cat_1 },
   { imgURL: dog_1 },
   { imgURL: dog_2 },
   // { imgURL: dog_3 },
   // { imgURL: cat_2 },
   // { imgURL: rabbit_1 },
]

const testimonialDataBottom: TestimonialData[] = [
   { imgURL: dog_4 },
   // { imgURL: cat_3 },
   // { imgURL: dog_5 },
   // { imgURL: dog_6 },
   // { imgURL: cat_4 },
   // { imgURL: rabbit_2 },
   // { imgURL: dog_7 },
]

interface CarouselItemProps {
   widthRem: number
   heightRem: number
   offset: number
   testimonialData: TestimonialData
}

const CarouselItem: React.FC<CarouselItemProps> = props => {
   return (
      <div
         style={{ 
            width: props.widthRem + "rem", 
            height: props.heightRem + "rem", 
            transform: `translateX(${props.offset}rem)`
         }}
         className='absolute rounded-xl outline outline-2 outline-red-400'
      >
         <div
            style={{ backgroundImage: `url(${props.testimonialData.imgURL})` }}
            className='w-full h-full bg-cover rounded-xl'
         ></div>
      </div>
   )
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = props => {
   const WIDTH_REM = 18
   const HEIGHT_REM = 13

   const [m_carouselOffsets, setCarouselOffets] = useState<number[]>([])
   const [m_parentWidthRem, setParentWidthRem] = useState<number>(0)
   const m_animHandle = useRef<number>(-1)
   const m_divRef = useRef<HTMLDivElement>(null)

   // Listen for changes to the "testimonial data" passed via props
   // The nth carousel item can find out it's corresponding translateX via m_carouselOffset[n]
   //
   // Value of m_carouseOffset will be updated via the requestAnimationFrame in a useEffect below
   useEffect(() => {
      setCarouselOffets(
         props.testimonialData.map((_, idx) => {
            return WIDTH_REM * idx
         })
      )
      if (m_animHandle.current) {
         cancelAnimationFrame(m_animHandle.current)
      }
   }, [props.testimonialData])

   // Save the with of the parent container containing the carousel
   // So we know the threshold before having to wrap an element
   useEffect(() => {
      if (m_divRef.current) {
         const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
         setParentWidthRem(m_divRef.current.offsetWidth / remSize)
      }
   }, [m_divRef.current])

   useEffect(() => {
      const SCROLL_SPEED = 5

      let prevTime = 0
      const onTick = (timeElapsed: number): void => {
         const deltaTime = (timeElapsed - prevTime) / 1000;
         prevTime = timeElapsed;

         setCarouselOffets(prevOffsets => {
            return prevOffsets.map(offset => {
               const newOffset = offset +
                  (props.reverseScrollDir ?
                     SCROLL_SPEED * deltaTime : -SCROLL_SPEED * deltaTime)
               if (props.reverseScrollDir) {
                  if (newOffset > m_parentWidthRem) {
                     return newOffset - m_parentWidthRem - WIDTH_REM
                  }
               }
               else {
                  if (newOffset < -WIDTH_REM) {
                     return newOffset + m_parentWidthRem + WIDTH_REM
                  }
               }
               return newOffset
            })
         })
         m_animHandle.current = window.requestAnimationFrame(onTick)
      }
      m_animHandle.current = window.requestAnimationFrame(onTick)
      return () => { 
         if (m_animHandle.current) {
            cancelAnimationFrame(m_animHandle.current) 
         }
      }
   }, [props.testimonialData.length, m_parentWidthRem])

   return (
      <div
         style={{ width: "96%", height: HEIGHT_REM + "rem" }}
         ref={m_divRef} className='relative overflow-hidden outline outline-2 outline-red-700'>
         {props.testimonialData.map((data, idx) => {
            return (
               <CarouselItem
                  key={idx} offset={m_carouselOffsets[idx]}
                  widthRem={WIDTH_REM} heightRem={HEIGHT_REM}
                  testimonialData={data}
               />
            )
         })}
      </div>
   )
}

const TestimonialsSection: React.FC = () => {
   return (
      <section className='min-h-96 bg-gray-600 py-margin-xl flex flex-col items-center gap-6'>
         <TestimonialCarousel testimonialData={testimonialDataTop} />
         <TestimonialCarousel reverseScrollDir testimonialData={testimonialDataBottom} />
      </section>
   )
}

export default TestimonialsSection