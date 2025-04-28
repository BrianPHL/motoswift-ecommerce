import { TableHeader, Button, ProductCard, ReturnButton } from '@components';
import styles from './PartsStore.module.css';

const PartsStore = () => {
    return (
        <div className={styles['wrapper']}>    
            <div className={ styles['banner'] }>
            </div>
            <span className={styles['pagewrap']}>
            <ReturnButton />
            </span>
                <h1>Find The Perfect Parts For Your Ride</h1>
                <TableHeader tableName='parts-and-accessories' />
                <div className={styles['container']}>
                <div className={styles['products']}>
                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />

                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />

                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />

                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />

                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                    tags={['Motor Parts', 'Mirror', 'Krator']}
                    name="Krator Universal Black Motorcycle Mirrors- Pair"
                    price="₱1,119.44"
                    description="Adjustable Mirror Angle, Up and Down, Left and Right"
                    imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                tags={['Motor Parts', 'Mirror', 'Krator']}
                name="Krator Universal Black Motorcycle Mirrors- Pair"
                price="₱1,119.44"
                description="Adjustable Mirror Angle, Up and Down, Left and Right"
                imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                onReserve={() => console.log('Reserved')}
                onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                tags={['Motor Parts', 'Mirror', 'Krator']}
                name="Krator Universal Black Motorcycle Mirrors- Pair"
                price="₱1,119.44"
                description="Adjustable Mirror Angle, Up and Down, Left and Right"
                imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                onReserve={() => console.log('Reserved')}
                onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                tags={['Motor Parts', 'Mirror', 'Krator']}
                name="Krator Universal Black Motorcycle Mirrors- Pair"
                price="₱1,119.44"
                description="Adjustable Mirror Angle, Up and Down, Left and Right"
                imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                onReserve={() => console.log('Reserved')}
                onCart={() => console.log('Added to cart')}
                />
                <ProductCard
                tags={['Motor Parts', 'Mirror', 'Krator']}
                name="Krator Universal Black Motorcycle Mirrors- Pair"
                price="₱1,119.44"
                description="Adjustable Mirror Angle, Up and Down, Left and Right"
                imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                onReserve={() => console.log('Reserved')}
                onCart={() => console.log('Added to cart')}
                />
                </div>
            </div>
            <div className={styles['paginationContainer']}>
                <div className={styles['info']}>
                    <h3>Showing 12 out of 20 results </h3>
                    <h3>Sort: None | Filter: None</h3>
                </div>
                <div className={styles['pagination']}>
                    <Button
                    type="icon"
                    icon="fa-solid fa-chevron-left"
                    action={() => console.log('Clicked')}
                    isOutlined={true} 
                    />

                    <Button label="1" type="secondary" action={() => console.log('Submit')} />

                    <Button label="2" type="secondary" action={() => console.log('Submit')} />

                    <Button
                    type="icon"
                    icon="fa-solid fa-chevron-right"
                    action={() => console.log('Clicked')}
                    isOutlined={true} 
                    />
                </div>
            </div>
        </div>
        
    );
};

export default PartsStore;
