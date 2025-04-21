import { Header, Footer } from '@components';
import styles from './Home.module.css';

const Home = () => {

    return (
        <div className={ styles['home'] }>
            <Header />
            <Footer />
        </div>
    );

}

export default Home;
