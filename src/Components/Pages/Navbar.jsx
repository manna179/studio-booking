import { Link, Links, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm container mx-auto ">
      <div className="flex-1">
        <NavLink to='/' className="font-bold  text-2xl">Studio Booking</NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Booking</NavLink>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
