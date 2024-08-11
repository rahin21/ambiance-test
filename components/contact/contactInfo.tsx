"use client";
import { settingType } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


function ContactInfo({ footer }: { footer?: boolean }) {
  const [settings, setSetting] = useState<settingType[] | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/setting-key?key=contact`);
        setSetting(res.data);
      } catch (err) {
        console.log("Error fetching slider data");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (settings) {
      settings.find((setting) => {
        if (setting.name === "phone") {
          setPhone(setting.description);
        }
        if (setting.name === "email") {
          setEmail(setting.description);
        }
      });
    }
  }, [settings]);

  return (
    <div className="flex flex-col items-center text-center">
      {!footer && (
          <Image
            src={"/images/logo-sm.png"}
            width={70}
            height={100}
            alt="company logo"
            className="mx-4"
          />
        )}
          <h2 className="font-palatino py-1 text-lightText uppercase">
            CONTACT US
          </h2>

        <Link
          className="footer-link-text footer-description"
          href={`tel:+1${phone?.replaceAll('-','')}`}
        >
          {phone || "phone"} 
        </Link>

        <Link className="email-link footer-link-text uppercase" href={`mailto:${email}`}>
          {email || "email"} 
        </Link>

    </div>
  );
}

export default ContactInfo;
