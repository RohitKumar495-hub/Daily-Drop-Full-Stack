import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border border-gray-300'>
        <div className='container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row justify-between'>
            <p>© All Rights Reserved 2025.</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='hover:text-primary-100'>
                    <FaFacebook/>
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaInstagram/>
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
