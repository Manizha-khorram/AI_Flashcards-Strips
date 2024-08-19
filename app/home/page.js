"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LampContainer } from "../components/lamp";

export default function LampDemo() {
  

  return (
    <div>
      <LampContainer />
    </div>
    );
}
