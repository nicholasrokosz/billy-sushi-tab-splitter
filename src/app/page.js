'use client'

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useState } from 'react'

const items = [
  {
    id: 1,
    label: 'Sapporo draft',
    cost: 7,
  },
  {
    id: 2,
    label: 'Sapporo draft',
    cost: 7,
  },
  {
    id: 3,
    label: 'Sapporo draft',
    cost: 7,
  },
  {
    id: 4,
    label: 'Beyond here lies nothing',
    cost: 15,
  },
  {
    id: 5,
    label: "Sign o' the times",
    cost: 15,
  },
  {
    id: 6,
    label: 'I learn the hard way',
    cost: 15,
  },
  {
    id: 7,
    label: 'Whale sake',
    cost: 15,
  },
  {
    id: 8,
    label: 'Miso soup',
    cost: 7,
  },
  {
    id: 9,
    label: 'Miso soup',
    cost: 7,
  },
  {
    id: 10,
    label: 'Miso soup',
    cost: 7,
  },
  {
    id: 11,
    label: 'Miso soup',
    cost: 7,
  },
  {
    id: 12,
    label: 'Squid game',
    cost: 22,
  },
  {
    id: 13,
    label: 'Edamame',
    cost: 8,
  },
  {
    id: 14,
    label: "Chef's choice nigiri",
    cost: 48,
  },
  {
    id: 15,
    label: "Chef's choice nigiri",
    cost: 48,
  },
  {
    id: 16,
    label: 'S-hon maguro galore',
    cost: 49,
  },
  {
    id: 17,
    label: 'Big blue wave',
    cost: 27,
  },
  {
    id: 18,
    label: 'Fancy & furious',
    cost: 31,
  },
  {
    id: 19,
    label: 'Silly billy roll',
    cost: 26,
  },
  {
    id: 20,
    label: 'Mistletoe',
    cost: 26,
  },
  {
    id: 21,
    label: 'Mistletoe',
    cost: 26,
  },
  {
    id: 22,
    label: 'Nolo yolo roll',
    cost: 27,
  },
  {
    id: 23,
    label: 'Red snapper nigiri',
    cost: 9,
  },
  {
    id: 24,
    label: 'Flounder nigiri',
    cost: 9,
  },
  {
    id: 25,
    label: 'Scallop nigiri',
    cost: 10,
  },
  {
    id: 26,
    label: 'Uncultured swan',
    cost: 23,
  },
  {
    id: 27,
    label: 'Whiskey drunk & b proof',
    cost: 15,
  },
]

const overallSubtotal = items.reduce((a, b) => a + b.cost, 0)
const overallTax = 48.69
const overallTip = 112

export default function Home() {
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [tip, setTip] = useState(0)
  const [selected, setSelected] = useState([])
  const total = subtotal + tax + tip

  const form = useForm({
    defaultValues: {
      items: [],
    },
  })

  function calculateTotal(data) {
    const selectedItems = data.items.map((id) => items[id - 1])
    const subtotal = selectedItems.reduce((a, b) => a + b.cost, 0)
    const proportion = subtotal / overallSubtotal

    setSelected(selectedItems)
    setSubtotal(subtotal)
    setTax(overallTax * proportion)
    setTip(overallTip * proportion)
  }

  return (
    <main className="flex min-h-screen max-w-lg mx-auto flex-col gap-8 p-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Step 1</h1>
        <p className="text-zinc-500 mb-4">Select all items you're paying for</p>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(calculateTotal)}
            onChange={form.handleSubmit(calculateTotal)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Items ordered</FormLabel>
                    {/* <FormDescription> */}
                    {/*   Select the items you ordered */}
                    {/* </FormDescription> */}
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                {...form.register(`${item.id}`)}
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal flex justify-between w-full">
                              <p>{item.label}</p>
                              <p>{item.cost}</p>
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>
      <section>
        <h1 className="text-3xl font-bold mb-2">Step 2</h1>
        <p className="text-zinc-500 mb-4">Pay MJ the bolded amount</p>
        <p className="mb-4">
          ${subtotal.toFixed(2)} + ${tax.toFixed(2)} + ${tip.toFixed(2)} ={' '}
          <span className="font-bold">${total.toFixed(2)}</span>
        </p>
        {selected.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-1">
              Details
              <CaretSortIcon />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3">
              <section>
                <p className="font-bold">Subtotal</p>
                <p>
                  {selected
                    .sort((a, b) => a.id - b.id)
                    .slice(0, -1)
                    .map((item) => `$${item.cost} + `)}{' '}
                  ${selected[selected.length - 1]?.cost} = ${subtotal}
                </p>
              </section>
              <section>
                <p className="font-bold">Tax</p>
                <p>group tax x (subtotal / group subtotal)</p>
                <p>
                  ${overallTax} x (${subtotal} / $513) = ${tax.toFixed(2)}
                </p>
              </section>
              <section>
                <p className="font-bold">Tip</p>
                <p>group tip x (subtotal / group subtotal)</p>
                <p>
                  ${overallTip} x (${subtotal} / $513) = ${tip.toFixed(2)}
                </p>
              </section>
            </CollapsibleContent>
          </Collapsible>
        )}
      </section>
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
