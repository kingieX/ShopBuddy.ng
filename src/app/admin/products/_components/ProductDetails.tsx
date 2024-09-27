import React, { useState } from 'react';

const ProductDetails = () => {
  // State to track which section is expanded
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Function to toggle the section
  const toggleSection = (section: string) => {
    // Toggle between showing and hiding the section
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <div>
      <div className="border-b border-gray-300 py-2">
        <h2
          className="cursor-pointer font-semibold"
          onClick={() => toggleSection('specifications')}
        >
          Specifications
        </h2>
        {expandedSection === 'specifications' && (
          <p className="text-gray-700">
            {/* Your specification text or product.specification data goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        )}
      </div>

      <div className="border-b border-gray-300 py-2">
        <h2
          className="cursor-pointer font-semibold"
          onClick={() => toggleSection('shippingPolicy')}
        >
          Shipping Policy
        </h2>
        {expandedSection === 'shippingPolicy' && (
          <p className="text-gray-700">
            The single most important criteria for a lot of first time
            customers. Lorem ipsum dolor sit amet consectetur adipiscing elit
            enean nisi magna rhoncus in diam vel, aliquet volutpat nisl.
          </p>
        )}
      </div>

      <div className="border-b border-gray-300 py-2">
        <h2
          className="cursor-pointer font-semibold"
          onClick={() => toggleSection('refundPolicy')}
        >
          Refund Policy
        </h2>
        {expandedSection === 'refundPolicy' && (
          <p className="text-gray-700">
            A Return & Refund Policy is a policy that dictates under what
            conditions customers can return products they have purchased from
            your eCommerce store and whether you will reimburse them or not.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
