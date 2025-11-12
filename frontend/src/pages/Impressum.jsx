import React from "react";

const Impressum = () => {
  return (
    <div className="min-h-screen flex items-center justify-center border-t py-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Impressum</h2>
        <div className="text-gray-700 space-y-4 text-base">
          <p>
            <strong>Company Name:</strong> THB E-Commerce GmbH
          </p>
          <p>
            <strong>Address:</strong> Musterstraße 12, 12345 Musterstadt,
            Germany
          </p>
          <p>
            <strong>Phone:</strong> +49 123 456789
          </p>
          <p>
            <strong>Email:</strong> info@thb-ecommerce.de
          </p>
          <p>
            <strong>Managing Director:</strong> Max Mustermann
          </p>
          <p>
            <strong>Commercial Register:</strong> Amtsgericht Musterstadt, HRB
            123456
          </p>
          <p>
            <strong>VAT ID:</strong> DE123456789
          </p>
          <hr className="my-6" />
          <p>
            Responsible for content according to § 55 Abs. 2 RStV: Max
            Mustermann, Musterstraße 12, 12345 Musterstadt
          </p>
          <p>
            Disclaimer: Despite careful control of the content, we assume no
            liability for the content of external links. The operators of the
            linked pages are solely responsible for their content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
