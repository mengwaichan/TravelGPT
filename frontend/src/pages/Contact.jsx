import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about our product?
                    Let us know.
                </p>
                <label
                    for="email"
                    class="block mb-2 text-sm  text-gray-900 dark:text-gray-300 text-center"
                    >
                        Email us at:
                </label>
                <label
                for="email"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-center">
                travelgptfb@gmail.com
                </label>
            </div>
        </section>
    );
};

export default Contact;
