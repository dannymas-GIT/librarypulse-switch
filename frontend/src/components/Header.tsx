import { Link } from 'react-router-dom';
import libraryPulseLogo from '@/assets/librarypulselogo.jpg';
import { MainNav } from '@/components/MainNav';
import { Search } from '@/components/Search';
import { UserNav } from '@/components/UserNav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <img 
            src={libraryPulseLogo} 
            alt="LibraryPulse Logo" 
            className="h-8 w-auto"
          />
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </header>
  )
} 