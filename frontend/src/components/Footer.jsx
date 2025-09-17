import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© 2025 DreamEvents. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-2 text-xl">
        <a href="#" className="hover:text-blue-600">
          <FaFacebookF />
        </a>
        <a href="#" className="hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-blue-400">
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
