import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "./navbar";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    try {
      const result = await emailjs.sendForm(
        "service_14neg6f",
        "template_4fot9hf",
        formRef.current,
        "UiWw3BRBD81GkAxfi"
      );
      console.log("Email sent successfully:", result.text);

      // Delay stopping the loader until the navigation occurs
      setTimeout(() => {
        window.location.replace("/success"); // Navigate to the success page
      }, 500); // Keep loader active during the delay, adjust the delay as needed
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error submitting the form. Please try again.");
      setLoading(false); // Stop the loader if there's an error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center py-20">
        {/* Form Section */}
        <div className="h-full flex flex-col gap-10 justify-center items-center">
          <div>
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-black/60">
              Connect with Us for Seamless Global Trade Solutions
            </p>
          </div>
          <form
            id="contactForm"
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-[400px]"
          >
            {/* Name Input */}
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                className="w-full py-2 border-b border-gray-300 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            {/* Email Input */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                className="w-full py-2 border-b border-gray-300 focus:outline-none"
                placeholder="John@gmail.com"
                required
              />
            </div>
            {/* Message TextArea */}
            <div className="w-full">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full py-2 border-b border-gray-300 focus:outline-none"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 w-full mt-[26px] px-7 py-2 rounded-full text-white cursor-pointer bg-sky hover:bg-ocean flex justify-center items-center"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
        {/* Contact Info Section */}
        <div className="w-[400px] mt-6 pt-6 border-t text-black/50 flex flex-col gap-6">
          <div className="flex gap-3">
            <div className="text-ocean">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <a href="tel:+919768375606">+91 8104415719</a>
          </div>
          <div className="flex gap-3">
            <div className="text-ocean">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div>
              <a href="mailto:akshaythedesigner9@gmail.com">
                akshaythedesigner9@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
