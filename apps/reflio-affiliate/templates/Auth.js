/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingDots from '@/components/LoadingDots';
import { useUser } from '@/utils/useUser';
import SeoMeta from '@/templates/SEOMeta';
import { AffiliateLogo } from '@/components/Icons/AffiliateLogo';
import AuthForm from '@/components/AuthForm';

const AuthTemplate = ({ type }) => {
  const router = useRouter();
  const { user } = useUser();

  let authState =
    type === 'signin' ? 'Sign in' : type === 'signup' ? 'Sign up' : 'Sign in';

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  if (!user)
    return (
      <>
        <div className="py-12">
          <div className="mb-6">
            <AffiliateLogo className="mx-auto h-auto w-44" />
          </div>
          <div className="mx-auto max-w-lg rounded-xl border-4 border-gray-300 bg-white p-10">
            <AuthForm affiliate={true} type={type} />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="m-6">
        <LoadingDots />
      </div>
    </>
  );
};

export default AuthTemplate;
