import Image from "next/image";

export default function Home() {
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
          <a href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full shadow transition">Join Today</a>
        </div>
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-24" />
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-8 w-full" style={{ background: '#0b2834' }}>
        <Image src="/large-logo.png" alt="Fuel the Feed Logo" width={420} height={420} className="mb-6" />


        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
          Where creators earn rewards for content that travels. Launch custom quests, track engagement, and drive virality across platforms.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg transition">
          <a href="/login">Get Started</a>
        </button>
      </section>
    </main>
  );
}
