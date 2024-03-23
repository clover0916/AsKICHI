'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button, Card, CardBody, Divider, Input, Spacer, Link } from '@nextui-org/react'
import { Suspense, useMemo, useState } from 'react'

export default function SignInPage() {
  return (
    <main>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = useMemo(() => {
    return email !== '' && password !== '';
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const callbackUrl = searchParams.get('callbackUrl') || '/'

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })
      if (response?.error) {
        setError("エラーが発生しました。メールアドレスがパスワードが間違っている可能性があります")
        setIsLoading(false)
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onRegister = () => {
    router.push(`/signup?callbackUrl=${searchParams.get('callbackUrl') || '/'}`)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='min-w-96 p-4'>
        <CardBody>
          <h1 className='text-xl font-bold pb-4'>ログイン</h1>
          <form onSubmit={onSubmit} className='flex flex-col'>
            <Input
              value={email}
              isRequired
              name="email"
              type="text"
              variant="underlined"
              label="メールアドレス"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              value={password}
              isRequired
              type="password"
              name="password"
              variant="underlined"
              label="パスワード"
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
            <Button type="submit" isDisabled={!canSubmit} isLoading={isLoading}>ログイン</Button>
          </form>
          <Spacer y={2} />
          <Link href={"/faq?q=forget_password"} className='text-sm'>パスワードを忘れた</Link>
          <Divider className='my-4' />
          <div>
            <Button onClick={onRegister} className='w-full'>新規登録</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}