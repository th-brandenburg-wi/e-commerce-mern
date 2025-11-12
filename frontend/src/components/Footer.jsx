import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero in qui
            amet cum, placeat rerum vel nam, inventore, natus voluptatem labore
            fugit debitis dolorem laboriosam sapiente accusamus sequi
            praesentium voluptatum.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">UNTERNEHMEN</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>Über uns</li>
            <li>Lieferung</li>
            <Link to="/Impressum">
              <li>Impressum</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Kontaktieren Sie uns</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+49-3388-12345678</li>
            <li>contact@marokko-shop.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {" "}
          Copyright @ 2025 Marokko Shop - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
