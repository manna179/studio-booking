import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiYoutubestudio } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <aside>
        <SiYoutubestudio className='text-2xl font-bold' />
         
          <p>
            Studio Booking Center
            <br />
           providing Studio details since 1996.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to='/#'> <FaFacebook className='text-xl font-bold' /></Link>
            <Link to='/#'> <FaYoutube className='text-xl font-bold' ></FaYoutube></Link>
            <Link to='/#'> <FaLinkedin className='text-xl font-bold' ></FaLinkedin> </Link>
          </div>
        </nav>
      </footer>
    );
};

export default Footer;