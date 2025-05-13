import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component
import CreateCampaignForm from './CreateCampaignForm'; // Default import

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={openModal}>Create Campaign</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateCampaignForm />
            </Modal>
        </div>
    );
};

export default Dashboard;
