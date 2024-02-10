'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DropdownNav } from '@/components/navigation/dropdown-nav'
import { buttonVariants } from '@/components/ui/button'
import { NavBarOption } from '@/types/utils'

type Props = { className?: string } & React.HTMLAttributes<HTMLElement>

export const MainNav = (props: Props) => {
    const { className } = props

    const navOptions: NavBarOption[] = [
        { label: 'Home', value: '' },
        { label: 'About', value: '#about' },
        { label: 'Contact', value: '#contact' },
        { label: 'Etc...', value: '#etc' },
    ]

    return (
        <>
            <nav className={cn('hidden xl:flex items-center', className)}>
                { navOptions.map(op => (
                    <Link key={op.value} href={op.value} className={cn(
                        buttonVariants({ variant: 'link' }),
                        op.active && 'text-muted-foreground underline'
                    )}
                    >{op.label}</Link>
                ))}
            </nav>
            <DropdownNav options={navOptions} className="xl:hidden" />
        </>
    )
}
