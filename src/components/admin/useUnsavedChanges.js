"use client";

import { useEffect } from "react";

/**
 * Prevents accidental loss of unsaved changes via beforeunload and link navigation checks.
 *
 * @param {boolean} isDirty - True if the form has unsaved modifications
 */
export function useUnsavedChanges(isDirty) {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleAnchorClick = (e) => {
      if (!isDirty) return;
      const target = e.target.closest("a");
      if (!target || !target.href) return;

      // Don't intercept same-page anchors or new tabs
      if (
        target.target === "_blank" ||
        target.href === window.location.href ||
        target.getAttribute("href")?.startsWith("#")
      ) {
        return;
      }

      const confirmed = window.confirm(
        "You have unsaved changes. If you leave now, your changes will be lost. Discard and proceed?"
      );
      if (!confirmed) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [isDirty]);
}

export default useUnsavedChanges;
