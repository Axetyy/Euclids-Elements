import { useCallback, useEffect, useState } from "react";

export function usePlayback(stepCount: number, resetKey?: string) {
  const last = Math.max(0, stepCount - 1);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(1);
  useEffect(() => {
    setStep((current) => Math.min(current, last));
  }, [last]);
  useEffect(() => {
    setStep(0);
    setPlaying(false);
    setT(1);
  }, [resetKey]);
  useEffect(() => {
    if (!playing || stepCount === 0) return;
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 700);
      setT(progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (step >= last) {
        setPlaying(false);
        setT(1);
      } else {
        setStep(step + 1);
        setT(0);
      }
    };
    setT(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, step, stepCount, last]);
  const goTo = useCallback(
    (value: number) => {
      setPlaying(false);
      setStep(Math.max(0, Math.min(last, value)));
      setT(1);
    },
    [last],
  );
  const prev = useCallback(() => goTo(step - 1), [goTo, step]);
  const next = useCallback(() => goTo(step + 1), [goTo, step]);
  const restart = useCallback(() => goTo(0), [goTo]);
  const togglePlay = useCallback(() => {
    if (playing) {
      setPlaying(false);
      setT(1);
      return;
    }
    if (step >= last) setStep(0);
    setPlaying(true);
  }, [playing, step, last]);
  return { step, t, playing, prev, next, restart, goTo, togglePlay };
}
