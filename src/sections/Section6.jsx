import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    question: "Why do we use it?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
  },
  {
    question: "Where does it come from?",
    answer:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in classical Latin literature.",
  },
  {
    question: "Where can I get some?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
  },
  {
    question: "Is Lorem Ipsum safe to use?",
    answer:
      "Yes, Lorem Ipsum is safe and used widely in publishing and web development as placeholder text.",
  },
];


export default function Section6() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-sm overflow-hidden transition-all"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-indigo-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 text-left">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
