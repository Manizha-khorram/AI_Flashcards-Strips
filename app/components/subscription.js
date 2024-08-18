"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./subscription.module.css";

export default function SubscriptionPage() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.subscriptionPage}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Back
      </button>

      <h1 className={styles.title}>Subscribe to FlashMind</h1>
      <div className={styles.stripeContainer}>
        <stripe-buy-button
          buy-button-id="buy_btn_1PoriNPoVhxsqWlAa4eRtLpD"
          publishable-key="pk_test_51PXGB1PoVhxsqWlAGdVkNIhBEKsFcpLnNGGKoKbSyL6kXkFIGSpELeSny62gkxstNpWtu3eX85IAZ0yWfGSrJJtz00S4GpEyDc"
        ></stripe-buy-button>
      </div>
    </div>
  );
}
