import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className='text-2xl font-bold'>
                        Διαχειριστής Αποθέματος
                    </Link>

                    <div className='flex space-x-6'>
                        <Link to="/" className='hover:text-blue-200 transition-colors'> 
                            Πίνακας Ελέγχου
                        </Link>
                        <Link to="/products" className='hover:text-blue-200 transition-colors'> 
                            Προϊόντα
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;