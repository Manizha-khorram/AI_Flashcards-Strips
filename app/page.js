"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import BackgroundBeams from "./components/BackgroundBeams";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackgroundBeamsDemo() {
  const router = useRouter();

  useEffect(() => {
    // Check if the "stack-refresh-..." cookie exists
    const cookieExists = document.cookie
      .split("; ")
      .some((row) => row.startsWith("stack-refresh-"));

    if (cookieExists) {
      // If the cookie exists, redirect to the /home page
      router.push("/home");
    }
  }, [router]);

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-269PK6K7G1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-269PK6K7G1');
        `}
      </Script>

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
              <Link href="/handler/sign-in">Sign In</Link>
            </button>
            <button className={styles.secondaryButton}>
              <Link href="/handler/sign-up">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
