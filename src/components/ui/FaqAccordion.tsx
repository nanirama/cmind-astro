import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQItem[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQCard({
  item,
  isOpen,
  onToggle,
  triggerId,
  panelId,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
}) {
  return (
    <div className="bg-white border border-black/10 rounded-[12px] overflow-hidden" style={{ transition: "border-color 0.2s ease" }}>
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-start lg:items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer select-none text-left"
      >
        <span className="font-noto text-[16px] lg:text-[24px] font-medium leading-[1.4] text-black m-0 tracking-tight">
          {item.question}
        </span>
        <div className="pt-1 lg:pt-0 shrink-0">
          <ChevronIcon open={isOpen} />
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="overflow-hidden">
          <p
            className="font-inter text-[14px] lg:text-[16px] font-normal leading-[1.6] m-0 px-5 lg:px-6 pb-5 lg:pb-6 pr-6"
            style={{
              color: "rgba(0,0,0,0.55)",
              paddingTop: "12px",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full lg:w-[608px] shrink-0 flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <FAQCard
            key={index}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            triggerId={triggerId}
            panelId={panelId}
          />
        );
      })}
    </div>
  );
}
