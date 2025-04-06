import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

export const Input = ({ onSend }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t px-4 py-2 flex items-center bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border rounded text-sm text-black focus:outline-none"
      />
      <button type="submit" className="ml-2 text-blue-600 font-semibold text-sm">
        Enviar
      </button>
    </form>
  );

}