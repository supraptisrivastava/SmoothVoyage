// import { useState } from 'react';

// const PlaceSearch = ({ onSelect }) => {
//   const [input, setInput] = useState('');
//   const handleSelect = () => {
//     if (input.trim()) onSelect(input.trim());
//   };
//   return (
//     <div className="flex space-x-2">
//       <input
//         type="text"
//         placeholder="Search place"
//         className="border px-3 py-2 rounded w-full"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSelect} className="bg-blue-600 text-white px-3 rounded">
//         Go
//       </button>
//     </div>
//   );
// };

// export default PlaceSearch;
import { useState, useEffect } from 'react';

const PlaceSearch = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 3) return;

      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${input}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [input]);



const handleSelect = (place) => {
  const { name, city, country } = place.properties;
  const [lon, lat] = place.geometry.coordinates;

  onSelect({
    display_name: `${name}, ${city || ''}, ${country}`,
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  });

  setInput(`${name}, ${city || ''}, ${country}`);
  setSuggestions([]);
};

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search place"
        className="border px-3 py-2 rounded w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
          {suggestions.map((place) => (
            <li
              key={place.properties.osm_id}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.properties.name}, {place.properties.city || ''},{' '}
              {place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceSearch;
