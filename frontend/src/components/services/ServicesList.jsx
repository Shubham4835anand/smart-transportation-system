// ServicesList.jsx
import React from 'react';
import ServicesCard from './ServicesCard';
import { MdHotel } from 'react-icons/md';
import { FaPlaneDeparture } from 'react-icons/fa';
import { IoMdBus } from 'react-icons/io';
import { IoMdCar } from 'react-icons/io';

const ServicesList = () => {
  const services = [
    {
      title: 'Bus Transportation',
      description:
        'Reliable and comfortable bus services for college students and companies commuting between campuses.',
      icon: <IoMdBus />,
    },
    {
      title: 'Car Transportation',
      description:
        'Convenient car services for students traveling to colleges and companies for various academic events.',
      icon: <IoMdCar />,
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {services.map((service, index) => (
        <ServicesCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
