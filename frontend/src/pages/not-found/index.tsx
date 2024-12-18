export function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-primary text-4xl font-bold">404</h1>
        <p className="mt-4">Página não encontrada.</p>

        <a
          href="/"
          className="bg-primary mt-4 inline-block rounded-md px-4 py-2 text-white"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
