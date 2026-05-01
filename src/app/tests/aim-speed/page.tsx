import { AimTest } from '@/components/AimTest';

export const metadata = {
  title: 'Aim Speed Test - Human Benchmark',
  description: 'Test your aiming speed and accuracy.',
};

export default function AimSpeedPage() {
  return (
    <main className="flex-1 flex flex-col">
      <AimTest />
    </main>
  );
}
