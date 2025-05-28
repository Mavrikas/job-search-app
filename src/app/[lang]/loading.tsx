import { ProgressSpinner } from 'primereact/progressspinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="border-solid border-3 rounded-lg p-5 bg-[#fafafa] max-w-[800px] min-w-[400px] m-1 flex flex-col items-center justify-center gap-4">
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      </main>
    </div>
  );
}
