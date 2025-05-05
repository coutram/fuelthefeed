import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] flex flex-col items-center">
      <header className="w-full flex justify-center py-8">
        <Image src="/logo.png" alt="Fuel the Feed Logo" width={120} height={120} />
      </header>
      <section className="flex flex-col items-center text-center mt-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
          Fuel the Feed
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
          Where creators earn rewards for content that travels. Launch custom quests, track engagement, and drive virality across platforms.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg transition">
          Get Started
        </button>
      </section>
    </main>
  );
}
