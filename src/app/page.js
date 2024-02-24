import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import { CaretSortIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Show receipt image</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receipt picture</DialogTitle>
          </DialogHeader>
          <Image
            src="/billy-sushi-receipt.jpeg"
            alt="Receipt picture"
            width={500}
            height={100}
            priority
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
