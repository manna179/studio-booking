import React, { useEffect, useState } from "react";


// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import 'rsuite/TimePicker/styles/index.css';
// If you are using Less, import the `index.less` file.
import 'rsuite/Button/styles/index.css';

import toast, { Toaster } from "react-hot-toast";


const Home = () => {
  const [data, setData] = useState({ Studios: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudios, setFilteredStudios] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalId,setModalId]= useState(null)
 
  const [dates,setDates]=useState('')
  const [fromTime,SetFromTime]=useState('')
  const [toTime,setToTime]=useState('')

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data || { Studios: [] });
        setFilteredStudios(data?.Studios || []);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);


  const handleOpenModal = (id) => {
    setModalId(id)
    document.getElementById('my_modal_1').showModal()
  }
  const findById  = data?.Studios?.find(item => item.Id === modalId);
  console.log("Find by id",findById?.Name);



  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!data.Studios) return;

    // Extract unique areas
    const areas = [
      ...new Set(
        data.Studios.map((studio) => studio?.Location?.Area).filter(Boolean)
      ),
    ];
    const filteredSuggestions = areas.filter((area) =>
      area.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    // Filter Studios by Area/City
    const filtered = data.Studios.filter(
      (studio) =>
        studio?.Location?.Area?.toLowerCase().includes(term.toLowerCase()) ||
        studio?.Location?.City?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudios(filtered);
  };

  // Select a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const filtered = data.Studios.filter(
      (studio) =>
        studio?.Location?.Area?.toLowerCase() === suggestion.toLowerCase() ||
        studio?.Location?.City?.toLowerCase() === suggestion.toLowerCase()
    );
    setFilteredStudios(filtered);
  };


  // handle timezone
  const handleFromTimeChange=(event) => {
    SetFromTime(event.target.value)
    console.log("time from timezone",event.target.value)
  }
  const handleToTimeChange=(event) => {
    setToTime(event.target.value)
    console.log("time to timezone",event.target.value)
  }

  // handle setDate
  const handleDateChange=(event) => {
    setDates(event.target.value)
    console.log("date from datepicker",event.target.value)
  }

  //  form
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const fromTimes = fromTime;
    const toTimes = toTime; 

    const dateTime = dates;
    const area = findById?.Location?.Area
    const city = findById?.Location?.City
    const type = findById?.Type
    const name = form.userName.value;
    const email = form.userEmail.value;
    const newBooking  = {fromTimes, toTimes,email,dateTime,name,area,city,type}
    const existingBookings = JSON.parse(localStorage.getItem("userData")) || [];
    
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("userData", JSON.stringify(updatedBookings));
    localStorage.setItem('userData', JSON.stringify(updatedBookings))
    toast.success('Booking saved successfully!')
   
    
    form.reset()
    
    console.log("form submitted",updatedBookings)
  }

  if (loading) return <span className="loading loading-bars loading-xl"></span>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mb-10 ">
      <h1 className="text-4xl font-bold mb-4 text-center my-8">
        Welcome to Studio Booking Page
      </h1>

      {/* Search Bar */}
      <div className="mb-6 relative w-11/12 mx-auto">
      <div className="flex justify-end items-center">
      <label className="font-medium"> Search By Area : </label> 
        <input
          type="text"
          placeholder="Search by Area or City..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded "
        />
      </div>

        {/* Auto-complete Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border rounded shadow-lg mt-1">
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Studio List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudios.length > 0 ? (
          filteredStudios.map((info, idx) => (
            <div  key={idx} className="border p-4 gap-2 rounded-lg shadow-md">
             <div className="">
             <h2 className="text-xl font-semibold">{info?.Name}</h2>
              <p>
                <strong>Type:</strong> <span className="text-red-500" >{info?.Type}</span> 
              </p>
              <div>
                <p>
                  <strong>City:</strong> <span className="text-red-500" >{info?.Location?.City}</span> 
                </p>
                <p>
                  <strong>Area:</strong> <span className="text-red-500" >{info?.Location?.Area}</span> 
                </p>
                <p>
                  <strong>Address:</strong> <span className="text-red-500" >{info?.Location?.Address}</span> 
                </p>
              </div>
              <div>
                <h2 className="font-bold">Amenities:</h2>
                {info?.Amenities?.map((item, index) => (
                  <li className="text-red-500" key={index}>{item}</li>
                ))}
              </div>
              <p>
                <strong>Price per hour:</strong> <span className="text-red-500" >{info?.PricePerHour}{" "}
                {info?.Currency}</span> 
              </p>
              <p>
                <strong>Rating:</strong> <span className="text-red-500" >{info?.Rating} ⭐</span> 
              </p>
             </div>
              <div className="flex justify-end"> 
              <button className="btn btn-neutral my-2" onClick={()=>handleOpenModal(info?.Id)}>Booking Now</button>
              </div>

              <div>
             
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box gap-2" >
                   
                    <h3 className="font-bold text-lg"> User Name : {findById?.Name}</h3>
                    <h3 className="font-bold text-lg"> User Email : {findById?.Contact?.Email}</h3>
                    
                    <div className="modal-action">
                      <form className=" flex flex-wrap space-y-2 space-x-2" onSubmit={handleSubmit} method="dialog">
                     

                      <input className="border rounded-md"
                      onChange={handleFromTimeChange}
                      value={fromTime || ''} aria-label="from time" type="time" />
                      <input className="border rounded-md"
                      onChange={handleToTimeChange}
                      value={toTime || ''} aria-label="to time" type="time" />
                      <input
                      className="border rounded-md"
                      onChange={handleDateChange}
                      value={dates || ''} aria-label="Date" type="date" />
                     

                        <div className="space-x-2 ">
                        <input className="border rounded-md"
                        name="userName"  type="button" value={findById?.Name || ''} disabled />
                        <input 
                        name='userEmail' className="border rounded-md"  type="button" value={findById?.Contact?.Email || ''} disabled /></div>


                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-neutral w-wide self-end">Book Now</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          ))
        ) : (
          <p>No studios found in this location.</p>
        )}
      </div>
     
    </div>
  );
};

export default Home;
