import React from 'react';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'invitations', label: 'Invitations' },
  { key: 'explore', label: 'Explore to Earn' },
];

export default function CreatorSubNav({ activeTab, setActiveTab }: Props) {
  return (
    <nav className="flex space-x-2 bg-[#f5f7fb] rounded-xl p-2 shadow-sm w-fit mx-auto mb-8">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === tab.key
              ? 'bg-pink-500 text-white shadow'
              : 'text-gray-700 hover:bg-pink-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
