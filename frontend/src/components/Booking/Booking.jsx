import React, { useState, useContext, useEffect } from 'react';
import { FaStar } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import BASE_URL from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const Booking = ({ price, title, reviewsArray, avgRating }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Assuming the price is in USD and you want to convert to INR
  const conversionRate = 83; // Example conversion rate
  const priceInINR = Number(price); // Convert price to INR

  const [data, setData] = useState({
    userId: user && user._id,
    tourName: title,
    fullName: '',
    totalPrice: priceInINR,
    phone: '',
    maxGroupSize: 1,
    bookAt: currentDate,
    date: '',
  });

  const calculatedPrice = data.maxGroupSize * priceInINR;

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      tourName: title,
      totalPrice: calculatedPrice,
    }));
  }, [title, calculatedPrice]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const formattedPrice = Number(priceInINR).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please Sign In first');
      return;
    }

    const {
      userId,
      fullName,
      phone,
      date,
      totalPrice,
      tourName,
      maxGroupSize,
    } = data;

    if (
      !userId ||
      !fullName ||
      !phone ||
      !date ||
      !totalPrice ||
      !tourName ||
      !maxGroupSize
    ) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Booked');
        navigate('/booked');
      } else {
        toast.error(result.message || 'Booking failed');
        console.error('Server response:', result);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Server not responding');
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center '>
        <h3 className='text-[25px] md:text-[40px]  font-bold mb-4 text-start text-BaseColor'>
          ₹{priceInINR.toFixed(2)} <span>/per person</span>
        </h3>
        <div className='flex items-center gap-2'>
          <i>
            <FaStar />
          </i>
          <span className='flex gap-1'>
            <div>{avgRating}</div>
            <div>({reviewsArray.length})</div>
          </span>
        </div>
      </div>

      <div className='py-6 space-y-4'>
        <h5 className='text-[18px] md:text-2xl font-semibold'>
          Booking Information
        </h5>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className='booking_input'
              type='text'
              placeholder='Full Name'
              id='fullName'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className='booking_input'
              type='text'
              placeholder='Contact No.'
              id='phone'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className='booking_input'
              type='number'
              placeholder='Number of Persons?'
              id='maxGroupSize'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className='booking_input'
              type='date'
              id='date'
              required
              onChange={handleChange}
            />
          </div>
          <div className='mt-12'>
            <div className='flex my-4 justify-between'>
              <span>Gross Price: </span>
              <p className='font-semibold'>₹{priceInINR.toFixed(2)}</p>
            </div>
            <div className='flex my-4 border-b-[1px] pb-2 border-black justify-between'>
              <span>GST: </span>
              <p className='font-semibold'>0%</p>
            </div>
            <div className='flex my-6 justify-between font-bold text-lg'>
              <span>Net Price: </span>
              <p>₹{calculatedPrice.toFixed(2)}</p>
            </div>
          </div>
          <button type='submit' className='btn w-full'>
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
