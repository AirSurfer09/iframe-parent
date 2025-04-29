"use client";

import React from "react";
import {
  PixelStreamComponent,
  PixelStreamComponentProps,
} from "@convai/experience-embed";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Grid,
  Background,
} from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";

const codeExamples = [
  {
    title: "Installation",
    description: "Install the package using your preferred package manager",
    code: `# Using npm
npm install @convai/experience-embed

# Using yarn
yarn add @convai/experience-embed

# Using pnpm
pnpm add @convai/experience-embed`,
    language: "bash",
  },
  {
    title: "React TypeScript Integration",
    description: "Integration example with React and TypeScript",
    code: `import React from 'react';
import { PixelStreamComponent, PixelStreamComponentProps } from '@convai/experience-embed';

function App() {
  const streamConfig: PixelStreamComponentProps = {
    expId: 'your_experience_id_here',
  };
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <PixelStreamComponent {...streamConfig} />
    </div>
  );
}

export default App;`,
    language: "typescript",
  },
  {
    title: "React JavaScript Integration",
    description: "Integration example with React (JavaScript)",
    code: `import React from 'react';
import { PixelStreamComponent } from '@convai/experience-embed';

function App() {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <PixelStreamComponent expId="your-experience-id" />
    </div>
  );
}

export default App;`,
    language: "javascript",
  },
  {
    title: "Vanilla JavaScript (CDN)",
    description: "Integration using vanilla JavaScript and CDN",
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>Pixel Streaming Example</title>
    <script src="https://www.unpkg.com/@convai/experience-embed/dist/convai-embed.umd.js"></script>
  </head>
  <body>
    <div id="pixel-stream-container" style="width: 100%; height: 600px; position: relative;"></div>
    <script>
      const container = document.getElementById('pixel-stream-container');
      if (container) {
        const pixelStream = new PixelStreamClient.default({
          container: container,
          expId: 'your-experience-id',
        });
      }
    </script>
  </body>
</html>`,
    language: "html",
  },
  {
    title: "Webflow Integration",
    description: "Integration example for Webflow",
    code: `<div id="pixel-stream-container" style="width: 100%; height: 600px; position: relative;"></div>

<script src="https://cdn.jsdelivr.net/npm/@convai/experience-embed/dist/convai-embed.umd.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('pixel-stream-container');
    if (container) {
      const pixelStream = new PixelStreamClient.default({
        container: container,
        expId: 'your_exp_id', // Replace with your actual Experience ID
      });
    }
  });
</script>`,
    language: "html",
  },
];

export default function ClientHome() {
  const initialExpId = "01ad2713-e35b-4e79-9814-05db90bf1151";
  const streamConfig: PixelStreamComponentProps = {
    expId: initialExpId,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      {routes["/blog"] && (
        <Column fillWidth gap="m">
          <Heading
            as="h2"
            variant="display-strong-xs"
            wrap="balance"
            paddingX="l"
          >
            Welcome to PixelStreaming
          </Heading>
          <Column fillWidth gap="m">
            <Grid
              columns={"1"}
              mobileColumns="1"
              fillWidth
              style={{
                height: "600px",
                borderRadius: "var(--radius-l)",
                overflow: "hidden",
              }}
            >
              <PixelStreamComponent {...streamConfig} />
            </Grid>
            <Flex
              mobileDirection="column"
              fillWidth
              paddingX="l"
              paddingTop="12"
              paddingBottom="24"
              gap="l"
            >
              <Flex flex={5}>
                <Heading as="h3" wrap="balance" variant="heading-strong-xl">
                  Interactive Demo
                </Heading>
              </Flex>
              <Column flex={7} gap="16">
                <Text
                  wrap="balance"
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  Experience our interactive demo that showcases the
                  capabilities of our platform.
                </Text>
              </Column>
            </Flex>
          </Column>
        </Column>
      )}
      <Column fillWidth gap="m">
        <Heading
          as="h2"
          variant="display-strong-xs"
          wrap="balance"
          paddingX="l"
        >
          Integration Guide
        </Heading>
        <Column gap="l" paddingX="l">
          {codeExamples.map((example, index) => (
            <Column key={index} gap="l">
              <Heading
                as="h3"
                wrap="balance"
                variant="heading-strong-l"
                paddingX="l"
              >
                {example.title}
              </Heading>
              <Column
                overflow="hidden"
                position="relative"
                fillWidth
                padding="xl"
                radius="l"
                marginBottom="m"
                horizontal="center"
                align="center"
                background="surface"
                border="neutral-medium"
              >
                <Background
                  gradient={{
                    display: true,
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    tilt: -45,
                    colorStart: "var(--color-primary-weak)",
                    colorEnd: "var(--color-surface-raised)",
                    opacity: 30,
                  }}
                  dots={{
                    display: true,
                    color: "var(--color-primary-weak)",
                    size: "l",
                    opacity: 10,
                  }}
                  lines={{
                    display: true,
                    opacity: 10,
                  }}
                />
                <Column
                  fillWidth
                  gap="m"
                  style={{
                    position: "relative",
                  }}
                >
                  <Column gap="16">
                    <Text
                      wrap="balance"
                      variant="body-default-s"
                      onBackground="neutral-weak"
                    >
                      {example.description}
                    </Text>
                    <div
                      style={{
                        position: "relative",
                        minWidth: "100%",
                        overflow: "auto",
                      }}
                    >
                      <SyntaxHighlighter
                        language={example.language}
                        style={vscDarkPlus}
                        customStyle={{
                          backgroundColor: "var(--color-surface-raised)",
                          padding: "var(--space-m)",
                          borderRadius: "var(--radius-s)",
                          margin: 0,
                          minWidth: "fit-content",
                        }}
                        showLineNumbers={true}
                        wrapLongLines={false}
                      >
                        {example.code}
                      </SyntaxHighlighter>
                    </div>
                    <Button
                      variant="secondary"
                      size="s"
                      onClick={() => copyToClipboard(example.code)}
                    >
                      Copy Code
                    </Button>
                  </Column>
                </Column>
              </Column>
            </Column>
          ))}
        </Column>
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
