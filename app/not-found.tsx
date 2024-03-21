import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-md p-6">
        <CardBody className="items-center">
          <svg
            className="w-16 h-16 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">
            404 - Not Found
          </h1>
          <p className="text-default-500 text-center mb-6">
            ページが見つかりませんでした。
          </p>
          <Button color="primary" variant={'light'}>
            <Link href="/">ホームに戻る</Link>
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}