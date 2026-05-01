import { ReactionTest } from '@/components/ReactionTest';

export const metadata = {
  title: 'Reaction Time Test - Human Benchmark',
  description: 'Test your visual reflexes.',
};

export default function ReactionTimePage() {
  return (
    <main className="flex-1 flex flex-col">
      <ReactionTest />
    </main>
  );
}
