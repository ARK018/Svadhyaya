import React from "react";
import { Table, TableHeader, TableRow, TableHead } from "./ui/table.jsx";

const Questions = ({ questions }) => {
  return (
    <div>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <div
              key={question.id}
              className="px-[100px] flex flex-col items-center justify-center"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium text-lg">
                      {question.id}. {question.title}
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          );
        })}
    </div>
  );
};

export default Questions;
