import LoginForm from '@/components/forms/login-form';
import { Truck } from 'lucide-react';

export function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6">
          <div className="mb-8 text-center">
            <Truck className="text-primary mx-auto h-12 w-12" />
            <h2 className="text-primary mt-6 text-3xl font-extrabold">
              TranspoLogi
            </h2>
            <p className="text-md mt-2 text-gray-600">Transporte e Logística</p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Imagem com Overlay */}
      <div className="relative hidden w-1/2 lg:block">
        {/* Overlay */}
        <div className="bg-primary absolute inset-0 z-10 opacity-90"></div>

        {/* Imagem */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1661963219843-f1a50a6cfcd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Trucks"
        />

        {/* Texto sobre o overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            TranspoLogi
          </h1>
        </div>
      </div>
    </div>
  );
}
