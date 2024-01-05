import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        // <section className="bg-white dark:bg-gray-900">
        //     <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        //         <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        //             Contact Us
        //         </h2>
        //         <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        //             Got a technical issue? Want to send feedback about our product?
        //             Let us know.
        //         </p>
        //         <label
        //             for="email"
        //             className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 text-center"
        //             >
        //                 Email us at:
        //         </label>
        //         <label
        //         for="email"
        //         className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-center">
        //         travelgptfb@gmail.com
        //         </label>
        //     </div>
        // </section>

<div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-400 to-green-900 justify-center items-center px-4 sm:px-6 lg:px-8 sm:mt-0">
<div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-[#e8e7d5] rounded-lg shadow-md p-6 sm:p-8 text-center">
<h1 className="text-center mt-5 font-bold text-3xl">Contact Us</h1>
<hr className="w-40 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
    <div className="text-black text-center">
        <p className="indent-5">
        Got a technical issue? Want to send feedback about our product? 
        <br/>Let us know.
        </p> <br/>
        <p className="indent-5">
            Email us at: <sp/><sp/>
            <a className="text-blue-700">travelgptfb@gmail.com</a>
        </p>
    </div>
</div>
</div>
    );
};

export default Contact;
