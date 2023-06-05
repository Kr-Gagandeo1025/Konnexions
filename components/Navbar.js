import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NavBar() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
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

  const tabs = [
    { name: "Home", link: "/" },
    { name: "Team", link: "/team" },
    { name: "Resources", link: "/resources" },
    { name: "Contact", link: "/contact" },
  ];

  return (<>
    <nav className="fixed z-30 top-0 inset-x-0 bg-gradient-to-b from-slate-900 to-[#02001A]-900/90 h-20 flex items-center justify-between lg:px-24 px-6 backdrop-blur">
      <div className="flex items-center space-x-5 text-white text-sm lg:text-xl">
        <Link href="https://kiit.ac.in/" target="_blank" className="w-full max-w-[100px] max-h-[100px] overflow-hidden">
          <img src={data.kiit.url} alt="kiit" className="w-full h-auto" />
        </Link>
        <Link href="/" className="w-full max-w-[100px] max-h-[100px] overflow-hidden">
          <img src={data.konnexion.url} alt="konnexions" className="w-full h-auto" />
        </Link>
        <Link href="https://ksac.kiit.ac.in/" target="_blank" className="w-full max-w-[100px] max-h-[100px] overflow-hidden">
          <img src={data.ksac.url} alt="ksac" className="w-full h-auto" />
        </Link>
      </div>
      <ul className="hidden lg:flex items-center space-x-16 ml-auto">
        {tabs.map(tab => { return (
          <li key={tab.name} className="text-white/70 hover:text-white text-sm transition-all">
            <Link href={tab.link}>{tab.name}</Link>
          </li> )}
        )}
      </ul>
      <div>
        <button
          onClick={() => setSidenavOpen(!sidenavOpen)}
          className="block lg:hidden text-white"
        >
          <div className="w-6 flex items-center justify-center relative">
            <span
              className={`transform transition w-full h-px bg-current absolute ${
                sidenavOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
              }`}
            ></span>
            <span
              className={`transform transition w-full h-px bg-current absolute ${
                sidenavOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`transform transition w-full h-px bg-current absolute ${
                sidenavOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'
              }`}
            ></span>
          </div>
        </button>
      </div>
    </nav>
    {sidenavOpen && (
      <div className="fixed inset-0 bg-[#02001A]/60 backdrop-blur z-20">
        <div className="flex items-center justify-center h-screen">
          <ul className="px-6 text-center space-y-12 mt-16">
          {tabs.map(tab => { return (
            <li key={tab.name} className="text-white/70 hover:text-white text-2xl transition-all" onClick={() => setSidenavOpen(false)}>
              <Link href={tab.link}>{tab.name}</Link>
            </li> )}
          )}
          </ul>
        </div>
      </div>
    )}
  </>);
}