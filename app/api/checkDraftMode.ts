import { draftMode } from 'next/headers'

export async function GET() {
  if (process.env.NODE_ENV === 'test') {
    draftMode().enable()
    return new Response('Draft mode is enabled')
  }
  return new Response('Draft mode is not enabled')
}