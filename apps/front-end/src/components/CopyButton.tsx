import { useState } from "react";

import { CheckIcon, CopyIcon } from "./Icons";
import Button, { ButtonProps } from "./Button";
import Tooltip from "@/components/Tooltip";

const ANIMATION_STATE_RESET_DELAY = 1500;

export default function CopyButton(props: ButtonProps) {
  const [copied, setCopied] = useState(false);
  const { onClick, ...rest } = props;

  const copyToClipBoard: ButtonProps["onClick"] = (e) => {
    onClick?.(e);
    setCopied(true);
    setTimeout(() => setCopied(false), ANIMATION_STATE_RESET_DELAY);
  };

  return (
    <Tooltip title="Copied" open={copied}>
      <Button className="py-3" onClick={copyToClipBoard} {...rest}>
        {!copied ? (
          <CopyIcon className="duration-500 animate-in fade-in" aria-hidden />
        ) : (
          <CheckIcon
            className="duration-500 animate-in fade-in zoom-in"
            aria-hidden
          />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
    </Tooltip>
  );
}
