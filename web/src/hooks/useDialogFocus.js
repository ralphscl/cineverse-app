import { useEffect, useRef } from "react";

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function useDialogFocus(isOpen, dialogRef, onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousFocus = document.activeElement;
    const inertElements = [];
    // Make background content inert, including when a dialog is nested in the nav.
    for (let node = dialog; node.parentElement; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && !sibling.inert) {
          sibling.inert = true;
          inertElements.push(sibling);
        }
      }
      if (node.parentElement === document.body) break;
    }
    const getFocusable = () => [...dialog.querySelectorAll(focusableSelector)]
      .filter((element) => element.getClientRects().length && !element.closest('[inert]'));
    const focusFirst = () => (getFocusable()[0] || dialog).focus();
    focusFirst();
    const onFocus = (event) => {
      if (!dialog.contains(event.target)) focusFirst();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
      }
      if (event.key !== "Tab") return;
      const elements = getFocusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocus);
      inertElements.forEach((element) => { element.inert = false; });
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, dialogRef]);
}
