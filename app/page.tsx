'use client';

import { signIn } from 'next-auth/react';
import React, { useEffect } from 'react';

export default function LoginPage(): React.JSX.Element {

  useEffect(() => {
    signIn('google')
  }, [])

  return (
    <div></div>
  )
}