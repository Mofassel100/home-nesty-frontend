
"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook } from "@hugeicons/core-free-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Find your perfect place with Home Nesty
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Get the latest properties, rental opportunities, and helpful
                housing updates delivered to your inbox.
              </p>
            </div>

            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
              />

              <Button
                type="submit"
                className="h-11 shrink-0 bg-primary px-5"
              >
                Subscribe
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                H
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Home Nesty
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Home Nesty makes finding the right home, room, or rental
              property simple and convenient. Discover trusted properties
              and connect with property providers easily.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="size-4 text-primary" />
                <a
                  href="mailto:support@homenesty.com"
                  className="transition-colors hover:text-white"
                >
                  support@homenesty.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-primary" />
                <a
                  href="tel:+8801700000000"
                  className="transition-colors hover:text-white"
                >
                  +880 1700-000000
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-slate-700 transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaFacebookF className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-slate-700 transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaInstagram className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="flex size-9 items-center justify-center rounded-full border border-slate-700 transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaTwitter className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-slate-700 transition hover:border-primary hover:bg-primary hover:text-white"
              >
                < FaLinkedinIn className="size-4" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="transition-colors hover:text-white"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/providers"
                  className="transition-colors hover:text-white"
                >
                  Property Providers
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-semibold text-white">
              Properties
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="transition-colors hover:text-white"
                >
                  Apartments
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=house"
                  className="transition-colors hover:text-white"
                >
                  Houses
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=room"
                  className="transition-colors hover:text-white"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=shared"
                  className="transition-colors hover:text-white"
                >
                  Shared Apartments
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-slate-500">
            © {currentYear} Home Nesty. All rights reserved.
          </p>

          <p className="text-slate-500">
            Made with care for better living.
          </p>
        </div>
      </div>
    </footer>
  );
}
