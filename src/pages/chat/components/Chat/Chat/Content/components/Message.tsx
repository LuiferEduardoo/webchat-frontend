type Props = {
  text: string;
  sender: "sender" | "receiver";
};

export const Message =  ({ text, sender }: Props) => {
  const isReceiver = sender === "receiver";
  return (
    <div className={`flex ${isReceiver ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isReceiver
            ? "bg-gray-200 text-gray-900"
            : "bg-blue-600 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}