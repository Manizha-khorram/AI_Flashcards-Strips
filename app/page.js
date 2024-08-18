"use client";

import React from "react";
import BackgroundBeams from "./components/BackgroundBeams";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function BackgroundBeamsDemo() {
  const router = useRouter();

  return (
    <div className={styles.relativeContainer}>
      <div className={styles.backgroundBeams}>
        <BackgroundBeams />
      </div>
      {/* Subscription Button */}
      <div className={styles.subscriptionButtonContainer}>
        <button
          className={styles.subscriptionButton}
          onClick={() => router.push("/subscription")}
        >
          Subscribe
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.subtitle}>
          Your journey to knowledge begins here.
        </p>
        <div className={styles.animatedText}>
          <span>Boost</span>
          <span>your</span>
          <span>knowledge</span>
          <span>with</span>
          <span className={styles.highlightedText}>FlashMind.</span>
        </div>
        <div className={styles.authButtons}>
          <button className={styles.primaryButton}>
            <Link href="/handler/sign-in">
              Sign In
            </Link>
          </button>
          <button className={styles.secondaryButton}>
            <Link href="/handler/sign-up">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}