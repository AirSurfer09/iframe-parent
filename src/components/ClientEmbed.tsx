"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  PixelStreamComponent,
  PixelStreamComponentHandles,
} from "@convai/experience-embed";

import { Column, Flex, Text } from "@/once-ui/components";
import { InitialScreen } from "@/components/InitialScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import {
  buildTimeConfig,
  resolveRuntimeConfig,
  type ConvaiRuntimeConfig,
} from "@/app/resources/runtimeConfig";

/**
 * The stripped-down page shipped in the Docker image: a thin neutral title bar and
 * a full-height pixel stream. No navigation, integration guide, newsletter,
 * debug controls or Convai-internal identity.
 */
export const ClientEmbed: React.FC = () => {
  const pixelStreamRef = useRef<PixelStreamComponentHandles>(null);

  // Runtime overrides live on `window`, which does not exist during the static
  // export. Resolve after mount so the prerendered HTML and the first client
  // render agree, then swap in the real stream.
  const [config, setConfig] = useState<ConvaiRuntimeConfig | null>(null);
  useEffect(() => {
    setConfig(resolveRuntimeConfig());
  }, []);

  const title = config?.title ?? buildTimeConfig.title;

  return (
    <Column fillWidth style={{ height: "100vh" }}>
      <Flex
        as="header"
        fillWidth
        paddingX="l"
        paddingY="12"
        vertical="center"
        background="surface"
        borderBottom="neutral-medium"
        style={{ flex: "0 0 auto" }}
      >
        <Text variant="label-strong-m" onBackground="neutral-strong">
          {title}
        </Text>
      </Flex>

      <Flex fillWidth position="relative" style={{ flex: "1 1 auto", minHeight: 0 }}>
        {config ? (
          <PixelStreamComponent
            ref={pixelStreamRef}
            expId={config.expId}
            {...(config.endUserId ? { endUserId: config.endUserId } : {})}
            serviceUrls={{
              pixelStreamBase: config.pixelStreamBase,
              sessionFetch: config.sessionFetch,
            }}
            InitialScreen={
              <InitialScreen
                onClick={() => pixelStreamRef.current?.initializeExperience()}
              />
            }
            LoadingScreenComponent={<LoadingScreen />}
            avatarStudio={false}
          />
        ) : (
          // Same visual as the stream's own initial state, so mounting is seamless.
          <InitialScreen />
        )}
      </Flex>
    </Column>
  );
};
