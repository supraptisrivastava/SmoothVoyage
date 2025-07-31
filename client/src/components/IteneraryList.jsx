    const IteneraryList = ({ itinerary }) => (
  <ul className="border rounded p-4 space-y-2">
    {itinerary.map((item, i) => (
      <li key={i} className="flex justify-between">
        <span>{item.activity}</span>
        <span className="text-gray-500 text-xs">{item.time}</span>
      </li>
    ))}
  </ul>
);

export default IteneraryList;
