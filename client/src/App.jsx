import { useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header, Footer } from '@components';
import { Home, SignIn, SignUp, AboutUs, MotorcyclesStore, MotorcyclesDetails, PartsStore, PartsDetails, Reservations, ReservationForm, Cart } from '@pages';

const PAGE_TITLES = {
  "/": "MotoSwift | Your Trusted Motorcycle Shop - Ride Fast, Ride Smart",
  "/sign-in": "MotoSwift | Sign In",
  "/sign-up": "MotoSwift | Sign Up",
  "/about-us": "MotoSwift | About Us",
  "/motorcycles": "MotoSwift | Motorcycles",
  "/parts-and-accessories": "MotoSwift | Parts & Accessories",
  "/reservation": "MotoSwift | Reservation",
  "/cart": "MotoSwift | Cart",
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
        <Route path="/sign-in" element={ <SignIn /> } />
        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="/about-us" element={ <AboutUs /> } />
        <Route path="/motorcycles" element={ <MotorcyclesStore /> } />
        <Route path="/motorcycle-details" element={ <MotorcyclesDetails /> } />
        <Route path="/parts-and-accessories" element={ <PartsStore /> } />
        <Route path="/parts-and-accessories-details" element={ <PartsDetails /> } />
        <Route path="reservations" element={ <Reservations /> } />
        <Route path="/reservation-form" element={ <ReservationForm /> } />
        <Route path="/cart" element={ <Cart /> } />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
