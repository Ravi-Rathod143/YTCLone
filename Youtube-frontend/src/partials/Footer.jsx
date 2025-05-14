import React from "react";

const Footer = () => {
    return (
      <div className="w-full bg-gray-100 py-6 mt-8 text-gray-600 text-sm text-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center flex-wrap gap-4">
            <span className="cursor-pointer hover:text-black transition">
              About
            </span>
            <span className="cursor-pointer hover:text-black transition">
              Privacy
            </span>
            <span className="cursor-pointer hover:text-black transition">
              Terms
            </span>
            <span className="cursor-pointer hover:text-black transition">
              Contact
            </span>
            <span className="cursor-pointer hover:text-black transition">
              Developers
            </span>
          </div>
          <div className="mt-2">
            © {new Date().getFullYear()} YouTube Clone. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;