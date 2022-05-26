import Link from 'next/link';

const FourOhFour = () => {
    return (
        <div className="grid place-items-center h-screen">
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                Go back home
            </Link>
        </div>
    )
}

export default FourOhFour