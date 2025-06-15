import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../assets/images/avatar.jpg';
import { FaPeopleGroup, FaLocationDot } from 'react-icons/fa6';
import { FaStar, FaMapPin, FaCity, FaDollarSign } from 'react-icons/fa';
import CalculateAvg from '../utils/CalculateAvg';
import Booking from '../components/Booking/Booking';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
  const { user } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const {
    apiData: tour,
    isLoading,
    error,
  } = useFetch(`${BASE_URL}/api/tour/${id}`);
  const {
    title = '',
    photo = '',
    desc = '',
    price = '',
    reviews = [],
    city = '',
    distance = '',
    maxGroupSize = '',
    address = '',
  } = tour || {};

  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const { totalRating, avgRating } = CalculateAvg(reviewsArray);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      toast.error('Please Sign In first');
      return;
    }

    try {
      const reviewData = {
        username: user.username,
        reviewText,
        rating: tourRating,
      };
      const response = await fetch(`${BASE_URL}/api/review/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      const result = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Server not responding');
      console.log(err);
    }
  };

  // 🟡 While loading
  if (isLoading)
    return <p className='text-center py-8'>Loading tour details...</p>;

  // 🔴 If error
  if (error || !tour || !photo)
    return <p className='text-center text-red-500'>Failed to load tour.</p>;

  return (
    <section className='my-4 px-12 w-full'>
      <div>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-shrink-0'>
            <div className='max-w-3xl max-h-[400px] rounded-md overflow-hidden'>
              <img
                src={photo}
                alt={title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='my-8 overflow-hidden border-[2px] shadow-sm border-gray-200 rounded-md space-y-4 px-2 py-2 md:px-8 md:py-8 mx-auto'>
              <h2 className='text-[25px] md:text-[40px] font-bold mb-4 text-center md:text-start text-BaseColor'>
                {title}
              </h2>

              <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-12'>
                <div className='flex items-center gap-2'>
                  <FaStar />
                  <span>
                    {avgRating} ({reviewsArray.length})
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaMapPin />
                  <span>{address}</span>
                </div>
              </div>

              <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-12'>
                <div className='flex items-center gap-2'>
                  <FaCity />
                  <span>{city}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaLocationDot />
                  <span>{distance}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaDollarSign />
                  <span>Rs. {price} / per head</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaPeopleGroup />
                  <span>{maxGroupSize}</span>
                </div>
              </div>

              <h3 className='text-[22px] text-center md:text-start md:text-[30px]'>
                Description
              </h3>
              <p className='mobpara md:para'>{desc}</p>
            </div>

            <h3 className='text-[25px] md:text-[35px] font-bold mb-4 text-center md:text-start'>
              Reviews ({reviewsArray.length} reviews)
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-1 my-2'>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={`cursor-pointer ${
                      tourRating === num
                        ? 'text-orange-800'
                        : 'text-orange-500 hover:text-orange-800'
                    }`}
                    onClick={() => setTourRating(num)}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>

              <div className='flex my-8 gap-4 w-full border border-BaseColor rounded-full overflow-hidden'>
                <input
                  type='text'
                  ref={reviewMsgRef}
                  placeholder='Share your thoughts'
                  className='focus:outline-none w-2/3 flex-1 py-2 px-4'
                />
                <button
                  className='bg-BaseColor hover:bg-BHoverColor transition-all py-2 px-4 my-1 mx-1 text-white rounded-full'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>

            <div>
              {reviewsArray?.map((review, index) => (
                <div className='py-3 px-4' key={index}>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full border border-black overflow-hidden'>
                      <img src={avatar} alt='avatar' />
                    </div>
                    <div>
                      <h5 className='text-lg font-semibold'>
                        {review.username}
                      </h5>
                      <p className='text-gray-700 text-sm'>
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-US',
                          options
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center py-3 px-12 justify-between'>
                    <h5 className='text-lg'>{review.reviewText}</h5>
                    <span className='flex items-center gap-1'>
                      {review.rating}
                      <FaStar className='text-BaseColor' />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='w-full px-6 rounded-md'>
            <Booking
              title={title}
              price={price}
              avgRating={avgRating}
              reviewsArray={reviewsArray}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
