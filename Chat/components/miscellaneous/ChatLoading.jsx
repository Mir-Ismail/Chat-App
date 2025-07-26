import React from "react";
import { Placeholder, Stack } from "react-bootstrap";

function ChatLoading() {
  return (
    <Stack gap={2}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Placeholder key={i} as="div" animation="wave">
          <Placeholder xs={12} size="lg" />
        </Placeholder>
      ))}
    </Stack>
  );
}

export default ChatLoading;
