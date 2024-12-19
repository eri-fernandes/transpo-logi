import LoginForm from '@/components/forms/login-form';
import { Truck } from 'lucide-react';
import loginBg from '../../assets/login-bg.png';

export function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6">
          <div className="mb-8 text-center">
            <Truck className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-primary">
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
        <div className="absolute inset-0 z-10 bg-primary opacity-90"></div>

        {/* Imagem */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginBg}
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
