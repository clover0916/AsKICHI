'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button, Card, CardBody, Input, Spacer } from '@nextui-org/react'
import { useMemo, useState } from 'react'

export default function SignInPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>("")

  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validateEmail = (value: string) => value.match(/^[a-zA-Z0-9._-]+@metro.ed.jp$/);

  const isInvalidEmail = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidPassword = useMemo(() => {
    if (password === '') return false;

    return password.length < 8;
  }, [password]);

  const canSubmit = useMemo(() => {
    return !isInvalidEmail && !isInvalidPassword && email !== '' && name !== '' && password !== '';
  }, [isInvalidEmail, isInvalidPassword, email, name, password]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const callbackUrl = searchParams.get('callbackUrl') || '/'

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      })
      if (response?.ok) {
        signIn()
        router.push(callbackUrl)
      } else {
        const data = await response.json()
        setError(data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='min-w-xs p-4'>
        <CardBody>
          <h1 className='text-xl font-bold pb-4'>新規登録</h1>
          <p className='text-sm'>メールアドレスは学校配布のを使用してください</p>
          <p className='text-sm'>パスワードは<span className='text-red-500'>学校配布のものと同じにしない</span>でください</p>
          <Spacer y={4} />
          <form onSubmit={onSubmit} className='flex flex-col'>
            <Input
              value={email}
              isRequired
              name="email"
              variant="underlined"
              label="メールアドレス"
              autoComplete='email'
              isInvalid={isInvalidEmail}
              color={isInvalidEmail ? 'danger' : 'default'}
              errorMessage={isInvalidEmail && '学校配布のメールアドレスを使用してください'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              value={name}
              isRequired
              name="name"
              variant="underlined"
              label="ニックネーム"
              autoComplete='name'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              value={password}
              isRequired
              type="password"
              variant="underlined"
              name="password"
              label="パスワード"
              autoComplete='new-password'
              isInvalid={isInvalidPassword}
              color={isInvalidPassword ? 'danger' : 'default'}
              errorMessage={isInvalidPassword && 'パスワードは8文字以上にしてください'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Spacer y={4} />
            {error && (
              <>
                <div className='border-2 border-red-700 bg-red-700/30 rounded-lg px-4 py-2 text-sm'>
                  {error}
                </div>
                <Spacer y={2} />
              </>
            )}
            <Button type="submit" isDisabled={!canSubmit}>登録</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}