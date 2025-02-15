import React, { Suspense } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import HeaderAuth from './header-auth';
import SearchInput from '@/components/search/search-input';
import { LogoIcon } from '@/components/common/icons';

export default function Header() {
	return (
		<Navbar className='w-full flex justify-around items-center bg-stone-900 shadow-lg'>
			<NavbarBrand>
				<Link
					className='font-bold text-neutral-50 flex items-center gap-2 md:gap-4 lg:gap-6'
					href='/'
				>
					<LogoIcon />
					Discourse
				</Link>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<NavbarItem>
					<Suspense>
						<SearchInput />
					</Suspense>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}
