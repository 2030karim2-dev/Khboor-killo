"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { QnA } from "./QnACard";

interface AskQuestionFormProps {
  onSubmit: (question: string) => void;
  onCancel: () => void;
}

export default function AskQuestionForm({ onSubmit, onCancel }: AskQuestionFormProps) {
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(newQuestion);
      setNewQuestion("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-5 dark:bg-slate-800">
      <h3 className="font-bold text-slate-800 dark:text-white mb-4">
        اطرح سؤالك
      </h3>
      <textarea
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="اكتب سؤالك هنا..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors resize-none mb-4"
        required
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={newQuestion.trim() === "" || isSubmitting}
          className="flex-1 py-2.5 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {isSubmitting ? "جاري الإرسال..." : "إرسال السؤال"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}