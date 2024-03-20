"use client"

import { Button, Input, Link, Spacer } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Settings() {
  const { data: session } = useSession()

  const [error, setError] = useState<string>("")

  const [name, setName] = useState<string>(session?.user?.name ?? '')

  useEffect(() => {
    setName(session?.user?.name ?? '')
  }, [session])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const name = data.get('name') as string
    const old_password = data.get('old_password') as string
    const new_password = data.get('new_password') as string

    if (old_password && !new_password) {
      setError('新しいパスワードを入力してください')
      return
    }

    const res = await fetch('/api/users/settings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        old_password,
        new_password
      })
    })

    if (res.ok) {
      setError('')
      alert('保存しました')
    } else {
      const body = await res.json()
      setError(body.message)
    }
  }

  return (
    <>
      <h1 className='text-3xl font-bold pb-3'>ユーザー設定</h1>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="pb-4">
          <h4 className="text-lg font-bold pb-2">メールアドレス</h4>
          <Input
            type="email"
            variant="underlined"
            isReadOnly
            className="max-w-96"
            value={session?.user?.email ?? ''}
          />
          <Link
            href={"/faq?q=can't_change_my_email"}
            className="text-sm"
            showAnchorIcon
          >
            メールアドレスは変更できません
          </Link>
        </div>
        <div className="pb-4">
          <h4 className="text-lg font-bold pb-2">ニックネーム</h4>
          <Input
            type="text"
            name="name"
            variant="underlined"
            className="max-w-96"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="pb-4">
          <h4 className="text-lg font-bold pb-2">パスワード</h4>
          <Input
            type="password"
            name="old_password"
            variant="underlined"
            label="現在のパスワード"
            className="max-w-96" />
          <Spacer y={2} />
          <Input
            type="password"
            name="new_password"
            variant="underlined"
            label="新しいパスワード"
            className="max-w-96"
          />
        </div>
        {error && (
          <>
            <div className='border-2 border-red-700 bg-red-700/30 rounded-lg px-4 py-2 text-sm'>
              {error}
            </div>
            <Spacer y={2} />
          </>
        )}
        <Button type="submit" className="w-32">
          保存
        </Button>
      </form>
    </>
  )
}