import logo2 from '../assets/logo2.png'
const Navbar = () => {
  return (
      // TSX structure for your navbar
      <header className='py-2.5'>
          <nav className='flex items-center justify-between'>
              <img src={logo2} alt="Weather Whiz Logo" className='h-10' />
          </nav>
      </header>
  );
};

export default Navbar;