export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-fantasy-darkBrown via-fantasy-brown to-fantasy-darkBrown">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-fantasy-parchment mb-4">
            🎲 DnD Buddy
          </h1>

          <p className="text-2xl text-fantasy-parchment/90">
            Your AI-Powered Dungeon Master
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-fantasy-parchment">
            <div className="fantasy-border parchment-bg p-6">
              <h2 className="text-xl font-bold mb-3">🤖 AI Dungeon Master</h2>
              <p className="text-sm">ChatGPT brings your adventure to life with immersive storytelling</p>
            </div>

            <div className="fantasy-border parchment-bg p-6">
              <h2 className="text-xl font-bold mb-3">🎭 4-Player Co-op</h2>
              <p className="text-sm">Real-time multiplayer synchronization for your party</p>
            </div>

            <div className="fantasy-border parchment-bg p-6">
              <h2 className="text-xl font-bold mb-3">📊 Strict Stat Tracking</h2>
              <p className="text-sm">HP, Mana, Armor, XP, Inventory - everything tracked</p>
            </div>

            <div className="fantasy-border parchment-bg p-6">
              <h2 className="text-xl font-bold mb-3">🎨 AI Image Generation</h2>
              <p className="text-sm">Character portraits, scenes, and epic moments visualized</p>
            </div>
          </div>

          <div className="mt-12">
            <button className="fantasy-border parchment-bg px-8 py-4 text-lg font-bold hover:scale-105 transition-transform">
              Begin Your Adventure →
            </button>
          </div>

          <div className="mt-8 text-fantasy-parchment/70 text-sm">
            <p>Status: 🏗️ Setting up the realm...</p>
            <p className="mt-2">Next.js 14 • TypeScript • Tailwind CSS</p>
          </div>
        </div>
      </div>
    </main>
  );
}
