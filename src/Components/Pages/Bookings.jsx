import React from 'react';

const Bookings = () => {

    const bookings = localStorage.getItem('userData'
        )? JSON.parse(localStorage.getItem('userData')) : [];
        console.log(bookings);
    
    return (
        <div>
            <h2 className='text-3xl font-bold text-center my-8'>Booking Details</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           {
                bookings.map((booking, index) => (
                    <div className='card border p-2 ' key={index}>
                        <p  className='font-semibold ' >Type: <span className='text-red-500 font-medium' >{booking.type}</span> </p>
                        <p  className='font-semibold ' >Name: <span className='text-red-500 font-medium' >{booking.name}</span> </p>
                        <p  className='font-semibold ' >Email: <span className='text-red-500 font-medium' >{booking.email}</span> </p>
                        <p  className='font-semibold ' >Date and Time: <span className='text-red-500 font-medium' >{booking.dateTime}</span> </p>
                        <p  className='font-semibold ' >From: <span className='text-red-500 font-medium' >{booking.fromTimes}</span> </p>
                        <p  className='font-semibold ' >To: <span className='text-red-500 font-medium' >{booking.toTimes}</span> </p>
                        <p  className='font-semibold ' >Area: <span className='text-red-500 font-medium' >{booking.area}</span> </p>
                    </div>
                ))
            }
           </div>
        </div>
    );
};

export default Bookings;