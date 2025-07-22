import { useCallback, useEffect, useRef, useState } from "react";

type UseActivityTrackerProps = {
  onInactive?: (lastInteraction: Date) => void;
  inactivityTimeout?: number;
};

export const useActivityTracker = ({
  onInactive,
  inactivityTimeout = 10000,
}: UseActivityTrackerProps) => {
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);
  const [inactive, setInactive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onInactiveRef = useRef(onInactive);
  const hasCalledInactiveRef = useRef(false);

  useEffect(() => {
    onInactiveRef.current = onInactive;
  }, [onInactive]);

  const handleActivity = useCallback(() => {
    setLastInteraction(new Date());
    setInactive(false);

    hasCalledInactiveRef.current = false;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setInactive(true);
    }, inactivityTimeout);

  }, [inactivityTimeout]);

  useEffect(() => {
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    handleActivity();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);

      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleActivity]);

  useEffect(() => {
    if (inactive && lastInteraction && onInactiveRef.current && !hasCalledInactiveRef.current) {
      hasCalledInactiveRef.current = true;
      onInactiveRef.current(lastInteraction);
    }
  }, [inactive, lastInteraction]);

  return { lastInteraction, inactive };
};
