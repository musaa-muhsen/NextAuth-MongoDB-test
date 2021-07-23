import Link from 'next/link';

const Navbar = () => (
    <nav>
        <div> <Link href="/">
            <a>All Users</a>
        </Link></div>
       <div>
       <Link href="/new">
            <a>Create User</a>
        </Link>
       </div>
      
    </nav>
)

export default Navbar;