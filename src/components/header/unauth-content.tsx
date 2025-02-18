import { Button, NavbarItem } from '@heroui/react';
import * as actions from '@/actions';

export default function UnauthContent() {
	return (
		<NavbarItem>
			<form action={actions.signIn}>
				<Button
					type='submit'
					color='success'
					variant='solid'
				>
					Sign In
				</Button>
			</form>
		</NavbarItem>
	);
}
