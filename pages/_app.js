import '@/styles/globals.css'
import AnimatedCursor from "react-animated-cursor";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";
import axios from "axios";

import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

export default function App({ Component, pageProps }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (data) return;
      const resp = await axios.get(
        process.env.NODE_ENV == "production"
          ? "https://konnexions.netlify.app/api/logos"
          : "http://localhost:3000/api/logos"
      );
      setData(resp.data.data);
    }
    fetchData();
  }, [data]);

  if (!data) return null;

  return (
    <>
    <AnimatedCursor
    outerSize={35}
    outerScale={1.7} 
    outerStyle={{
    mixBlendMode: 'exclusion'
  }}/>
  <div className="flex flex-col min-h-screen">
    <div className="flex-shrink-0 flex-grow-0"><NavBar data={data} /></div>
    <div className="flex-grow"><Component {...pageProps} /></div>
    <Footer />
  </div>
    </>
  )
}