import React from 'react';
import 'tailwindcss/tailwind.css';
import card01 from '../assets/images/new1.jpg';
import card02 from '../assets/images/new2.webp';
import card03 from '../assets/images/new3.jpeg';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import SearchBar from '../shared/searchBar/SearchBar';
import ServicesList from '../components/services/ServicesList';
import FeaturedTourList from '../components/featuredTour/FeaturedTourList';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import FaqList from '../components/Faq/FaqList';
import Testimonials from '../components/Testimonials/Testimonials';
import faqImg from '../assets/images/footer.jpg';
import ImagesGallery from '../components/Gallery/Gallery';

const Home = () => {
  return (
    <>
      <div className='min-h-screen bg-cover md:pt-4 px-6 md:px-12 bg-center'>
        {/* {Search Section Starts} */}
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <div className='my-8'>
              <h1 className='text-[33px] font-cursiveFont text-center md:text-[40px] md:text-start font-bold mb-4 '>
                Plan Your Travel for Great Events with{' '}
                <span className='text-BaseColor text-[40px] font-cursiveFont'>
                  Easy Transport
                </span>
              </h1>
              <p className='text-lg leading-8 text-gray-800 hidden md:block'>
                "The transportation service for college students and companies
                ensures safe, efficient, and affordable travel between different
                colleges and companies in Ghaziabad. With a fleet of
                well-maintained buses and shuttle services, students can
                conveniently commute for academic collaborations, inter-college
                events, comapnies tours and training programs. The service
                operates on a fixed schedule, covering major educational
                institutions with designated pick-up and drop-off points.
                Equipped with GPS tracking and emergency support, the
                transportation system prioritizes student safety and punctuality
                while providing a comfortable journey."
              </p>

              <p className='mobpara md:hidden '>
                "Welcome to EasyTravel, your go-to destination for unforgettable
                adventures! Explore diverse destinations, plan seamlessly, and
                embark on a journey of a lifetime."
              </p>
            </div>
          </div>
          <div className='gap-4 grid grid-cols-3 min-h-[200px]'>
            <div className='rounded-lg my-8 overflow-hidden'>
              <img src={card01} className='object-cover h-full' alt='' />
            </div>

            <div className='rounded-lg  overflow-hidden'>
              <img src={card02} className='object-cover h-full' alt='' />
            </div>

            <div className='rounded-lg my-8 overflow-hidden'>
              <img src={card03} className='object-cover h-full' alt='' />
            </div>
          </div>
        </div>
        <SearchBar />
      </div>

      {/* {Services Section Starts} */}
      <section className='py-8 text-center px-6 md:px-12'>
        <h1 className='text-[33px] md:text-[40px] font-cursiveFont font-bold mb-4 text-center'>
          Our{' '}
          <span className='text-BaseColor text-[40px] font-cursiveFont'>
            Best Services
          </span>
        </h1>
        <p className='text-lg leading-8 mb-8 text-gray-800'>
          "Empowering Your Journey: Unrivaled Services Tailored to Elevate Your
          Experience."
        </p>
        {/* Add Slider Component or Carousel Component if needed */}
        <div className='flex justify-center'>
          <ServicesList />
        </div>
      </section>

      {/* {Gallery Section Start} */}
      <section className='py-8 text-center px-6 md:px-12'>
        <h1 className='text-[33px] md:text-[40px] font-cursiveFont font-bold mb-4 text-center'>
          Our{' '}
          <span className='text-BaseColor text-[40px] font-cursiveFont'>
            Gallery
          </span>
        </h1>
        <p className='text-lg leading-8 mb-8 text-gray-800'>
          "Unveil travel wonders in our gallery, a snapshot of EasyTravel's
          adventures."
        </p>
        <ImagesGallery />
      </section>
      {/* {Gallery Section Ends} */}
      <section className='min-h-screen py-8 px-6 md:px-12'>
        <h1 className='text-[40px] md:text-[40px] font-cursiveFont font-bold mb-4 text-center text-BaseColor'>
          Featured Institution
        </h1>
        <p className='para md:text-lg md:leading-8 md:text-gray-800'>
          "Discover top-ranked institutions known for academic excellence,
          cutting-edge research, and outstanding student experiences."
        </p>
        <div className=''>
          <FeaturedTourList />
        </div>
      </section>
      {/* {Featured seactiton ends} */}

      {/* {Testimonials section start} */}
      <section className=' md:max-h-[550px]'>
        <div className='py-8 px-6 md:px-12'>
          <div className='mx-auto text-center xl:w-[470px]'>
            <h1 className='text-[33px] md:text-[40px] font-cursiveFont font-bold mb-4 text-center '>
              Our{' '}
              <span className='text-BaseColor text-[40px] font-cursiveFont '>
                Reviews
              </span>
            </h1>
            <p className='text-lg font-paraFont font-bold leading-8 mb-8 text-gray-800'>
              "Smooth and efficient inter-college transport! The buses are
              punctual, well-maintained, and make commuting hassle-free. A
              reliable service for students and companies!"
            </p>
          </div>
          <Testimonials />
        </div>
      </section>
      {/* {Testimonials section ends} */}

      {/* {faq Section Start} */}
      <section>
        <div className='px-6 md:px-12 py-6'>
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img src={faqImg} alt='' />
            </div>

            <div className='w-full md:w-1/2'>
              <h2 className='text-3xl text-BaseColor font-cursiveFont  font-bold text-center'>
                Frequently Asked Question.
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* {faq Section ends} */}
    </>
  );
};

export default Home;
