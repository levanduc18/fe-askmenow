'use client';

import LoginForm from '@/features/auth/components/LoginForm';
import { WithGuest } from '@/components/guards/WithGuest';
import React from 'react';

const LoginPage = () => {
  return (
    <WithGuest>
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </WithGuest>
  );
};

export default LoginPage;
