"use client";

import React from "react";
import BackgroundBeams from "./components/BackgroundBeams";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

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
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton}>Signin</button>
          <button className={styles.secondaryButton}>Signup</button>
        </div>
      </div>
    </div>
  );
}
