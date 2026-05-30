"use client";

import { useState } from "react";
import { MessageCircle, HelpCircle } from "lucide-react";
import { Product } from "@/types/product";
import QnACard, { QnA } from "./QnACard";
import AskQuestionForm from "./AskQuestionForm";

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

  const handleAddQuestion = (question: string) => {
    const newQuestion: QnA = {
      id: `q${Date.now()}`,
      question,
      answer: "شكراً لسؤالك! سيقوم فريقنا بالرد عليك قريباً",
      author: "فريق خبور",
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    setQuestions([...questions, newQuestion]);
    setShowAddQuestion(false);
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
        <AskQuestionForm
          onSubmit={handleAddQuestion}
          onCancel={() => setShowAddQuestion(false)}
        />
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