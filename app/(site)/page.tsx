import Image from 'next/image';
import React from 'react';
import logo from '../../public/images/logo.svg';
import AuthForm from './components/AuthForm';

const Home = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8  bg-[var(--bg)]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image src={logo} alt="logoChat" className="mx-auto w-auto" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--white)]">
          Sing in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
};

export default Home;
