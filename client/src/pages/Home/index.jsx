import { useContext } from 'react';
import { useTheme } from '@context/Theme';
import Header from '@components/Header';
import styles from './Home.module.css';

const Home = () => {

    const { theme, setTheme } = useTheme();

    return (
        <Header></Header>
    );

}

export default Home;
