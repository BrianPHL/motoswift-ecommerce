import { Button, InputField } from '@components';
import styles from './TableHeader.module.css';

const TableHeader = ({ tableName }) => {

    if (tableName !== 'motorcycles' && tableName !== 'parts-and-accessories') return null;

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['top'] }>
                <Button
                    id='sort-by-dropdown'
                    label='Sort by'
                    type='secondary'
                    options={[
                        {
                            label: 'Sort by: Price (Low to High)',
                            action: () => { console.log('Price (Low to High)') },
                        },
                        {
                            label: 'Sort by: Price (High to Low)',
                            action: () => { console.log('Price (High to Low)') },
                        },
                        {
                            label: 'Name: A-Z',
                            action: () => { console.log('Name: A-Z') },
                        },
                        {
                            label: 'Name: Z-A',
                            action: () => { console.log('Name: Z-A') },
                        },
                    ]}
                />
                <InputField hint='Search for motorcycles...' />
            </div>
            <div className={ styles['divider'] }></div>
            <div className={ styles['bottom'] }>
                <div className={ styles['info'] }>
                    <h3>Showing 9 out of 20 results</h3>
                    <h3>Sort by: Price (Low to High)</h3>
                </div>
                <div className={ styles['pagination'] }>
                    <Button
                        type="icon"
                        action={ () => console.log('prev') }
                        icon="fa-solid fa-angle-left"
                        isOutlined={ true }
                    />
                    <Button
                        type="secondary"
                        label="1"
                        action={ () => console.log('prev') }
                        isOutlined={ true }
                    />
                    <Button
                        type="icon"
                        action={ () => console.log('next') }
                        icon="fa-solid fa-angle-right"
                        isOutlined={ true }
                    />
                </div>
            </div>
        </div>
    );

};

export default TableHeader;
