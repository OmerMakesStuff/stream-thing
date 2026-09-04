import { HeaderLogo } from './logo';
import { HeaderSearch } from './search';
import { HeaderUserMenu } from './user-menu';

export const Header = () => (
  <>
    <header className='fixed top-0 z-20 grid h-16 w-full grid-cols-[auto_1fr_auto] bg-background md:grid-cols-[--spacing(20)_1fr] md:bg-transparent lg:grid-cols-[--spacing(80)_1fr]'>
      <HeaderLogo />
      <HeaderSearch />
      <div className='grid w-full place-items-end items-center bg-background px-4'>
        <HeaderUserMenu />
      </div>
    </header>
    <div className='h-16 w-full' />
  </>
);
