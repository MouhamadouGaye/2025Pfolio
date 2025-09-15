import React from "react";
import "./Animation.css";

const Animation = () => {
  return (
    <section className="relative py-28 px-10 ">
      {/* <div className="block"></div> */}
      <div className="glow blue"></div>
      <div className="glow teal"></div>
      <div className="glow orange"></div>

      <div className="card-wrapper">
        <div className="card-border"></div>
        {/* <div
          className="card-content bg-white text-[#2b354280] dark:bg-slate-800 dark:text-[#94a3b89f]   dark:bg-[linear-gradient(240deg,_#1e40af,_#0f766e,_#ea580c,_#1e40af)]"
        > */}

        <div className="p-4 w-full h-64 animate-gradient-x bg-[linear-gradient(240deg,_#3b82f6,_#14b8a6,_#fb923c,_#3b82f6)] bg-[length:200%_200%] dark:bg-[linear-gradient(240deg,_#1e40af,_#0f766e,_#ea580c,_#1e40af)]">
          <h1 className="title text-gray-600 dark:text-[#e0eaff]">
            Financial Technology:{" "}
          </h1>
          <h2 className=" text-2xl text-white dark:text-[#e0eaff]">
            The Future of Banking, Ecommerce and Enterprises
          </h2>
          <br />

          <p className="summary dark:text-[#cbd5e1] text-gray-600 ">
            Exploring how modern technology is reshaping the banking industry
            and creating new opportunities in digital finance, enterprise
            softwares, automation...
          </p>
          <div className="meta">
            <span className="text-indigo-500 dark:text-[#94a3b8]">
              By Mouhamadou GAYE
            </span>
            <span>March 10, 2024 • 6 min read</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Animation;
