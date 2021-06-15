import React from 'react';

export default function HeroSection({
  title,
  description1,
  description2,
  getNavigation
}) {
  const navigateTool = e => {
    e.preventDefault();
    getNavigation(e.target);
  };

  return (
    <section className="bg-teal-100 p-8 text-center">
      <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
        {title}
      </h1>

      <p className="text-gray-700 text-lg mb-4">{description1}</p>
      <p className="text-gray-700 text-lg mb-8">{description2}</p>

      {/* <div className="flex flex-wrap justify-center space-x-2">
        <button
          role="button"
          data-nav="tool-start"
          data-example="true"
          className="py-3 px-8 mb-2 bg-gray-400 hover:bg-gray-300 text-gray-800 hover:text-gray-900 rounded-lg hover:shadow-xl transition duration-300 focus:outline-none"
          onClick={navigateTool}
        >
          Try an example
        </button>
        <button
          data-nav="tool-start"
          className="py-3 px-8 mb-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-lg hover:shadow-xl transition duration-300 focus:outline-none"
          onClick={navigateTool}
        >
          Get Started
        </button>
      </div> */}
    </section>
  );
}
