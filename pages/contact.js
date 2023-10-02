/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import axios from "axios";
import Connect from "@/components/Connect";

function Contact() {
  const [gmailError, setGmailError] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const emailRegex = useMemo(() => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  }, []);

  useEffect(() => {  
    if (
      contactDetails.name?.length == 0 ||
      contactDetails.email?.length == 0 ||
      contactDetails.message?.length == 0
    ) {
      setFormSubmit(false);
      return;
    } else if (!emailRegex.test(contactDetails.email)) {
      setGmailError("Enter a valid email address");
      setFormSubmit(false);
      return;
    } else setFormSubmit(true);
    setGmailError("");
  }, [contactDetails]);

  const handleChangeName = (e) => {
    setContactDetails({
      ...contactDetails,
      name: e.target.value,
    });
  };
  const handleChangeEmail = (e) => {
    setContactDetails({
      ...contactDetails,
      email: e.target.value,
    });
  };
  const handleChangeMessage = (e) => {
    setContactDetails({
      ...contactDetails,
      message: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formSubmit) return;
    const resp = await axios.post(
      process.env.NODE_ENV == "production"
        ? "https://konnexions.netlify.app/api/contact"
        : "http://localhost:3000/api/contact",
      contactDetails
    );

    if (resp.status == 200) {
      setContactDetails({
        name: "",
        email: "",
        message: "",
      });
      setFormSubmit(false);
    } else {
      alert("Something went wrong");
    }
  };
  const openMap = () => {
    const link = 'https://www.google.com/maps/place/KIIT+Student+Activity+Center+-+KSAC/@20.3548831,85.8191383,16.7z/data=!4m6!3m5!1s0x3a19093cc3e1974b:0x85a345e1f4fcce86!8m2!3d20.3566159!4d85.818928!16s%2Fg%2F11bx2gww9n?entry=ttu'
    if (window.innerWidth < 768) {
      window.open(link, '_blank')
    }
  }

  return (<>
    <Head><title>Contact Us | Konnexions</title></Head>
    <div className="fixed inset-0 h-screen w-screen bg-[#02001A] overflow-x-hidden">
      <div className="relative inset-0 h-screen w-screen overflow-x-hidden">
        <Connect />
        <div className="absolute pt-32 pb-16 sm:mb-16 inset-0 h-screen w-screen z-30 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <h1 className="text-white font-bold text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] text-center max-w-[1440px] m-auto">
            Don&apos;t Be Shy, Let&apos;s Connect!
          </h1>
          <div className="text-white text-center mt-4 text-[.7rem] md:text-[1rem] w-[100vw] px-6 leading-7">
            Reach Out to Us for Any Inquiries, Collaborations, or Just a Friendly Chat.
          </div>
          <div className="w-[90%] lg:w-[70%] mt-2 md:mt-10 h-fit mx-auto bg-transparent backdrop-blur-sm rounded-t-2xl grid grid-cols-1 lg:grid-cols-2 border border-b-0">
            <div className="flex container mx-auto p-5">
              <div className="rounded-lg flex flex-col md:ml-auto w-full mt-2 md:mt-0 relative sm:z-10 -z-1 opacity-90 lg:opacity-100">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-center md:flex-row md:gap-8 sm:gap-2 mt-2 w-[100%]">
                    <div className="md:w-[50%] w-[100%]">
                      <div className="text-white mb-1">Name</div>
                      <input type="text" placeholder="Joseph" id="name"
                        value={contactDetails.name} onChange={handleChangeName}
                        className="bg-white/[0.12] border border-white/[0.11] h-[50px] md:h-[60px] rounded w-[100%] px-2 outline-none lg:text-white"
                      />
                    </div>
                    <div className="md:w-[50%] w-[100%]">
                      <div className="text-white mb-1">Email</div>
                      <input type="gmail" placeholder="Joseph@gmail.com" id="email"
                        value={contactDetails.email} onChange={handleChangeEmail}
                        className="bg-white/[0.12] border border-white/[0.11] h-[50px] md:h-[60px] rounded w-[100%] px-2 outline-none lg:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-2">
                    <div className="text-white mb-1">Message</div>
                    <textarea name="message" type="text"
                      value={contactDetails.message} onChange={handleChangeMessage}
                      className="bg-white/[0.12] pt-4 border border-white/[0.11] h-[100px] md:h-[150px] rounded w-[100%] px-2 outline-none text-white"
                      placeholder="Enter a message" style={{ resize: "none" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-red-700">{gmailError}</div>
                    <button disabled={!formSubmit}
                      className="text-sm py-2 px-8 rounded-md mt-4 cursor-pointer transition duration bg-zinc-600/50 text-white hover:bg-[#98D2EB]/60"
                    >Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <img src="/images/mail.png" className="hidden lg:block h-4/5 w-auto" alt="mail" />
            </div>
          </div>
          <div className="relative w-[90%] lg:w-[70%] sm:h-[35vh] md:h-[35vw] mx-auto border border-t-0 rounded-b-2xl">
            <iframe width="100%" height="100%" title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.269281427254!2d85.82064982337539!3d20.35791870849655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19093cc3e1974b%3A0x85a345e1f4fcce86!2sKIIT%20Student%20Activity%20Center%20-%20KSAC!5e0!3m2!1sen!2sin!4v1685780284805!5m2!1sen!2sin"
              style={{ filter: "grayscale(100%) invert(92%) contrast(83%)" }}
              allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-b-2xl"
              allowtransparency="true"
            />
            <div className="absolute inset-0 bg-[#02001A]/40 md:rounded-b-2xl lg:pointer-events-none" onClick={ openMap } />
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Contact;