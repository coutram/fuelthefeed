export default function CampaignSubNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { key: 'details', label: 'Campaign Details' },
    { key: 'brief', label: 'Campaign Brief' },
    { key: 'recruit', label: 'Recruit Creators' },
  ];
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
