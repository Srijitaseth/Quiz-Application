"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";


const questions = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
  },
];

export default function QuizApp() {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);


  const handleOptionSelect = (option: string) => setSelectedOption(option);

  const handleNext = () => {
    if (selectedOption) {
      setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: selectedOption }));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] || null);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setIsFinished(false);
    setDisplayScore(0);
  };

 
  const calcScore = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) s++;
    });
    return s;
  };

  const finalPercentage = Math.round((calcScore() / questions.length) * 100);

  useEffect(() => {
    if (!isFinished) return;
    let start = 0;

    const timer = setInterval(() => {
      start++;
      setDisplayScore(start);
      if (start >= finalPercentage) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, [isFinished, finalPercentage]);

  const currentQ = questions[currentQuestionIndex];

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #cfeffd 0%, #e6f8ff 35%, #d1f0fb 60%, #e8f9ff 100%)",
      }}
    >
  
      <div
        className="relative rounded-[36px] p-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(148,205,234,0.9), rgba(170,222,241,0.9))",
          boxShadow:
            "inset 0 6px 0 rgba(255,255,255,0.35), 0 40px 60px rgba(0,0,0,0.08)",
          width: "1150px",
          maxWidth: "95vw",
        }}
      >
     
        <div
          className="relative rounded-[28px] p-12"
          style={{
            background: "rgba(255,255,255,0.92)",
            minHeight: "620px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            borderRadius: "28px",
          }}
        >
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={`q-${currentQuestionIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="max-w-3xl mx-auto"
              >
       
                <div className="flex flex-col items-center mb-8">
                  <Image
                    src="/testyourknowledge.svg"
                    alt="Test Your Knowledge"
                    width={520}
                    height={120}
                    priority
                  />
                  <div className="mt-2 text-slate-500 text-sm px-4">
                    Answer all questions to see your results
                  </div>
                </div>

                
                <div className="w-full flex gap-3 mb-10 px-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: i <= currentQuestionIndex ? "100%" : "0%" }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="h-full bg-[#12303a] rounded-full"
                      />
                    </div>
                  ))}
                </div>

           
                <div className="px-6">
                  <div className="bg-[linear-gradient(90deg,#dff7ff,#e6fbff)] rounded-2xl p-6 mb-6 text-center shadow-sm border border-[rgba(30,120,140,0.05)]">
                    <h2 style={{ color: "#000000" }} className="text-xl font-semibold">
                      <span className="text-slate-400 mr-2">
                        {currentQuestionIndex + 1}.
                      </span>
                      {currentQ.question}
                    </h2>
                  </div>

                
                  <div className="space-y-4">
                    {currentQ.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt)}
                        className={`w-full p-4 rounded-xl border-2 text-lg font-medium transition-shadow shadow-sm
                          ${
                            selectedOption === opt
                              ? "bg-sky-100 border-sky-300"
                              : "bg-white border-transparent hover:bg-sky-50"
                          }
                        `}
                        style={{ color: "#000000" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

               
                <div className="mt-8 px-6 flex justify-end gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="p-3 rounded-lg bg-[rgba(0,0,0,0.03)] hover:bg-[rgba(0,0,0,0.05)] disabled:opacity-40"
                    style={{ backgroundColor: "rgba(226,244,252,0.7)" }}
                  >
                    <ArrowLeft size={18} color="#000000" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="p-3 rounded-lg"
                    style={{
                      background: "linear-gradient(180deg,#dff6ff,#cfeef9)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <ArrowRight size={18} color="#000000" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <div className="bg-white px-6 py-2 rounded-lg shadow-sm text-sm font-semibold text-slate-600 mb-6">
                  Keep Learning!
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-[#1e5576] mb-4 font-bold italic">
                  Your Final score is
                </h2>

                <div className="relative mb-10">
                  <span className="text-[6rem] md:text-[8rem] font-serif leading-none text-[#335d7a]">
                    {displayScore}
                  </span>
                  <span className="text-3xl md:text-5xl mt-6 text-[#5a86a7] ml-2">
                    %
                  </span>
                </div>

                <button
                  onClick={resetQuiz}
                  className="px-10 py-3 bg-sky-200 rounded-xl font-bold text-slate-800 hover:bg-sky-300"
                >
                  Start Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       
        {!isFinished && currentQuestionIndex === 0 && (
          <div
            aria-hidden
            className="absolute"
            style={{
              left: 35,
              bottom: 28,
              pointerEvents: "none",
              zIndex: 999,
            }}
          >
        
            <div style={{ position: "absolute", left: -110, top: -78 }}>
              <Image
                src="/bestofluck.svg"
                alt="Best of Luck"
                width={150}
                height={82}
              />
            </div>

            
            <div style={{ width: 140, height: 140, position: "relative" }}>
              <Image src="/paw.gif" alt="Paw" width={140} height={140} unoptimized />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
