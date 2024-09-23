import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = () => {
  // TODO: Replace with 5-7 objections that bother your audience
  const faqs = [
    {
      question: "[1. Common question - objection]",
      answer: "[1. Clear, concise answer]"
    },
    {
      question: "[2. Common question - objection]",
      answer: "[2. Clear, concise answer]"
    },
    {
      question: "[3. Common question - objection]",
      answer: "[3. Clear, concise answer]"
    },
    {
      question: "[4. Common question - objection]",
      answer: "[4. Clear, concise answer]"
    },
    {
      question: "[5. Common question - objection]",
      answer: "[5. Clear, concise answer]"
    }
  ];

  return (
    <section className="w-full text-foreground py-32" id="faq">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;