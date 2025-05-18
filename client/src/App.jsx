import { useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header, Footer } from '@components';
import { ProtectedRoute } from '@routes';
import { Home, SignIn, SignUp, AboutUs, Reservations, Cart, Profile, NotFound } from '@pages';
import { Store as MotorcyclesStore, ProductPage as MotorcyclesProductPage } from '@pages/Motorcycles';
import { Store as PartsAndAccessoriesStore, ProductPage as PartsAndAccessoriesProductPage } from '@pages/PartsAndAccessories';
import { AdminLayout, AdminDashboard, AdminProducts, AdminReservations, AdminStocks, AdminInstallments } from '@pages/Admin';

const PAGE_TITLES = {
	"/": "MotoSwift | Your Trusted Motorcycle Shop - Ride Fast, Ride Smart",
	"/sign-in": "MotoSwift | Sign In",
	"/sign-up": "MotoSwift | Sign Up",
	"/about-us": "MotoSwift | About Us",
	"/motorcycles": "MotoSwift | Motorcycles",
	"/parts-and-accessories": "MotoSwift | Parts & Accessories",
	"/reservations": "MotoSwift | Reservations",
	"/cart": "MotoSwift | Cart",
	"/profile": "MotoSwift | Profile",
	"/admin": "MotoSwift | Admin"
};

const App = () => {

	const location = useLocation();	
	
	useEffect(() => {
	  document.title = PAGE_TITLES[location.pathname] || PAGE_TITLES["/"];
	  window.scrollTo(0, 0);
	}, [ location.pathname ]);

	return (
		<>
    		<Header />
    		<Routes>
    			
				<Route path="/" element={ <Home /> } />
    			<Route path="/about-us" element={ <AboutUs /> } />
    			<Route path="/motorcycles" element={ <MotorcyclesStore /> } />
    			<Route path="/motorcycles/:product_id" element={ <MotorcyclesProductPage /> } />
    			<Route path="/parts-and-accessories" element={ <PartsAndAccessoriesStore /> } />
    			<Route path="/parts-and-accessories/:product_id" element={ <PartsAndAccessoriesProductPage /> } />		

				<Route path="/sign-in" element={
					<ProtectedRoute>
						<SignIn />
					</ProtectedRoute>
				} />

				<Route path="/sign-up" element={
					<ProtectedRoute>
						<SignUp />
					</ProtectedRoute>
				} />

				<Route path="/profile" element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				} />
				
				<Route path="/reservations" element={
					<ProtectedRoute>
						<Reservations />
					</ProtectedRoute>
				} />

    			<Route path="/cart" element={
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				} />

				<Route path="/admin" element={
					<ProtectedRoute>
						<AdminLayout />
					</ProtectedRoute>
				}>
					<Route index element={<AdminDashboard />} />
					<Route path="products" element={<AdminProducts />} />
					<Route path="reservations" element={<AdminReservations />} />
					<Route path="stocks" element={<AdminStocks />} />
					<Route path="installments" element={<AdminInstallments />} />
				</Route>

				<Route path="*" element={ <NotFound /> } />

    		</Routes>
    		<Footer />
    	</>
  	);
};

export default App;
