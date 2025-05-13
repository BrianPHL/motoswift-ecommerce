import { useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header, Footer } from '@components';
import { ProtectedRoute } from '@routes';
import { Home, SignIn, SignUp, AboutUs, MotorcyclesStore, MotorcyclesDetails, PartsStore, PartsDetails, Reservations, Cart, Profile, Admin, NotFound } from '@pages';

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
    			<Route path="/motorcycles/:product_id" element={ <MotorcyclesDetails /> } />
    			<Route path="/parts-and-accessories" element={ <PartsStore /> } />
    			<Route path="/parts-and-accessories/:product_id" element={ <PartsDetails /> } />		

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
						<Admin />
					</ProtectedRoute>
				} />

				<Route path="*" element={ <NotFound /> } />

    		</Routes>
    		<Footer />
    	</>
  	);
};

export default App;
