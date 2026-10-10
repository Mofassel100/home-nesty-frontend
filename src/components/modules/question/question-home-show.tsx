"use client";

import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";

import { useGetQuestion } from "@/hooks";

export function QuestiontAccordionDemo() {
const { data, isLoading, isError } = useGetQuestion();

const questions = data?.data ?? [];

if (isLoading) {
return ( <div className="px-4 py-10 text-center text-sm text-muted-foreground">
Loading questions... </div>
);
}

if (isError) {
return ( <div className="px-4 py-10 text-center text-sm text-destructive">
Failed to load questions. Please try again. </div>
);
}

if (questions.length === 0) {
return ( <div className="px-4 py-10 text-center text-sm text-muted-foreground">
No questions available. </div>
);
}

return ( <section className="w-full px-4 py-10 sm:px-6 lg:px-8"> <div className="mx-auto w-full max-w-3xl space-y-6"> <div className="space-y-2 text-center"> <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
Frequently Asked Questions </h1>

```
      <p className="text-sm text-muted-foreground sm:text-base">
        Find answers to your questions about Home Nesty.
      </p>
    </div>

    <Accordion
      typeof="multiple"
      className="w-full"
    >
      {questions.map((question: any) => (
        <AccordionItem
          key={question.id}
          value={question.id}
          className="border-b"
        >
          <AccordionTrigger className="py-4 text-left text-sm font-semibold sm:text-base">
            {question.title}
          </AccordionTrigger>

          <AccordionContent className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground sm:text-base">
            {question.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>

);
}
