export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="border-solid border-3 rounded-lg p-5 bg-[#fafafa] max-w-[800px] min-w-[400px] m-1">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p className="text-lg">Please wait while we fetch the data.</p>
        </div>
      </main>
    </div>
  );
}
