import Link from 'next/link';

const Navbar = () => (
    <nav>
        <Link href="/">
            <a>Note App</a>
        </Link>
        <Link href="/new">
            <a>Create note</a>
        </Link>
    </nav>
)

export default Navbar;