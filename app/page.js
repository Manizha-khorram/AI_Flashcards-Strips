"use client";

import React from "react";
import BackgroundBeams from "./components/BackgroundBeams";
import styles from "./page.module.css"; // Import CSS Module

export default function BackgroundBeamsDemo() {
  return (
    <div className={styles.relativeContainer}>
      {/* BackgroundBeams should be behind all content */}
      <div className={styles.backgroundBeams}>
        <BackgroundBeams />
      </div>

      {/* Content should be on top */}
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
