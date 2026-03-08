"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ChevronDown({ open }: { open: boolean }) {
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
      aria-hidden
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

const faqs = [
  {
    category: "About Our Services",
    items: [
      {
        q: "What services does PLACEHOLDER offer?",
        a: ["PLACEHOLDER provides a platform where users can generate custom images using AI technology and purchase images from our shop. All images are available for personal use under our licensing terms."],
      },
      {
        q: "Who can use PLACEHOLDER?",
        a: ["Our platform is open to everyone aged 13 and older who agrees to our Terms and Conditions. Our services are ideal for personal use, including hobbyists and creative enthusiasts."],
      },
    ],
  },
  {
    category: "Licensing and Usage",
    items: [
      {
        q: "What is a Personal Use license?",
        a: ["A Personal Use License allows you to use images for non-commercial purposes, such as personal projects and non-monetized social media."],
      },
      {
        q: "Can I resell images purchased for Personal Use?",
        a: ["No, images licensed for Personal Use cannot be resold, redistributed, or used in any manner that generates direct or indirect revenue. Violations may lead to legal action."],
      },
    ],
  },
  {
    category: "Image Generation",
    items: [
      {
        q: "How does the AI-generated image service work?",
        a: ["Our AI technology generates images based on the input you provide, such as text descriptions or keywords. This service allows you to create custom images tailored to your needs."],
      },
      {
        q: "Are there any restrictions on the content I can create with the AI generator?",
        a: ["Yes, our platform prohibits generating or using images for illegal, defamatory, obscene, or otherwise objectionable content. For full details, please refer to our Terms and Conditions."],
      },
    ],
  },
  {
    category: "Purchasing and Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: ["We accept major credit cards and debit cards through our third-party payment processors. All transactions are encrypted to ensure your financial data is secure."],
      },
      {
        q: "Can I request a refund for an image?",
        a: [
          "Due to the digital nature of our products, purchases are generally non-refundable.",
          "Exceptions may be made in cases of technical issues or if the image is significantly different from the description provided.",
          "Please contact us within 14 days of purchase to discuss any issues.",
          "If your refund request is approved, please note that we require up to 14 business days to process the refund.",
        ],
      },
    ],
  },
  {
    category: "Account Management",
    items: [
      {
        q: "Do I need an account to use PLACEHOLDER?",
        a: ["Yes, creating an account allows you to generate images, purchase images, and track your purchase history. It also helps us provide a secure and personalized experience."],
      },
      {
        q: "How can I delete my account?",
        a: [
          "If you wish to delete your account, you can delete your profile through your personal account or contact us at support@orchestra-art.com.",
          "Deleting your account is permanent, and you will lose access to all purchased content and personal settings.",
        ],
      },
    ],
  },
  {
    category: "Privacy and Security",
    items: [
      {
        q: "How does PLACEHOLDER protect my data?",
        a: ["We use industry-standard security measures, including encryption and secure servers, to protect your data. For more information, please review our Privacy Policy."],
      },
      {
        q: "Do you share my data with third parties?",
        a: ["We do not sell or share your personal data with third parties for marketing purposes. We may share data with service providers who help us operate our platform, as outlined in our Privacy Policy."],
      },
    ],
  },
  {
    category: "Contact Us",
    items: [
      {
        q: "How can I contact customer support?",
        a: [
          "You can reach us via email at support@orchestra-art.com or through our support form.",
          "Our customer support team will assist you with any questions or issues.",
          "We aim to respond to all inquiries within 24 hours.",
        ],
      },
    ],
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Header />
      <main className="faq site-wrapper">
        <div className="faq__header">
          <h1 className="faq__title">Frequently Asked Questions</h1>
        </div>
        {faqs.map((group) => (
          <section key={group.category} className="faq__group">
            <h2 className="faq__category">{group.category}</h2>
            <div className="faq__items">
              {group.items.map((item, i) => {
                const id = `${group.category}-${i}`;
                const isOpen = openId === id;
                return (
                  <div key={id} className="faq__item">
                    <button
                      type="button"
                      className="faq__question"
                      onClick={() => toggle(id)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="faq__answer">
                        {item.a.map((line, j) => (
                          <p key={j}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
