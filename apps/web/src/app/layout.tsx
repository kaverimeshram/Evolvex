import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Web3Provider } from '../providers/Web3Provider';

export const metadata: Metadata = {
  title: 'EvolveX - Autonomous AI Strategy Evolution Engine',
  description: 'Autonomous Intelligence. Continuous Evolution. Powered by Reactive Network.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-zinc-100 min-h-screen antialiased flex">
        <Web3Provider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <TopNav />
            <main className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}

