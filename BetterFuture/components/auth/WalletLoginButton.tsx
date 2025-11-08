'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from "react";
import { LoginButton, liskSepolia } from "panna-sdk";

import { cn } from "@/lib/utils";

interface WalletLoginButtonProps {
  className?: string;
}

function applyButtonStyles(button: HTMLButtonElement) {
  // Apply base styles
  button.className = cn(
    "bg-[#1899d6] block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full",
    "hover:bg-[#1cb0f6] transition-colors",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  // Check if inner div already exists
  if (button.querySelector(".auth-button-inner")) {
    // Re-apply styles to maintain consistency
    enforceButtonStyles(button, undefined);
    return;
  }

  // Get original text content
  const originalText = button.textContent?.trim() || "Login";

  // Create inner div structure
  const innerDiv = document.createElement("div");
  innerDiv.className = cn(
    "auth-button-inner absolute bg-[#1cb0f6] box-border flex gap-2 h-[57px] items-center justify-center",
    "left-[0.5px] overflow-hidden px-4 py-3 right-[0.5px] rounded-[13px]",
    "top-1/2 -translate-y-1/2 w-[calc(100%-1px)]"
  );

  const textDiv = document.createElement("div");
  textDiv.className = cn(
    "flex flex-col justify-center leading-[100%] relative shrink-0",
    "text-base text-white text-center tracking-[-0.32px] uppercase whitespace-nowrap font-bold"
  );
  textDiv.textContent = originalText;

  // Clear button content and add structure
  button.innerHTML = "";
  innerDiv.appendChild(textDiv);
  button.appendChild(innerDiv);

  // Enforce styles after structure is created
  enforceButtonStyles(button, undefined);
}

function enforceButtonStyles(
  button: HTMLButtonElement,
  wrapperRef?: RefObject<HTMLDivElement | null>
) {
  // Force button to maintain our styling - override any panna-sdk styles
  const importantStyles = {
    backgroundColor: "#1899d6",
    height: "66px",
    minHeight: "66px",
    maxHeight: "66px",
    borderRadius: "13px",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };

  Object.entries(importantStyles).forEach(([prop, value]) => {
    const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    button.style.setProperty(cssProp, value, "important");
  });

  // Force inner div styling
  const inner = button.querySelector(".auth-button-inner") as HTMLElement;
  if (inner) {
    inner.style.setProperty("background-color", "#1cb0f6", "important");
    inner.style.setProperty("height", "57px", "important");
    inner.style.setProperty("min-height", "57px", "important");
    inner.style.setProperty("max-height", "57px", "important");
    inner.style.setProperty("border-radius", "13px", "important");
  }

  // Remove or hide any skeleton/loading elements from panna-sdk that wrap the button
  const skeletons = button.querySelectorAll(
    '[data-slot="skeleton"], [class*="skeleton"]:not([class*="spinner"]), [class*="loading"]:not([class*="spinner"]):not(svg)'
  );
  skeletons.forEach((skeleton) => {
    const el = skeleton as HTMLElement;
    // Hide skeleton wrapper elements
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("opacity", "0", "important");
    el.style.setProperty("background", "none", "important");
    el.style.setProperty("background-color", "transparent", "important");
  });

  // Find and style any loading spinners to match our design
  const spinners = button.querySelectorAll(
    '[class*="spinner"], svg[class*="animate-spin"], [aria-label*="loading" i]'
  );
  spinners.forEach((spinner) => {
    const el = spinner as HTMLElement;
    // Keep spinner visible but style it to match button
    el.style.setProperty("color", "white", "important");
    el.style.setProperty("width", "20px", "important");
    el.style.setProperty("height", "20px", "important");
  });

  // Remove any wrapper divs that panna-sdk might add around the button
  const parent = button.parentElement;
  if (parent && wrapperRef && parent !== wrapperRef.current) {
    // Ensure parent wrapper doesn't change button styling
    if (
      parent.classList.contains("tw-connect-button") ||
      parent.querySelector("button") === button
    ) {
      parent.style.setProperty("width", "100%", "important");
      parent.style.setProperty("display", "block", "important");
    }
  }
}

export function WalletLoginButton({ className }: WalletLoginButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Try to find button immediately
    const button = wrapperRef.current.querySelector("button");
    if (button) {
      applyButtonStyles(button);
    }

    // Use MutationObserver to watch for button being added and loading state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const button =
              element.tagName === "BUTTON"
                ? (element as HTMLButtonElement)
                : element.querySelector("button");

            if (button) {
              applyButtonStyles(button);
            }
          }
        });
      });

      // Also check for button in the wrapper and enforce styles
      const button = wrapperRef.current?.querySelector("button");
      if (button) {
        if (!button.querySelector(".auth-button-inner")) {
          applyButtonStyles(button);
        } else {
          // Re-enforce styles to prevent panna-sdk from changing them during loading
          enforceButtonStyles(button, wrapperRef);
        }
      }
    });

    observer.observe(wrapperRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Also set up interval to continuously enforce styles during loading
    const styleInterval = setInterval(() => {
      const button = wrapperRef.current?.querySelector("button");
      if (button) {
        enforceButtonStyles(button, wrapperRef);
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearInterval(styleInterval);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn("w-full", className)}>
      <LoginButton
        chain={liskSepolia}
        connectButton={{
          className:
            "bg-[#1899d6] block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full hover:bg-[#1cb0f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          style: {
            backgroundColor: "#1899d6",
            height: "66px",
            minHeight: "66px",
            maxHeight: "66px",
            borderRadius: "13px",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties,
        }}
      />
    </div>
  );
}

