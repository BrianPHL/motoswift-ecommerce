import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import styles from './Installments.module.css';
import { Button, Modal, TableHeader, TableFooter } from '@components';
import { useInstallments, useToast } from '@contexts';

const Installments = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = parseInt(searchParams.get('page') || '1', 10);
    const querySort = searchParams.get('sort') || 'Sort by: Latest';
    const querySearch = searchParams.get('search') || '';
    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(queryPage);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredInstallments, setFilteredInstallments] = useState([]);
    const [paginatedInstallments, setPaginatedInstallments] = useState([]);
    const [searchInput, setSearchInput] = useState(querySearch);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInstallment, setSelectedInstallment] = useState(null);
    
    const { pendingInstallments, fetchPendingInstallments, processInstallment, isLoading } = useInstallments();
    const { showToast } = useToast();

    useEffect(() => {
        fetchPendingInstallments();
    }, []);

    useEffect(() => {
        if (!pendingInstallments) return;
        
        let result = [...pendingInstallments];
        
        if (querySearch) {
            const searchLower = querySearch.toLowerCase();
            result = result.filter(installment => 
                installment.first_name?.toLowerCase().includes(searchLower) ||
                installment.last_name?.toLowerCase().includes(searchLower) ||
                installment.email?.toLowerCase().includes(searchLower) ||
                installment.installment_id?.toString().includes(searchLower) ||
                installment.reservation_id?.toString().includes(searchLower)
            );
        }

        switch(querySort) {
            case 'Sort by: Latest':
                result.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
                break;
            case 'Sort by: Oldest':
                result.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
                break;
            case 'Sort by: Amount (High to Low)':
                result.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                break;
            case 'Sort by: Amount (Low to High)':
                result.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                break;
            default:
                break;
        }
        
        setFilteredInstallments(result);
        setTotalPages(Math.max(1, Math.ceil(result.length / ITEMS_PER_PAGE)));
        
    }, [pendingInstallments, querySearch, querySort]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPaginatedInstallments(filteredInstallments.slice(startIndex, endIndex));
    }, [filteredInstallments, currentPage]);

    const updateSearchParams = ({ page, sort, search }) => {
        const params = new URLSearchParams(searchParams);

        if (page !== undefined) params.set('page', page);
        if (sort !== undefined) params.set('sort', sort);
        if (search !== undefined) params.set('search', search);

        setSearchParams(params);
    };

    // Handler functions
    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateSearchParams({ page });
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        updateSearchParams({ search: searchInput, page: 1 });
    };

    const handleSortChange = (sort) => {
        setCurrentPage(1);
        updateSearchParams({ sort, page: 1 });
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setCurrentPage(1);
        updateSearchParams({ search: '', page: 1 });
    };

    const handleOpenProcessModal = (installment) => {
        setSelectedInstallment(installment);
        setIsModalOpen(true);
    };

    const handleProcessInstallment = async () => {
        if (!selectedInstallment) return;
        
        const success = await processInstallment(selectedInstallment.installment_id);
        if (success) {
            setIsModalOpen(false);
            setSelectedInstallment(null);
        }
    };
    
    return (
        <div className={styles['wrapper']}>
            <div className={styles['section']}>
                <h2>Overview</h2>
                <div className={styles['overview']}>
                    <div className={styles['overview-item']}>
                        <div className={styles['overview-item-header']}>
                            <h3>Pending Installments</h3>
                        </div>
                        <h2>{pendingInstallments?.length || 0}</h2>
                    </div>
                    <div className={styles['overview-item']}>
                        <div className={styles['overview-item-header']}>
                            <h3>Due Today</h3>
                        </div>
                        <h2>{pendingInstallments?.filter(i => {
                            const today = new Date().toDateString();
                            const dueDate = new Date(i.payment_date).toDateString();
                            return today === dueDate;
                        }).length || 0}</h2>
                    </div>
                    <div className={styles['overview-item']}>
                        <div className={styles['overview-item-header']}>
                            <h3>Overdue Payments</h3>
                        </div>
                        <h2>{pendingInstallments?.filter(i => {
                            return new Date(i.payment_date) < new Date();
                        }).length || 0}</h2>
                    </div>
                </div>
            </div>
            <div className={styles['section']}>
                <div className={styles['section-header']}>
                    <h2>Pending Installments</h2>
                </div>
                
                <TableHeader
                    tableName="reservations"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    resultsLabel={`Showing ${paginatedInstallments.length} out of ${filteredInstallments.length} installments`}
                    sortLabel={querySort}
                    searchValue={searchInput}
                    onPageChange={handlePageChange}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearch}
                />
                
                <div className={styles['table']}>
                    <div className={styles['table-wrapper']}>
                        <div className={styles['table-header']} style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                            <h3>installment_id</h3>
                            <h3>customer_name</h3>
                            <h3>email</h3>
                            <h3>amount</h3>
                            <h3>payment_date</h3>
                            <h3>reservation_id</h3>
                            <h3>actions</h3>
                        </div>
                        
                        {isLoading ? (
                            <div className={styles['empty-table']}>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                            </div>
                        ) : paginatedInstallments.length > 0 ? (
                            paginatedInstallments.map(installment => (
                                <div 
                                    key={installment.installment_id} 
                                    className={styles['table-rows']} 
                                    style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
                                >
                                    <div className={styles['table-cell']}>{installment.installment_id}</div>
                                    <div className={styles['table-cell']}>
                                        {installment.first_name} {installment.last_name}
                                    </div>
                                    <div className={styles['table-cell']}>{installment.email}</div>
                                    <div className={styles['table-cell']}>
                                        ₱{parseFloat(installment.amount).toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {new Date(installment.payment_date).toLocaleDateString()}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        {installment.reservation_id}
                                    </div>
                                    <div className={styles['table-cell']}>
                                        <Button
                                            type="icon"
                                            icon="fa-solid fa-check"
                                            action={() => handleOpenProcessModal(installment)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles['empty-table']}>
                                {querySearch ? (
                                    <div className={styles['empty']}>
                                        <h3>No installments found matching "{querySearch}"</h3>
                                        <Button 
                                            type="secondary" 
                                            label="Clear Search" 
                                            action={handleClearSearch}
                                        />
                                    </div>
                                ) : (
                                    <p>No pending installments found</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                <TableFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    resultsLabel={`Showing ${paginatedInstallments.length} out of ${filteredInstallments.length} installments`}
                    sortLabel={querySort}
                    onPageChange={handlePageChange}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                label="Process Installment"
            >
                {selectedInstallment && (
                    <>
                        <div className={styles['modal-infos']}>
                            <h3>Installment #{selectedInstallment.installment_id}</h3>
                            <span>
                                <p><strong>Customer:</strong> {selectedInstallment.first_name} {selectedInstallment.last_name}</p>
                                <p><strong>Email:</strong> {selectedInstallment.email}</p>
                                <p><strong>Amount:</strong> ₱{parseFloat(selectedInstallment.amount).toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</p>
                                <p><strong>Payment Date:</strong> {new Date(selectedInstallment.payment_date).toLocaleDateString()}</p>
                                <p><strong>Reservation ID:</strong> {selectedInstallment.reservation_id}</p>
                            </span>
                        </div>
                        
                        <p className={styles['modal-info']}>
                            Are you sure you want to mark this installment as processed? This action cannot be undone.
                        </p>
                        
                        <div className={styles['modal-ctas']}>
                            <Button
                                type="secondary"
                                label="Cancel"
                                action={() => setIsModalOpen(false)}
                            />
                            <Button
                                type="primary"
                                label="Confirm"
                                action={handleProcessInstallment}
                            />
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Installments;
