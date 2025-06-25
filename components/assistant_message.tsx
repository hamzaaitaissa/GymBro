import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export const AssistantMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4 rounded-2xl shadow-md mb-4 w-fit max-w-2xl prose prose-invert prose-pre:bg-[#2d2d2d]">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};