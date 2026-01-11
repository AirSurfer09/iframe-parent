"use client";

import React from "react";
import { Heading, Flex, Text, Background } from "@/once-ui/components";
import styles from "./LoadingScreen.module.scss";

export const LoadingScreen: React.FC = () => {
  return (
    <Flex
      fillWidth
      fillHeight
      horizontal="center"
      vertical="center"
      className={styles.container}
      position="relative"
    >
      <Background
        gradient={{
          display: true,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          tilt: 45,
          colorStart: "var(--color-primary-weak)",
          colorEnd: "var(--color-accent-weak)",
          opacity: 20,
        }}
        dots={{
          display: true,
          color: "var(--color-primary-weak)",
          size: "s",
          opacity: 10,
        }}
      />
      
      <Flex
        direction="column"
        gap="xl"
        horizontal="center"
        vertical="center"
        padding="xl"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Animated Loader */}
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>
            <div className={styles.loaderRing}></div>
            <div className={styles.loaderRing}></div>
            <div className={styles.loaderRing}></div>
            <div className={styles.loaderCore}></div>
          </div>
        </div>
        
        {/* Text Content */}
        <Flex
          direction="column"
          gap="s"
          horizontal="center"
          className={styles.textContent}
        >
          <Heading
            variant="display-strong-m"
            align="center"
            wrap="balance"
            className={styles.heading}
          >
            Loading Experience
          </Heading>
          
          <Text
            variant="body-default-m"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
            className={styles.subtext}
          >
            Please wait while we prepare everything for you
          </Text>
        </Flex>
        
        {/* Progress Dots */}
        <Flex gap="s" horizontal="center" className={styles.progressDots}>
          <div className={`${styles.dot} ${styles.dot1}`}></div>
          <div className={`${styles.dot} ${styles.dot2}`}></div>
          <div className={`${styles.dot} ${styles.dot3}`}></div>
        </Flex>
      </Flex>
    </Flex>
  );
};
