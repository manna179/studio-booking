import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-bars loading-xl"></span>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center my-8">Welcome to Studio Booking Page</h1>

      {/* Studio List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.Studios?.length > 0 ? (
  data.Studios.map((info, idx) => (
    <div key={idx} className="border p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">{info?.Name}</h2>
      <p><strong>Type:</strong> {info?.Type}</p>
      <div> Location: 
        <li>City: {info?.Location?.City}</li>
        <li>Area:  {info?.Location?.Area}</li>
        <li>Address:{info?.Location?. Address}</li>
      </div>
      <div>
        <h2>Amenities : </h2>
        {/* {info?.Amenities.map((item,index)=><div itemID={item} key={index}>
        <li>{item[0]}</li>
        <li></li>
        <li></li>
        </div>)} */}
        <li>{info?.Amenities[0]}</li>
        <li>{info?.Amenities[1]}</li>
        <li>{info?.Amenities[2]}</li>
        
        
      </div>
      <p><strong>Price per hour:</strong> {info?.PricePerHour} {info?.Currency}</p>
      
     
      <p><strong>Rating:</strong> {info?.Rating} ⭐</p>
      <button className="btn btn-neutral">Booking</button>
    </div>
  ))
) : (
  <p>No studios available.</p>
)}

      </div>
    </div>
  );
};

export default Home;
