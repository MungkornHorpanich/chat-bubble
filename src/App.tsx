import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";

const App = () => {
  const [message, setMessage] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  function removeMessage(index: number) {
    setMessage((prev) => prev.filter((_, i) => i !== index));
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const inputText = e.currentTarget.textContent?.trim();
      if (inputText) {
        setMessage((prev) => [...prev, inputText]);
        e.currentTarget.textContent = "";
      }
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="relative h-screen bg-green-500 p-4">
      <div className="absolute bottom-[118px] pt-5 pl-5 left-[48px] w-full max-w-xl flex flex-col space-y-2 overflow-y-auto scrollbar-none">
        {message.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            onRemove={() => removeMessage(index)}
          />
        ))}
      </div>

      {/* Input field */}
      <div className="absolute bottom-[66px] left-[68px] w-full max-w-4xl flex">
        <div
          className="bg-white text-gray-800 mt-2 text-xl px-3 py-2 rounded-lg shadow-lg outline-none"
          contentEditable
          spellCheck={false}
          onKeyPress={handleKeyPress}
        ></div>
        <div className="absolute top-[35%] left-[-4px] translate-y-[-50%] w-0 h-0 border-r-[10px] border-r-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
      </div>
    </div>
  );
};

export default App;
