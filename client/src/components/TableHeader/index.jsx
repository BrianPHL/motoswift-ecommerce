import { Button, InputField } from '@components';
import styles from './TableHeader.module.css';

const TableHeader = ({ tableName, currentPage, totalPages, resultsLabel, sortLabel, onPageChange, onSortChange, onSearchChange, onSearchSubmit }) => {

    if (tableName !== 'motorcycles' && tableName !== 'parts-and-accessories') return null;
    if (currentPage === undefined || totalPages === undefined || !onPageChange) return null;

    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

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
                            action: () => { onSortChange('Sort by: Price (Low to High)') },
                        },
                        {
                            label: 'Sort by: Price (High to Low)',
                            action: () => { onSortChange('Sort by: Price (High to Low)') },
                        },
                        {
                            label: 'Name: A-Z',
                            action: () => { onSortChange('Name: A-Z') },
                        },
                        {
                            label: 'Name: Z-A',
                            action: () => { onSortChange('Name: Z-A') },
                        },
                    ]}
                />
                <InputField
                    hint='Search for motorcycles...'
                    type='text'
                    onChange={ onSearchChange }
                    action={ onSearchSubmit }
                    isSubmittable={ true }    
                />
            </div>
            <div className={ styles['divider'] }></div>
            <div className={ styles['bottom'] }>
                <div className={ styles['info'] }>
                    <h3>{ resultsLabel }</h3>
                    <h3>{ sortLabel }</h3>
                </div>
                <div className={ styles['pagination'] }>
                    <Button
                        type="icon-outlined"
                        action={ () => onPageChange(currentPage - 1) }
                        icon="fa-solid fa-angle-left"

                        disabled={ currentPage === 1 }
                    />
                    { pageNumbers.map(page => (
                        <Button
                            key={ page }
                            type='secondary'
                            label={ String(page) }
                            action={ () => onPageChange(page) }
                            isActive={ currentPage === page }
                        />
                    ))}
                    <Button
                        type="icon-outlined"
                        action={ () => onPageChange(currentPage + 1) }
                        icon="fa-solid fa-angle-right"

                        disabled={ currentPage === totalPages }
                    />
                </div>
            </div>
        </div>
    );
};

export default TableHeader;
