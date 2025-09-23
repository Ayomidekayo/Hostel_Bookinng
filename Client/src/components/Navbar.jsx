import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // ← Add this
import { assets } from "../assets/assets";

const Navbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Hotel", path: "/rooms" },
        { name: "Experience", path: "/" },
        { name: "About", path: "/owner" },
        {name: "Dashboard",path: '/owner'}
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0(); // ← Auth0 hooks
   useEffect(() => {
    if(location.pathname !== '/'){
            setIsScrolled(true);
        }else{
            setIsScrolled(false)
        }
    setIsScrolled(prev=>location.pathname !=='/'? true:prev)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            <Link to="/">
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
                <Link  to='/owner' className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                    Dashboard
                </Link>
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'}`} />
                {isAuthenticated ? (
                    <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => loginWithRedirect()}
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <img onClick={() => setIsMenuOpen(true)} src={assets.menuIcon} alt="" className={`${isScrolled && 'invert'} h-4`} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}

                <Link to='/owner' className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Dashboard
                </Link>

                {isAuthenticated ? (
                    <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => loginWithRedirect()}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
