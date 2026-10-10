"use client";

import { DialogQuestionEdit } from "@/components/form/question/question-edit";
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";

import { useGetQuestion } from "@/hooks";

export default function QuestionDatelsTable() {
const { data, isLoading, isError } = useGetQuestion();

// Dynamic API data
const questions = data?.data ?? [];

if (isLoading) {
return ( <div className="w-full rounded-lg border p-6 text-center text-sm text-muted-foreground">
Loading questions... </div>
);
}

if (isError) {
return ( <div className="w-full rounded-lg border p-6 text-center text-sm text-destructive">
Failed to load questions. Please try again. </div>
);
}

if (questions.length === 0) {
return ( <div className="w-full rounded-lg border p-6 text-center text-sm text-muted-foreground">
No questions found. </div>
);
}

return ( <div className="w-full min-w-0 space-y-4"> <div> <h2 className="text-lg font-semibold sm:text-xl">
Questions </h2> <p className="text-sm text-muted-foreground">
Total questions: {questions.length} </p> </div>

```
  <div className="w-full overflow-x-auto rounded-lg border">
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%] sm:w-[35%]">
            Title
          </TableHead>

          <TableHead className="w-[60%] sm:w-[50%]">
            Description
          </TableHead>
          <TableHead className="w-[10%] sm:w-[15%]">
            Description
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {questions.map((question: any) => (
          <TableRow key={question.id}>
            <TableCell className="whitespace-normal break-words align-top text-xs font-medium sm:text-sm">
              {question.title || "Untitled"}
            </TableCell>

            <TableCell className="whitespace-normal break-words align-top text-xs text-muted-foreground sm:text-sm">
              {question.description || "No description available"}
            </TableCell>
            <TableCell className="whitespace-normal break-words align-top text-xs text-muted-foreground sm:text-sm">
             <div><DialogQuestionEdit itemData={question}key={question.id}></DialogQuestionEdit></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>


);
}
