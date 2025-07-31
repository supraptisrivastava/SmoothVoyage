import { useState } from 'react';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2">
      {open && (
        <div className="bg-white dark:bg-gray-800 border p-3 shadow-lg rounded-lg w-80 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Travel Bot</span>
            {/* <button onClick={() => setOpen(false)}> </button> */}
            <button
  onClick={() => setOpen(false)}
  className="text-gray-500 hover:text-red-500 font-bold text-xl"
  aria-label="Close"
>
  ×
</button>

          </div>
          <div className="h-48 overflow-auto">👋 How can I help with your trip?</div>
          <input
            type="text"
            placeholder="Type message..."
            className="w-full border mt-2 px-2 py-1 rounded-md"
          />
        </div>
      )}
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
