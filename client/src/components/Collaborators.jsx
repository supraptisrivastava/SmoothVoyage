// const Collaborators = ({ collaborators }) => {
//   if (!Array.isArray(collaborators)) return null;

//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold mb-2">Collaborators</h3>
//       <ul className="list-disc list-inside">
//         {collaborators.map((user, idx) => (
//           <li key={idx}>{user.name || user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Collaborators;
import { useState } from "react";

const Collaborators = ({ collaborators = [], onInvite }) => {
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    if (!email.trim()) return;

    // Call the invite handler passed from parent (or you can add logic here)
    onInvite?.(email);

    // Clear input
    setEmail("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Collaborators</h3>

      <ul className="list-disc list-inside mb-4">
        {collaborators.map((user, idx) => (
          <li key={idx}>{user.name || user.email}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        {/* <input
          type="email"
          value={email}
          onChange={(e) => {
            console.log("Typing:", e.target.value);
            setEmail(e.target.value)}}
          placeholder="Invite by email"
          className="border rounded px-3 py-1 w-full"
        /> */}
        <input
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Test input"
  className="border border-red-500 text-black p-2 w-full"
/>

        <button
          onClick={handleInvite}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Invite
        </button>
      </div>
    </div>
  );
};

export default Collaborators;
