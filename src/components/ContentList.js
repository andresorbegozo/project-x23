import React from 'react';

export function ContentList({ title, items, onAdd, placeholder }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border rounded mb-4"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onAdd(e.target.value);
            e.target.value = '';
          }
        }}
      />
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded mb-2">
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-sm mt-2">{item.summary}</p>
          <div className="text-xs text-gray-500 mt-2">
            Added: {new Date(item.timestamp).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
