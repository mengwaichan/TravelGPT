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
                <form action="#" class="space-y-8">
                    <div>
                        <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            class="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded w-full bg-gray-50"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="subject"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded w-full bg-gray-50"
                            placeholder="Let us know how we can help you"
                            required
                        />
                    </div>
                    <div class="sm:col-span-2">
                        <label
                            for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                            Your message
                        </label>
                        <textarea
                            id="message"
                            rows="6"
                            class="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded w-full bg-gray-50"
                            placeholder="Leave a comment..."
                        ></textarea>
                    </div>
                    <div>

                    </div>
                    <button
                        type="submit"
                        class="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
