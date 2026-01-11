"use client";

import React from "react";
import { Heading, Flex, Text, Button, Background } from "@/once-ui/components";
import styles from "./InitialScreen.module.scss";

interface InitialScreenProps {
  onClick?: () => void;
}

export const InitialScreen: React.FC<InitialScreenProps> = ({ onClick }) => {
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
          tilt: 135,
          colorStart: "var(--color-primary-medium)",
          colorEnd: "var(--color-accent-medium)",
          opacity: 20,
        }}
        dots={{
          display: true,
          color: "var(--color-primary-weak)",
          size: "m",
          opacity: 10,
        }}
        lines={{
          display: true,
          opacity: 10,
        }}
      />
      
      <Flex
        direction="column"
        gap="xl"
        horizontal="center"
        vertical="center"
        padding="xl"
        className={styles.content}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "600px",
        }}
      >
        <Flex
          direction="column"
          gap="m"
          horizontal="center"
          className={styles.textContent}
        >
          <div className={styles.iconWrapper}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
              />
              <path
                d="M32 16L32 32L44 32"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="32"
                cy="32"
                r="3"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <Heading
            variant="display-strong-l"
            align="center"
            wrap="balance"
            className={styles.heading}
          >
            Ready to Begin?
          </Heading>
          
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
            className={styles.description}
          >
            Click the button below to start your immersive experience
          </Text>
        </Flex>
        
        <Button
          variant="primary"
          size="l"
          onClick={onClick}
          className={styles.startButton}
          arrowIcon
        >
          Start Experience
        </Button>
        
        <Flex gap="s" horizontal="center" className={styles.features}>
          <Flex gap="4" vertical="center" className={styles.feature}>
            <div className={styles.featureIcon}>✓</div>
            <Text variant="body-default-s" onBackground="neutral-weak">
              High Quality Streaming
            </Text>
          </Flex>
          <Flex gap="4" vertical="center" className={styles.feature}>
            <div className={styles.featureIcon}>✓</div>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Real-time Interaction
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
