import { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "How can I start reading a book?",
      answer: "Go to the book page and click the 'Read Now' button to start reading instantly."
    },
    {
      question: "How do I add a new book?",
      answer: "Navigate to the 'Add Book' section from the menu, fill in the book details, and click 'Submit'."
    },
    {
      question: "Is my reading progress saved?",
      answer: "Yes, your reading progress is automatically saved, so you can continue from where you left off."
    },
    {
      question: "Do I need an account to read books?",
      answer: "You can browse without an account, but you'll need one to save your progress or add books."
    },
    {
      question: "Can I read books offline?",
      answer: "Currently, offline reading is not available, but we're working on it!"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto bg-base-100 shadow-2xl rounded-lg divide-y divide-base-300 my-10">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="cursor-pointer transition-all"
          onClick={() => toggle(i)}
        >
          <div className="flex justify-between items-center p-4 font-semibold hover:bg-base-200">
            {faq.question}
            <span className="text-xl">
              {activeIndex === i ? "-" : "+"}
            </span>
          </div>
          {activeIndex === i && (
            <div className="p-4 text-sm text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
