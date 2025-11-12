import React, { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Button from "../components/Button";
import { ShopContext } from "../context/ShopContext";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
          <p className="text-gray-500 ">
            {" "}
            Magdaburger Str. 50 <br />
            14770, Brandenburg an der Havel{" "}
          </p>
          <p className="text-gray-500">Tel: +49-123456789</p>
          <p className="font-semibold text-xl text-gray-600">Moroccan Shop</p>
          <p className="text-gray-500">
            Learn more about our Teams and job openings
          </p>
          <Button text1={"Explore Jobs"} clickMethod={() => navigate("/")} />
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
