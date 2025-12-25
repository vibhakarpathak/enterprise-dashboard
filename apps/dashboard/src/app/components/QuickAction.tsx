'use client';

import React, { useState } from 'react';
import { cn, Button } from '@enterprise/ui';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface QuickActionProps {
  label: string;
  color: string;
  isDone?: boolean;
  onClick?: () => void | Promise<void>;
}

function ActionStatusIcon({
  isProcessing,
  isDone,
}: {
  isProcessing: boolean;
  isDone: boolean;
}) {
  if (isProcessing) {
    return (
      <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
    );
  }
  if (isDone) {
    return (
      <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in duration-300" />
    );
  }
  return (
    <span className="text-[var(--color-text)] opacity-20 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all">
      →
    </span>
  );
}

export function QuickAction({
  label,
  color,
  isDone,
  onClick,
}: QuickActionProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (!onClick || isDone || isProcessing) return;
    setIsProcessing(true);
    try {
      await onClick();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant="ghost"
      disabled={isProcessing || isDone}
      onClick={handleClick}
      className={cn(
        'w-full h-auto flex items-center justify-between p-5 rounded-2xl transition-all shadow-sm group',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        !isDone && 'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
        isDone && 'opacity-50 cursor-default bg-[var(--color-surface)]/50',
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'w-3 h-3 rounded-full transition-all duration-300',
            color,
            isDone
              ? 'grayscale scale-75'
              : 'shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-110',
            isProcessing && 'animate-pulse',
          )}
        />

        <span
          className={cn(
            'font-bold text-[var(--color-text)] transition-all duration-500',
            !isDone && 'opacity-80 group-hover:opacity-100',
            isDone && 'line-through opacity-40 italic',
          )}
        >
          {isProcessing ? 'Processing...' : label}
        </span>
      </div>

      <div className="flex items-center justify-center w-5 h-5">
        <ActionStatusIcon isProcessing={isProcessing} isDone={!!isDone} />
      </div>
    </Button>
  );
}

const QuickActionSkeleton = () => (
  <div
    className={cn(
      'w-full flex items-center justify-between p-5 rounded-2xl border',
      'bg-[var(--color-text)]/[0.04] border-[var(--color-border)]/40',
    )}
  >
    <div className="flex items-center gap-4 w-full">
      <div className="shrink-0 w-3 h-3 rounded-full bg-[var(--color-text)] opacity-25 animate-pulse" />
      <div className="h-4 bg-[var(--color-text)] opacity-[0.18] rounded-md w-1/2 animate-pulse" />
    </div>
    <div className="h-5 w-5 bg-[var(--color-text)] opacity-[0.12] rounded animate-pulse" />
  </div>
);

QuickAction.Skeleton = QuickActionSkeleton;
