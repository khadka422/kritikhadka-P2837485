import {
  Leaf,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = {
    shop: [
      { name: "All Products", href: "/shop" },
      { name: "Categories", href: "/categories" },
      { name: "New Arrivals", href: "/new" },
      { name: "Best Sellers", href: "/bestsellers" },
    ],
    about: [
      { name: "Our Story", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Impact Report", href: "/impact" },
      { name: "Partners", href: "/partners" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Contact", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
  ];
  return (
    <footer className="p-16 text-gray-300/80 bg-green-950">
      <div className="flex w-full gap-40 pb-3 border-b border-b-green-800/50">
        <div className=" w-96">
          <Link to={"/"} className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-800/80">
              <Leaf className="text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-white">
              EcoCart
            </span>
          </Link>
          <p className="mb-5">
            Making sustainable shopping simple. Every purchase supports a
            greener future for our planet.
          </p>
          <div className="flex gap-3 mb-3">
            <Mail />
            <p>kriti7@ecocart.com</p>
          </div>
          <div className="flex gap-3 mb-3">
            <Phone />
            <p>+977-9876543210</p>
          </div>
          <div className="flex gap-3 mb-3">
            <MapPin /> <p>Kathmandu, Nepal</p>
          </div>
        </div>
        <div>
          <div className="mb-3 font-serif text-xl font-semibold text-white">
            Shop
          </div>
          {footerLinks.shop.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
        <div>
          <div className="mb-3 font-serif text-xl font-semibold text-white">
            About
          </div>
          {footerLinks.about.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
        <div>
          <div className="mb-3 font-serif text-xl font-semibold text-white">
            Support
          </div>
          {footerLinks.support.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p>
          © 2026 EcoCart. All rights reserved. Built for a sustainable future.
        </p>
        <div className="flex items-center justify-center gap-4 ">
          {socialLinks.map((item) => (
            <div className="p-3 rounded-full bg-green-800/30">
              <item.icon />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
