"use client";

import { useState } from "react";
import Link from "next/link";
import { Fingerprint } from "lucide-react";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section
      id="login-section"
      className="bg-white w-[80%] md:w-full mx-auto scroll-mt-24 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:mr-222">
        {/* Login by email section */}
        <div className="max-w-sm mx-auto mb-8 md:mb-12">
          {/* Top divider line */}
          <div className="border-t-2 border-[#BC9C73] mb-4"></div>

          {/* Login by email text */}
          <p className="text-center text-[#BC9C73] text-sm font-medium mb-6">
            Login by email
          </p>

          {/* Login your Account button */}
          <Link
            href="/verification"
            className="w-full border-2 border-gray-800 rounded-full py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-8"
          >
            <Fingerprint size={20} className="text-gray-800" />
            <span className="text-gray-800 font-semibold text-base">
              Login your Account
            </span>
          </Link>

          {/* Description text */}
          <p className="text-center text-gray-600 text-sm leading-relaxed mb-8">
            A single trusted digital identity for all citizens, residents and visitors
          </p>

          {/* Divider line */}
          <div className="border-t-2 border-[#BC9C73] mb-8"></div>

          {/* Email input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="ali.dev@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-l-4 border-l-[#BC9C73] bg-amber-50 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="alideveloper"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-l-4 border-l-[#BC9C73] bg-amber-50 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Login button */}
          <button className="w-full bg-[#BC9C73] hover:bg-[#95856f] text-white font-semibold py-3 px-4 text-base transition mb-4">
            Login
          </button>

          {/* Forgot Password link */}
          <p className="text-center text-gray-800 text-sm font-medium hover:underline cursor-pointer">
            Forgot Password ?
          </p>
        </div>
      </div>
    </section>
  );
}
