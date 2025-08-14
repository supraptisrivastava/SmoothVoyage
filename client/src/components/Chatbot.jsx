// // import { useState } from 'react';

// // const Chatbot = () => {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2">
// //       {open && (
// //         <div className="bg-white dark:bg-gray-800 border p-3 shadow-lg rounded-lg w-80 mb-2">
// //           <div className="flex justify-between items-center mb-2">
// //             <span className="text-lg font-semibold">Travel Bot</span>
// //             {/* <button onClick={() => setOpen(false)}> </button> */}
// //             <button
// //   onClick={() => setOpen(false)}
// //   className="text-gray-500 hover:text-red-500 font-bold text-xl"
// //   aria-label="Close"
// // >
// //   ×
// // </button>

// //           </div>
// //           <div className="h-48 overflow-auto">👋 How can I help with your trip?</div>
// //           <input
// //             type="text"
// //             placeholder="Type message..."
// //             className="w-full border mt-2 px-2 py-1 rounded-md"
// //           />
// //         </div>
// //       )}
// //       <button
// //         className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
// //         onClick={() => setOpen(!open)}
// //       >
// //         💬
// //       </button>
// //     </div>
// //   );
// // };


// // export default Chatbot;

// import { useState } from "react";

// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "👋 Hi! I'm your Smooth Voyage assistant. How can I help with your trip?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Your API Key (Better: store in .env)
//   const API_KEY = "AIzaSyACD4KkHtCJIUCqVO_qCtQWMzUEY8oytco";

//   const SYSTEM_PROMPT = `
// You are SmoothVoyage Assistant, a friendly, helpful, and knowledgeable AI travel companion for the Smooth Voyage website.
// Smooth Voyage lets users log in with Google Auth, create trips with title, destination (with map), dates, and notes, and view them in a dashboard. 
// Help users navigate these features, answer questions, and give travel tips. If asked about collaborators, explain it's coming soon.
// `;

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message to UI
//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               { role: "system", parts: [{ text: SYSTEM_PROMPT }] },
//               ...newMessages.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] }))
//             ]
//           })
//         }
//       );

//       const data = await res.json();
//       const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";

//       setMessages(prev => [...prev, { role: "bot", text: botReply }]);
//     } catch (error) {
//       console.error(error);
//       setMessages(prev => [...prev, { role: "bot", text: "Error: Unable to connect to Smooth Voyage assistant." }]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2">
//       {open && (
//         <div className="bg-white dark:bg-gray-800 border p-3 shadow-lg rounded-lg w-80 mb-2 flex flex-col">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-lg font-semibold">Travel Bot</span>
//             <button
//               onClick={() => setOpen(false)}
//               className="text-gray-500 hover:text-red-500 font-bold text-xl"
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="h-48 overflow-auto border p-2 rounded mb-2 bg-gray-50 dark:bg-gray-700">
//             {messages.map((m, i) => (
//               <p key={i} className={m.role === "user" ? "text-right text-blue-600" : "text-left text-gray-800 dark:text-gray-200"}>
//                 <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
//               </p>
//             ))}
//             {loading && <p className="text-gray-400">Bot is typing...</p>}
//           </div>

//           {/* Input */}
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Type message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="w-full border px-2 py-1 rounded-md"
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
//               onClick={sendMessage}
//               disabled={loading}
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Floating Button */}
//       <button
//         className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//         onClick={() => setOpen(!open)}
//       >
//         💬
//       </button>
//     </div>
//   );
// };

// export default Chatbot;

import { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "👋 How can I help with your trip?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply || "Sorry, I couldn't process that." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "⚠️ Error talking to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2">
      {open && (
        <div className="bg-white dark:bg-gray-800 border p-3 shadow-lg rounded-lg w-80 mb-2 flex flex-col">
        
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Travel Bot</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-500 font-bold text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

      
          <div className="h-48 overflow-auto border rounded-md p-2 mb-2 bg-gray-50 dark:bg-gray-700">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-gray-500 italic">Typing...</div>
            )}
          </div>

   
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border px-2 py-1 rounded-md"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
            >
              ➤
            </button>
          </div>
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
