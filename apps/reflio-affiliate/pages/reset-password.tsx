/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useUser, resetPassword } from '@/utils/useUser';
import SEOMeta from '@/templates/SEOMeta';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'note' | 'error';
    content: string;
  } | null>(null);

  const router = useRouter();
  const { user, forgotPassword } = useUser();

  let access_token: null | string = null;

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    const { error } = await forgotPassword(email);
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({
        type: 'note',
        content: 'Check your email for the password reset link.'
      });
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    // @ts-ignore
    const { error } = await resetPassword(access_token, password);
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({
        type: 'note',
        content: 'Your password has been reset'
      });
    }
    setTimeout(function () {
      router.push('/dashboard');
    }, 3000);
    setLoading(false);
  };

  if (router?.asPath?.indexOf('?passwordReset=true&access_token=') > 0) {
    access_token = router?.asPath?.split('&access_token=')[1].split('&')[0];
  }

  useEffect(() => {
    if (
      user &&
      router?.asPath?.indexOf('?passwordReset=true&access_token=') === -1
    ) {
      router.replace('/dashboard');
    }
  }, [user]);

  return (
    <>
      <SEOMeta title="Reset Password" />
      <div>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="border-primary-2 w-full max-w-md space-y-8 rounded-xl border-4 bg-white p-10 shadow-lg">
            <div>
              <h1 className="text-center text-3xl font-extrabold text-gray-900">
                Reset your password
              </h1>
            </div>

            {router?.asPath?.indexOf('?passwordReset=true&access_token=') >
            0 ? (
              <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="relative block w-full appearance-none rounded-none border border-gray-300 p-3 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-primary group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Confirm new password
                  </button>
                </div>

                <div className="mt-3 text-center text-sm">
                  <span className="text-accents-2">
                    Don&apos;t have an account?
                  </span>
                  {` `}
                  <Link
                    href="/signup"
                    className="text-accents-1 cursor-pointer font-bold hover:underline"
                  >
                    Sign up.
                  </Link>
                </div>

                {message?.content && (
                  <div
                    className={`${
                      message.type === 'error' ? 'text-pink' : 'text-green'
                    } border ${
                      message.type === 'error' ? 'border-pink' : 'border-green'
                    } p-3`}
                  >
                    {message.content}
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none border border-gray-300 p-3 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none sm:text-sm"
                      placeholder="Email address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-secondary group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Send password reset
                  </button>
                </div>

                <div className="mt-3 text-center text-sm">
                  <span className="text-accents-2">
                    Don&apos;t have an account?
                  </span>
                  {` `}
                  <Link
                    href="/signup"
                    className="text-accents-1 cursor-pointer font-bold hover:underline"
                  >
                    Sign up.
                  </Link>
                </div>

                {message?.content && (
                  <div
                    className={`${
                      message.type === 'error' ? 'text-pink' : 'text-green'
                    } border ${
                      message.type === 'error' ? 'border-pink' : 'border-green'
                    } p-3`}
                  >
                    {message.content}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
