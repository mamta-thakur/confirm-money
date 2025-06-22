import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Confirm.Money?",
    answer:
      "Confirm.Money is your all-in-one site for comparing loans and shopping online. You can see offers from many lenders and choose flexible payment plans for your purchases.",
  },
  {
    question: "What types of loans can I apply for?",
    answer:
      "Depending on your profile, you can get:\n- Personal Loans\n- Business Loans\n- Shopping-Cart Funding (EMIs at checkout)\n- Loan Against Property\n…and more, based on each lender’s rules.",
  },
  {
    question: "How do I use Confirm.Money?",
    answer:
      "1. Sign up with your mobile number and the OTP you receive.\n2. Enter a few details about the loan you need.\n3. Compare live offers—check interest rates, loan amounts and durations.\n4. Pick the best option and apply online.\n5. Get help from our loan experts every step of the way.",
  },
  {
    question: "Are there any fees or hidden charges?",
    answer:
      "No. Confirm.Money does not charge you any fees. You only pay the interest rate and processing fee that your chosen lender shows you.",
  },
  {
    question: "Can I shop directly on Confirm.Money?",
    answer:
      "Yes. Browse our partner stores or brands, add items to your cart, and at checkout choose “EMI” or “Get Financing” to split your payment over 3 or 6 months.",
  },
  {
    question: "Can I pay off my loan or EMI early?",
    answer:
      "Absolutely. You can prepay part or all of your loan at any time. Your lender’s prepayment or foreclosure charges (if any) will apply.",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "Basic KYC: PAN card and Aadhaar (or other ID proof).\nFor some loans: Salary slips (last 3 months), ITRs (last 2 years), bank statements, etc., depending on the loan type and lender.",
  },
  {
    question: "How safe is my personal information?",
    answer:
      "Very safe. We use strong encryption and industry-standard security measures, and we never share your data without your permission.",
  },
];

export default function Section6() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10">
          FAQs
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-sm overflow-hidden transition-all"
            >
              <button
                className="w-full flex justify-between items-center p-5 sm:p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-base sm:text-lg md:text-xl">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 sm:px-6 pb-6 text-gray-600 text-left whitespace-pre-line text-sm sm:text-base md:text-lg leading-relaxed">
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
