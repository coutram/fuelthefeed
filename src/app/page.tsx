import Image from "next/image";

process.removeAllListeners('warning');

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] flex flex-col items-center">
      {/* Top Bar Navigation */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#fdf9ef] fixed top-0 left-0 z-50 border-b border-[#1e3a4c] shadow-md">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Fuel the Feed Logo" width={80} height={80} />
        </div>
        <div className="flex gap-4">
          <a href="#how-it-works" className="text-[#0c2937] font-semibold px-5 py-2 rounded-full hover:bg-pink-500/80 hover:text-white transition">How it Works</a>
          <a href="#get-rewarded" className="text-[#0c2937] font-semibold px-5 py-2 rounded-full hover:bg-pink-500/80 hover:text-white transition">Get Rewarded</a>
          <a href="#team" className="text-[#0c2937] font-semibold px-5 py-2 rounded-full hover:bg-pink-500/80 hover:text-white transition">Team</a>
          <a href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full shadow transition">Join Today / Login</a>
        </div>
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-24" />
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-8 w-full" style={{ background: '#0b2834' }}>
        <Image src="/large-logo.png" alt="Fuel the Feed Logo" width={420} height={420} className="mb-6" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
          Fuel the Feed
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
          Where creators earn rewards for content that travels. Launch custom quests, track engagement, and drive virality across platforms.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg transition">
          <a href="/login">Get Started</a>
        </button>
      </section>

      {/* Spacer for fixed nav */}
      <div className="h-24"  style={{ background: '#0b2834' }} />
      <section id="how-it-works" className="w-full py-20 flex flex-col items-center bg-[#f7f5f0]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2937] mb-10 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl w-full px-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-[#0c2937] mb-2">Create a Compelling Brief</h3>
            <p className="text-[#0c2937]/80">
              Craft a clear, inspiring campaign brief that outlines your goals, brand story, and what you want creators to share.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">📣</div>
            <h3 className="text-xl font-bold text-[#0c2937] mb-2">Attract Influencers</h3>
            <p className="text-[#0c2937]/80">
              Publish your campaign to our marketplace and invite nano influencers who align with your brand to participate.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-[#0c2937] mb-2">Reward the Creators</h3>
            <p className="text-[#0c2937]/80">
              Motivate creators with rewards for reach, creativity, and engagement—whether it&apos;s cash, products, or exclusive perks.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-[#0c2937] mb-2">See the Performance</h3>
            <p className="text-[#0c2937]/80">
              Track campaign results in real time—see reach, engagement, and top-performing creators in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Get Rewarded Section */}
      <section
        id="get-rewarded"
        className="relative w-full py-20 flex flex-col items-center overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {/* Background Images */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/influencer1.jpg"
            alt="Creators"
            width={1920}
            height={1080}
            className="object-cover w-full h-full opacity-60 absolute left-0 top-0"
          />
          <Image
            src="/influencer2.jpg"
            alt="Community"
            width={1920}
            height={1080}
            className="object-cover w-full h-full opacity-60 absolute right-0 bottom-0"
          />
          {/* Black overlay for readability */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">
            Get Rewarded
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
            {/* Reward 1 */}
            <div className="flex flex-col items-center bg-white/10 rounded-2xl shadow-lg p-8 backdrop-blur-md">
              <div className="text-5xl mb-4">💸</div>
              <h3 className="text-xl font-bold text-white mb-2">Earn for Every Post</h3>
              <p className="text-white/90">
                Get paid for sharing new, creative content with your followers—no matter your audience size.
              </p>
            </div>
            {/* Reward 2 */}
            <div className="flex flex-col items-center bg-white/10 rounded-2xl shadow-lg p-8 backdrop-blur-md">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Go Viral, Get Bonuses</h3>
              <p className="text-white/90">
                Unlock extra rewards and exclusive perks when your content drives engagement and spreads across the web.
              </p>
            </div>
            {/* Reward 3 */}
            <div className="flex flex-col items-center bg-white/10 rounded-2xl shadow-lg p-8 backdrop-blur-md">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-white mb-2">Special Kicker Prizes</h3>
              <p className="text-white/90">
                Win surprise bonuses, brand gifts, and recognition for creativity, originality, and community impact.
              </p>
            </div>
          </div>
          <p className="mt-10 text-lg text-white text-center max-w-2xl drop-shadow">
            The more creative and viral your content, the more you earn. Start sharing, stand out, and get rewarded in ways that matter to you!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#f7339a] py-8 mt-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-white">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {year} Fuel the Feed. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
