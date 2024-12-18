export function Spinner() {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );
}
