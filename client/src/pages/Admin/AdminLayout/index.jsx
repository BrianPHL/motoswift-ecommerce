import { ReturnButton, Anchor } from '@components';
import { Outlet, useLocation } from 'react-router';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {

    const HEADER_TITLES = {
	    "/": "MotoSwift | Your Trusted Motorcycle Shop - Ride Fast, Ride Smart",
        "/admin": "Admin Dashboard",
        "/admin/products": "Admin Products",
        "/admin/reservations": "Admin Reservations",
        "/admin/stocks": "Admin Stocks",
        "/admin/installments": "Admin Installments"
    };
    const location = useLocation();
    const pathname = location['pathname'];
    
    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['header'] }>
                <ReturnButton />
                <h1>{ HEADER_TITLES[ pathname ] || HEADER_TITLES["/"] }</h1>
            </div>
            <div className={ styles['container'] }>
                <div className={ styles['nav'] }>
                    <Anchor
                        label="Dashboard"
                        link="/admin"
                        isNested={ true }
                        isActive={ pathname === '/admin' }
                    />
                    <Anchor
                        label="Products"
                        link="/admin/products"
                        isNested={ true }
                        isActive={ pathname === '/admin/products' }
                    />
                    <Anchor
                        label="Reservations"
                        link="/admin/reservations"
                        isNested={ true }
                        isActive={ pathname === '/admin/reservations' }
                    />
                    <Anchor
                        label="Stocks"
                        link="/admin/stocks"
                        isNested={ true }
                        isActive={ pathname === '/admin/stocks' }
                    />
                    <Anchor
                        label="Installments"
                        link="/admin/installments"
                        isNested={ true }
                        isActive={ pathname === '/admin/installments' }
                    />
                </div>
                <div className={ styles['admin-container'] }>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
