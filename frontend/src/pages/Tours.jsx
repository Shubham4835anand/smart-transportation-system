import React from 'react';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../utils/config';
import TourCard from '../shared/TourCard';
import SearchTours from '../components/Search/SearchTours';

const Tours = () => {
  const { apiData: tours, error } = useFetch(`${BASE_URL}/api/tour`);

  return (
    <div>
      <SearchTours />
      <section className='min-h-screen py-8 px-6 md:px-12'>
        {error && (
          <p className='text-red-500 text-center mb-4'>
            Failed to load tours. Please try again later.
          </p>
        )}

        {!tours ? (
          <p className='text-center'>Loading tours...</p>
        ) : (
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {tours.length === 0 ? (
              <p className='text-center col-span-full'>No tours available</p>
            ) : (
              tours.map((tour) => (
                <div key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Tours;
