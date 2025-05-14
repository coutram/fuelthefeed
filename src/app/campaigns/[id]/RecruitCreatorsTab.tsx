import React, { useState } from 'react';

type Props = {
  twitterPost: string;
};

export default function RecruitCreatorsTab({ twitterPost }: Props) {
  const [recruitOption, setRecruitOption] = useState<'social' | 'email' | null>(null);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleAddEmail = () => {
    if (emailInput && /\S+@\S+\.\S+/.test(emailInput)) {
      setEmailList([...emailList, emailInput]);
      setEmailInput('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!recruitOption && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <button
            onClick={() => setRecruitOption('social')}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-pink-400"
          >
            <img src="/twitter-x-logo.png" alt="Twitter/X" className="w-16 h-16 mb-4" />
            <span className="text-xl font-bold text-pink-600 mb-2">Post to Socials</span>
            <span className="text-gray-500 text-center">Share your campaign on Twitter/X to attract creators.</span>
          </button>
          <button
            onClick={() => setRecruitOption('email')}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-blue-400"
          >
            <img src="/email-illustration.png" alt="Email" className="w-16 h-16 mb-4" />
            <span className="text-xl font-bold text-blue-600 mb-2">Email Creators</span>
            <span className="text-gray-500 text-center">Send a personalized campaign invite to selected creators.</span>
          </button>
        </div>
      )}

      {recruitOption === 'social' && (
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8 flex flex-col items-center">
          <img src="/twitter-x-logo.png" alt="Twitter/X" className="w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold mb-2">Share this on Twitter/X</h3>
          <pre className="bg-gray-100 rounded p-4 w-full text-sm text-gray-800 mb-4 whitespace-pre-wrap break-words">
            {twitterPost}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(twitterPost)}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Copy Post
          </button>
          <button
            onClick={() => setRecruitOption(null)}
            className="mt-4 text-sm text-gray-400 hover:text-pink-500"
          >
            ← Back
          </button>
        </div>
      )}

      {recruitOption === 'email' && (
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8 flex flex-col items-center">
          <img src="/email-illustration.png" alt="Email" className="w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold mb-2">Invite Creators by Email</h3>
          <div className="w-full mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {emailList.map((email, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                  {email}
                  <button
                    type="button"
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => setEmailList(emailList.filter((e, i) => i !== idx))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={e => (e.key === 'Enter' ? (e.preventDefault(), handleAddEmail()) : null)}
                placeholder="Enter creator's email and press Enter"
                className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={handleAddEmail}
                className="rounded-r-lg bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>
          </div>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            // onClick={sendEmails} // Implement backend later
          >
            Send Invites
          </button>
          <button
            onClick={() => setRecruitOption(null)}
            className="mt-4 text-sm text-gray-400 hover:text-blue-500"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
