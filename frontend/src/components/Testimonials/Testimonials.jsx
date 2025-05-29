import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import avatar1 from '../../assets/images/one.jpg';
import avatar2 from '../../assets/images/four.jpg';
import avatar3 from '../../assets/images/two.jpg';
import avatar4 from '../../assets/images/three.jpg';
import avatar5 from '../../assets/images/five.jpg';

const Testimonials = () => {
  const testimonialsData = [
    {
      pic: avatar1,
      name: 'Vatsal Pandey',
      description:
        'Excellent learning environment with modern labs and industry-focused curriculum',
    },
    {
      pic: avatar2,
      name: 'Upender Taliyan',
      description:
        'Great faculty and infrastructure. Placements are good, and the campus is well-maintained.',
    },
    {
      pic: avatar3,
      name: 'Tanmay Teotia',
      description:
        'Good college with experienced professors. However, campus facilities could be improved.',
    },
    {
      pic: avatar4,
      name: 'Raj Mishra',
      description:
        'Strong industry tie-ups and decent placements. The hostel facilities are satisfactory.',
    },
    {
      pic: avatar5,
      name: 'Shubham Anand',
      description:
        'One of the best B-schools in Ghaziabad, offering quality education and great networking opportunities.',
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {testimonialsData.map((data, index) => (
        <div className=' py-4 px-6'>
          <p>{data.description}</p>
          <div className='flex items-center gap-4 mt-8'>
            <div className='w-[75px] h-[75px] rounded-full overflow-hidden'>
              <img
                src={data.pic}
                className='w-full h-full object-contain'
                alt={data.name}
              />
            </div>
            <div>
              <div>
                <h5 className='mb-0 mt-3'>{data.name}</h5>
                <p className='text-GrayColor'>Customer</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
