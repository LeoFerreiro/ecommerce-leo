import { useEffect, useEffectEvent } from "react";

export default function useModalDialog(dialogRef, isOpen, onClose, fallbackFocusRef, closeOnDesktop = true) {
  const requestClose = useEffectEvent(onClose);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement;
    const fallbackFocusTarget = fallbackFocusRef?.current;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = (event) => {
      if (event.matches) requestClose();
    };
    const handleTab = (event) => {
      if (event.key !== "Tab") return;

      const controls = [...dialog.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]',
      )].filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (!first) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
        event.preventDefault();
        first?.focus();
      }
    };

    dialog.showModal();
    document.body.style.overflow = "hidden";
    if (closeOnDesktop) desktop.addEventListener("change", handleResize);
    dialog.addEventListener("keydown", handleTab);

    // Removing the focused cart line must not leave focus on the inert page.
    const focusObserver = new MutationObserver(() => {
      if (!dialog.contains(document.activeElement)) {
        const firstControl = dialog.querySelector('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled)');
        (firstControl || dialog).focus({ preventScroll: true });
      }
    });
    focusObserver.observe(dialog, { childList: true, subtree: true });

    return () => {
      dialog.close();
      focusObserver.disconnect();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", handleResize);
      dialog.removeEventListener("keydown", handleTab);
      const returnTarget = opener?.isConnected && opener.getClientRects().length
        ? opener
        : fallbackFocusTarget;
      if (returnTarget?.isConnected && returnTarget.getClientRects().length) {
        returnTarget.focus({ preventScroll: true });
      }
    };
  }, [dialogRef, isOpen, fallbackFocusRef, closeOnDesktop]);
}
