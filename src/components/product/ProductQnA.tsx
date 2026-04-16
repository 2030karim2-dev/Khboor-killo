"use client";

import { useState } from "react";
import { MessageCircle, HelpCircle, Send, ChevronDown, ChevronUp, User } from "lucide-react";
import { Product } from "@/types/product";

interface QnA {
  id: string;
  question: string;
  answer: string;
  author: string;
  date: string;
  helpful: number;
}

const sampleQnAs: Record<string, QnA[]> = {
  "car-1": [
    {
      id: "q1",
      question: "هل السيارة تأتي مع ضمان؟",
      answer: "نعم، جميع سياراتنا تأتي مع ضمان سنة واحدة أو 20,000 كلم whichever comes first",
      author: "فريق خبور",
      date: "2026-01-20",
      helpful: 15,
    },
    {
      id: "q2",
      question: "هل يمكنني الدفع بالتقسيط؟",
      answer: "نعم، نوفر خيارات تقسيط تصل إلى 36 شهراً بدون فوائد",
      author: "فريق خبور",
      date: "2026-01-25",
      helpful: 8,
    },
  ],
  "part-1": [
    {
      id: "q3",
      question: "هل القطعة متوافقة مع جميع أنواع السيارات؟",
      answer: "القطعة متوافقة مع большинاة السيارات اليابانية والأمريكية. يرجى التحقق من رقم الهيكل قبل الشراء",
      author: "فريق خبور",
      date: "2026-02-10",
      helpful: 12,
    },
  ],
};

export default function ProductQnA({ product }: { product: Product }) {
  const productQnAs = sampleQnAs[product.id] || [];
  const [questions, setQuestions] = useState<QnA[]>(productQnAs);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    setIsSubmitting(true);

    const question: QnA = {
      id: `q${Date.now()}`,
      question: newQuestion,
      answer: "شكراً لسؤالك! سيقوم فريقنا بالرد عليك قريباً",
      author: "فريق خبور",
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };

    setTimeout(() => {
      setQuestions([...questions, question]);
      setNewQuestion("");
      setIsSubmitting(false);
      setShowAddQuestion(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <HelpCircle size={22} className="text-sky-500" />
          الأسئلة الشائعة
        </h2>
        <button
          onClick={() => setShowAddQuestion(!showAddQuestion)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          <MessageCircle size={16} />
          سؤال جديد
        </button>
      </div>

      {showAddQuestion && (
        <form onSubmit={handleSubmitQuestion} className="card p-5 dark:bg-slate-800">
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
              onClick={() => setShowAddQuestion(false)}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {questions.length === 0 ? (
        <div className="card p-8 text-center dark:bg-slate-800">
          <HelpCircle size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            لا توجد أسئلة بعد
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            كن أول من يسأل عن هذا المنتج!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((qna) => (
            <QnACard key={qna.id} qna={qna} />
          ))}
        </div>
      )}
    </div>
  );
}

function QnACard({ qna }: { qna: QnA }) {
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
            <HelpCircle size={16} className="text-amber-600 dark:text-amber-400" />
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