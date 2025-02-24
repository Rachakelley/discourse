import React, { Suspense } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import HeaderAuth from './header-auth';
import SearchInput from '@/components/search/search-input';
import { LogoIcon } from '@/components/common/icons';

export default function Header() {
	return (
		<div className='max-w-screen w-screen flex justify-around items-center bg-[#202621] shadow-lg'>
			<Navbar maxWidth='full'>
				<NavbarBrand>
					<Link
						className='font-bold text-neutral-50 flex items-center gap-2 md:gap-4 lg:gap-6'
						href='/'
					>
						<LogoIcon />
						<span className='hidden md:inline'>Discourse</span>
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
					<NavbarItem className='flex-grow-0'>
						<HeaderAuth />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</div>
	);
}
