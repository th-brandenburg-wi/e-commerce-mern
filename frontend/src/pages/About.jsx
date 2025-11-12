import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our e-commerce platform! We are passionate about
            delivering quality products and a seamless shopping experience. Our
            mission is to connect you with the best brands and unique finds, all
            in one place.
          </p>
          <b className="text-gray-800"> Our Mission</b>
          <p className="text-gray-600 mb-4">
            Our team is dedicated to customer satisfaction, innovation, and
            reliability. Whether you're shopping for the latest trends or
            everyday essentials, we strive to make your journey enjoyable and
            secure.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={"THANK"} text2={"YOU"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Your Shop Experience matters!</b>
          <p>
            Thank you for choosing us. We look forward to serving you and making
            your online shopping experience exceptional!
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
  // <div className="min-h-screen flex items-center justify-center py-10 px-4">
  //   <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
  //     <img
  //       src={assets.about_img}
  //       alt="About"
  //       className="w-48 h-48 object-cover rounded-lg shadow-md"
  //     />
  //     <div className="flex-1">
  //       <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
  //       <p className="text-gray-600 mb-4">
  //         Welcome to our e-commerce platform! We are passionate about
  //         delivering quality products and a seamless shopping experience. Our
  //         mission is to connect you with the best brands and unique finds, all
  //         in one place.
  //       </p>
  //       <p className="text-gray-600 mb-4">
  //         Our team is dedicated to customer satisfaction, innovation, and
  //         reliability. Whether you're shopping for the latest trends or
  //         everyday essentials, we strive to make your journey enjoyable and
  //         secure.
  //       </p>
  //       <p className="text-gray-600">
  //         Thank you for choosing us. We look forward to serving you and making
  //         your online shopping experience exceptional!
  //       </p>
  //     </div>
  //   </div>
  // </div>);
};

export default About;
