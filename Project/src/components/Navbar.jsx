import { useState } from "react";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center space-x-2 font-bold text-2xl tracking-wide">
          <img src="/passkey.svg" alt="logo" className="w-10 h-10" />
          <span className="text-white text-2xl">&lt;</span>
          <span className="text-green-400">
            Pass <span className="text-white">OP</span>
          </span>
          <span className="text-green-400 text-2xl">/&gt;</span>
        </div>

        {/* Desktop Links (Icons) */}
        <ul className="hidden md:flex space-x-6 text-2xl">
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaGoogle />
            </a>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-4 p-4 text-2xl">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaGoogle />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
