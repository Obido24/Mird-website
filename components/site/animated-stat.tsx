"use client";

import { useEffect, useMemo, useState } from 'react';

function extractValueParts(value: string) {
  const match = value.match(/^([^0-9]*)([0-9,]+)(.*)$/);
  if (!match) {
    return { prefix: '', number: null as number | null, suffix: value };
  }

  return {
    prefix: match[1] ?? '',
    number: Number(match[2].replace(/,/g, '')),
    suffix: match[3] ?? ''
  };
}

export function AnimatedStat({ value }: { value: string }) {
  const parts = useMemo(() => extractValueParts(value), [value]);
  const [display, setDisplay] = useState(parts.number === null ? value : '0');

  useEffect(() => {
    if (parts.number === null) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1000;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round((parts.number ?? 0) * eased).toLocaleString();
      setDisplay(`${parts.prefix}${nextValue}${parts.suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parts.number, parts.prefix, parts.suffix, value]);

  return <span>{display}</span>;
}
