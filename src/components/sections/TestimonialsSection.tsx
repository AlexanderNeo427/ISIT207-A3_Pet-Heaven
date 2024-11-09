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

const testimonialDataTop: TestimonialData[] = [
   { imgURL: cat_1 },
   { imgURL: dog_1, reviewer: "Abel Choy", content: "Saepe repellendus reiciendis ducimus at rerum veritatis! Voluptatum at praesentium laborum est sint illum deserunt fugiat, aliquam nobis unde amet, facilis laborum expedita beatae blanditiis autem, ab vitae soluta!" },
   { imgURL: dog_2 },
   { imgURL: dog_3 },
   { imgURL: cat_2 },
   { imgURL: rabbit_1, reviewer: "Jionggo Sapit", content: "Hic illo cum nobis earum harum, facilis laborum expedita beatae blanditiis autem, ab vitae soluta! Fugiat delectus cum recusandae itaque excepturi ipsum!" },
]

const testimonialDataBottom: TestimonialData[] = [
   { imgURL: dog_4, reviewer: "Bob Dylan", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, harum facilis quam a incidunt non veritatis!" },
   { imgURL: cat_3 },
   { imgURL: dog_5 },
   { imgURL: dog_6, reviewer: "Bob Dylan", content: "Quod molestias saepe repellendus reiciendis ducimus at rerum veritatis! Voluptatum at praesentium laborum est. Fugiat unde amet, hic illo cum nobis earum harum, facilis" },
   { imgURL: cat_4 },
   { imgURL: rabbit_2 },
   { imgURL: dog_7 },
]

interface CarouselItemProps {
   widthRem: number
   heightRem: number
   offset: number
   testimonialData: TestimonialData
}

interface TestimonialData {
   imgURL: string
   reviewer?: string
   content?: string
}

interface TestimonialCarouselProps {
   reverseScrollDir?: boolean
   testimonialData: TestimonialData[]
}

const CarouselItem: React.FC<CarouselItemProps> = props => {
   return (
      <div
         style={{
            width: props.widthRem + "rem",
            height: props.heightRem + "rem",
            transform: `translateX(${props.offset}rem)`
         }}
         className='absolute px-5 py5'
      >
         <div className='relative w-full h-full'>
            <div
               style={{ backgroundImage: `url(${props.testimonialData.imgURL})` }}
               className='w-full h-full absolute bg-cover rounded-xl'
            ></div>
            {(props.testimonialData.reviewer && props.testimonialData.content) &&
               <div
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  className='absolute top-0 left-0 right-0 bottom-0 rounded-xl flex flex-col justify-end items-start'>
                  <div className='mx-margin-l mb-margin-l'>
                     <p className='text-text-950 text-lg text-left font-bold'>
                        <i>
                           <span style={{ color: 'rgb(20, 190, 30)' }} className='text-2xl'>"</span>
                           {props.testimonialData.content}
                           <span style={{ color: 'rgb(20, 190, 30)' }} className='text-2xl'>"</span>
                        </i>
                     </p>
                     <span style={{ color: 'rgb(20, 190, 30)' }} className='text-secondary-800 font-bold text-2xl'>
                        - {props.testimonialData.reviewer}
                     </span>
                  </div>
               </div>}
         </div>
      </div>
   )
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = props => {
   const WIDTH_REM = 27
   const HEIGHT_REM = 17

   const [m_windowWidth, setWindowWidth] = useState<number>(-1)
   const [m_carouselOffsets, setCarouselOffets] = useState<number[]>([])
   const [m_parentWidthRem, setParentWidthRem] = useState<number>(0)
   const m_animHandle = useRef<number>(-1)
   const m_divRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const windowResizeHandler = () => {
         setWindowWidth(window.innerWidth)
      }
      window.addEventListener('resize', windowResizeHandler)
      return () => window.removeEventListener('resize', windowResizeHandler)
   }, [])

   // Listen for changes to the "testimonial data" passed via props
   // The nth carousel item can find out it's corresponding translateX via m_carouselOffset[n]
   //
   // Value of m_carouseOffset will be updated via the requestAnimationFrame in a useEffect below
   useEffect(() => {
      setCarouselOffets(
         props.testimonialData.map((_, idx) => WIDTH_REM * idx)
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
      const SCROLL_SPEED = 2

      let prevTime = 0
      const onTick = (timeElapsed: number): void => {
         const deltaTime = (timeElapsed - prevTime) / 1000;
         prevTime = timeElapsed;

         const WRAP_SIZE = WIDTH_REM * (props.testimonialData.length - 1)

         // setCarouselOffets(props.testimonialData.map((_, idx) => WIDTH_REM * idx));
         setCarouselOffets(prevOffsets => {
            return prevOffsets.map(offset => {
               const newOffset = offset +
                  (props.reverseScrollDir ? SCROLL_SPEED * deltaTime : -SCROLL_SPEED * deltaTime)

               if (props.reverseScrollDir) {
                  if (newOffset > m_parentWidthRem) {
                     return newOffset - WRAP_SIZE - WIDTH_REM
                  }
               }
               else {
                  if (newOffset < -WIDTH_REM) {
                     return newOffset + WRAP_SIZE + WIDTH_REM
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
   }, [props.testimonialData.length, m_parentWidthRem, m_windowWidth])

   return (
      <div
         style={{ width: "100%", height: HEIGHT_REM + "rem", minWidth: m_parentWidthRem + "rem" }}
         ref={m_divRef} className='relative overflow-hidden'>
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
      <section className='min-h-96 bg-background-600 py-margin-xl flex flex-col items-center gap-6'>
         <TestimonialCarousel testimonialData={testimonialDataTop} />
         <TestimonialCarousel reverseScrollDir testimonialData={testimonialDataBottom} />
      </section>
   )
}

export default TestimonialsSection