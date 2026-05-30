"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";

export interface QnA {
  id: string;
  question: string;
  answer: string;
  author: string;
  date: string;
  helpful: number;
}

interface QnACardProps {
  qna: QnA;
}

export default function QnACard({ qna }: QnACardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
    }
  };

  return (
    <div className="card p-5 dark:bg-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 text-right"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <HelpCircleIcon className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-right">
            <p className="font-medium text-slate-800 dark:text-white">{qna.question}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              بواسطة {qna.author} • {new Date(qna.date).toLocaleDateString("ar-YE")}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400 shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-slate-400 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
              <User size={16} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-300">{qna.answer}</p>
              <button
                onClick={handleVote}
                disabled={voted}
                className={`mt-3 text-sm transition-colors ${
                  voted
                    ? "text-sky-500 cursor-default"
                    : "text-slate-500 hover:text-sky-600 dark:text-slate-400"
                }`}
              >
                👍 مفيد ({qna.helpful + (voted ? 1 : 0)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}