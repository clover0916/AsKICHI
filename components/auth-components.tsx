import { Button } from "@nextui-org/react"
import { signIn } from "auth"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button type="submit" {...props}>ログイン</Button>
    </form>
  )
}