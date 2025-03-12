"use client"
import { Category } from "@/sanity.types"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"

interface CategorySelectorProps {
    categories: Category[]
}

export function CategorySelectorComponent({ categories }: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const router = useRouter();
 return(
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline"
                role="combobox"
                aria-expanded={open}
                className="header-passkey-button  !animate-none !m-4 !px-6  !bg-red-700">
                {value ? categories.find((category) => category._id === value)?.title : "filter By Category"}

                <ChevronsUpDown className=" ml-2 h-4  w-4 shrink-0" />
            </Button>
        </PopoverTrigger>


        <PopoverContent className="  w-full p-0 ">
            <Command>
                <CommandInput placeholder=" Search Category"
                    className=" h-9 "
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            const selectedCategory = categories.find((c) =>
                                c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                            if (selectedCategory?.slug?.current) {
                                setValue(selectedCategory._id)
                                router.push(`/categories/${selectedCategory.slug.current}`)
                                setOpen(false)
                            }
                        }
                    }} />

                <CommandList>
                    <CommandEmpty> No Category Found</CommandEmpty>
                    <CommandGroup>
                        {categories.map((category) => (
                            <CommandItem key={category._id}
                                value={category.title}
                                onSelect={() => {
                                    setValue(value === category._id ? "" : category._id)
                                    router.push(`/categories/${category.slug?.current}`)
                                    setOpen(false)
                                }}>
                                {category.title}
                                <Check
                                    className={cn("ml-auto h-4 w-4",
                                        value === category._id ? "opacity-100" : "opacity-0"
                                    )} />

                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>

        </PopoverContent>
    </Popover>

  )

}