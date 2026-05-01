import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-[#2b87d1] text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Human Benchmark</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Measure your abilities with brain games and cognitive tests.
        </p>
      </section>

      {/* Games Grid */}
      <section className="w-full max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Reaction Time Card */}
          <Link href="/tests/reaction-time" className="group block">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md hover:border-[#2b87d1] dark:hover:border-[#2b87d1] transition-all duration-200 h-full flex flex-col">
              <div className="bg-[#2b87d1] h-32 flex items-center justify-center text-white group-hover:bg-[#2069a5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">Reaction Time</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Test your visual reflexes.
                </p>
              </div>
            </div>
          </Link>
          
          {/* Placeholder Card for future games */}
          <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden h-full flex flex-col items-center justify-center p-6 text-zinc-400 dark:text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-lg font-medium">More tests coming soon</h2>
          </div>

        </div>
      </section>
    </main>
  );
}
