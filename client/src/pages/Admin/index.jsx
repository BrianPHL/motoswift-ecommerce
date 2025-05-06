import { ReturnButton, Button, InputField, Modal } from '@components';
import { useProducts, useToast } from "@contexts";
import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const Admin = ({}) => {

    const { products, addProduct, deleteProduct, updateProduct, refreshProducts } = useProducts();
    const [ searchInput, setSearchInput ] = useState('');
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalType, setModalType ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ productData, setProductData ] = useState({ label: '', price: 0, category: '', subcategory: '', description: '', image_url: '' });
    const handleSearchChange = (e) => setSearchInput(e.target.value);
    const handleSearchSubmit = () => setSearchQuery(searchInput);
    const handleProductDataChange = (field, value) => {
        setProductData(previous => ({
            ...previous,
            [ field ]: value
        }));
    };
    const resetProductData = () => {
        setProductData({ label: '', price: 0, category: '', subcategory: '', description: '', image_url: '' });
    }
    const filteredProducts = searchQuery
        ? products.filter(product => 
            product.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.product_id.toString().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : products;

    useEffect(() => {
        if (modalType === 'edit-product' && selectedItem) {
            setProductData({
                product_id: selectedItem['product_id'],
                label: selectedItem['label'],
                price: selectedItem['price'],
                category: selectedItem['category'],
                subcategory: selectedItem['subcategory'],
                description: selectedItem['description'],
                image_url: selectedItem['image_url'],
            });
        };
    }, [ modalType, selectedItem ]);

    return (
        <>
            <div className={ styles['wrapper'] }>

                <div className={ styles['header'] }>
                    <ReturnButton />
                    <h1>Inventory</h1>
                </div>

                <div className={ styles['floater'] }>
                    <InputField
                        hint='Search here...'
                        type='text'
                        icon='fa-solid fa-magnifying-glass'
                        isSubmittable={ false }
                        value={searchInput}
                        onChange={handleSearchChange}
                        action={handleSearchSubmit}
                        externalStyles={ styles['table-search'] }
                    />
                    <div className={ styles['controls'] }>
                        <Button
                            type='secondary'
                            icon='fa-solid fa-rotate-right'
                            iconPosition='left'
                            label='Refresh'
                            action={ refreshProducts }
                        />
                        <Button
                            type='primary'
                            icon='fa-solid fa-plus'
                            iconPosition='left'
                            label='Add a product'
                            action={ () => {
                                resetProductData();
                                setModalType('add-product');
                                setModalOpen(true);
                            }}
                        />
                    </div>
                </div>

                { filteredProducts.length === 0 ? (
                    <div className={styles.empty}>
                        <h3>No products found matching "{searchQuery}"</h3>
                        <Button 
                            type="secondary" 
                            label="Clear Search" 
                            action={() => {
                                setSearchInput('');
                                setSearchQuery('');
                            }}
                        />
                    </div>
                ) : (
                    <div className={ styles['table'] }>
                        <div className={ styles['table-wrapper'] }>
                            <div className={ styles['table-header'] }>
                                <h3></h3>
                                <h3>product_id</h3>
                                <h3>label</h3>
                                <h3>price</h3>
                                <h3>category</h3>
                                <h3>subcategory</h3>
                                <h3>description</h3>
                                <h3>image_url</h3>
                                <h3>created_at</h3>
                                <h3>modified_at</h3>
                                <h3>actions</h3>
                            </div>
                            { filteredProducts.map(product => (
                                <div className={styles['table-rows']} key={product['product_id']}>

                                    <div className={styles['table-cell']}>
                                        <img
                                            src={`https://res.cloudinary.com/dfvy7i4uc/image/upload/${product.image_url}`}
                                            alt={`${product.label} ${product.price}`}
                                        />
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.product_id}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.label}
                                    </div>
                                    {/* remaining cells */}
                                    <div className={styles['table-cell']}>
                                        ₱{parseFloat(product.price).toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.category}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.subcategory || '-'}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.description || '-'}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.image_url || '-'}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {product.modified_at ? new Date(product.modified_at).toLocaleDateString() : '-'}
                                    </div>
                                    <div className={styles['table-cell']} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <Button
                                            type='icon-outlined'
                                            icon='fa-solid fa-trash'
                                            action={ () => {
                                                setSelectedItem(product);
                                                setModalType('delete-product');
                                                setModalOpen(true);
                                            }}
                                        />
                                        <Button
                                            type='icon-outlined'
                                            icon='fa-solid fa-pen-to-square'
                                            action={ () => {
                                                setSelectedItem(product);
                                                setModalType('edit-product-confirmation');
                                                setModalOpen(true);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>
            { modalType === 'add-product' ? (
                <Modal label='Add a Product' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Please fill out all fields.</p>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_label">
                            Label
                        </label>
                        <InputField
                            hint='The product label...'
                            type='text'
                            value={ productData['label'] }
                            onChange={ event => handleProductDataChange('label', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_price">
                            Price
                        </label>
                        <InputField
                            hint='The product price...'
                            type='text'
                            value={ productData['price'] }
                            onChange={ event => handleProductDataChange('price', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_category">
                            Category
                        </label>
                        <InputField
                            hint='The product category...'
                            type='text'
                            value={ productData['category'] }
                            onChange={ event => handleProductDataChange('category', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_subcategory">
                            Subcategory
                        </label>
                        <InputField
                            hint='The product subcategory...'
                            type='text'
                            value={ productData['subcategory'] }
                            onChange={ event => handleProductDataChange('subcategory', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="description">
                            Description (Optional)
                        </label>
                        <textarea
                            placeholder='The product description...'
                            name="description"
                            id='description'
                            value={ productData['description'] }
                            onChange={ event => handleProductDataChange('description', event['target']['value']) }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="image_url">
                            Image URL
                        </label>
                        <InputField
                            hint='The product image URL...'
                            type='text'
                            value={ productData['image_url'] }
                            onChange={ event => handleProductDataChange('image_url', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                                resetProductData();
                            }}
                        />
                        <Button
                            label='Add Product'
                            type='primary'
                            action={ () => {
                                addProduct(productData);
                                setModalOpen(false);
                            }}
                        />
                    </div>
                </Modal>
            ) : modalType === 'delete-product' ? (
                <Modal label='Product Deletion Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Are you sure you want to delete <strong>{ selectedItem['label'] }?</strong> This action is irreversible!</p>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                                resetProductData();
                            }}
                        />
                        <Button
                            label='Confirm'
                            type='primary'
                            action={ () => {
                                deleteProduct(selectedItem['product_id']);
                                setModalOpen(false);
                            }}
                            externalStyles={ styles['modal-warn'] }
                        />
                    </div>
                </Modal>
            ) : modalType === 'edit-product-confirmation' ? (
                <Modal label='Edit Product Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Are you sure you want to modify <strong>{ selectedItem['label'] }?</strong> This action is irreversible!</p>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                                resetProductData();
                            }}
                        />
                        <Button
                            label='Confirm'
                            type='primary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                                setModalType('edit-product');
                                setModalOpen(true);
                            }}
                            externalStyles={ styles['modal-warn'] }
                        />
                    </div>
                </Modal>
            ) : modalType === 'edit-product' ? (
                <Modal label='Edit Product' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_label">
                            Label
                        </label>
                        <InputField
                            hint='The product label...'
                            type='text'
                            value={ productData['label'] || '' }
                            onChange={ event => handleProductDataChange('label', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_price">
                            Price
                        </label>
                        <InputField
                            hint='The product price...'
                            type='text'
                            value={ productData['price'] || '' }
                            onChange={ event => handleProductDataChange('price', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_category">
                            Category
                        </label>
                        <InputField
                            hint='The product category...'
                            type='text'
                            value={ productData['category'] || '' }
                            onChange={ event => handleProductDataChange('category', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="product_subcategory">
                            Subcategory
                        </label>
                        <InputField
                            hint='The product subcategory...'
                            type='text'
                            value={ productData['subcategory'] || '' }
                            onChange={ event => handleProductDataChange('subcategory', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="description">
                            Description (Optional)
                        </label>
                        <textarea
                            placeholder='The product description...'
                            name="description"
                            id='description'
                            value={ productData['description'] || '' }
                            onChange={ event => handleProductDataChange('description', event['target']['value']) }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="image_url">
                            Image URL
                        </label>
                        <InputField
                            hint='The product image URL...'
                            type='text'
                            value={ productData['image_url'] || '' }
                            onChange={ event => handleProductDataChange('image_url', event['target']['value']) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                                resetProductData();
                            }}
                        />
                        <Button
                            label='Confirm Edit'
                            type='primary'
                            action={ () => {
                                updateProduct(productData);
                                setModalType('');
                                setModalOpen(false);
                                resetProductData();
                            }}
                        />
                    </div>
                </Modal>
            ): null }
        </>
    );
};

export default Admin;