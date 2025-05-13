'use client';

import React, { useState } from 'react';
import './CreateCampaignForm.css'; // Import your CSS for styling

const CreateCampaignForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        flightStart: '',
        flightEnd: '',
        description: '',
        kolType: '',
        businessCategory: '',
        productService: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
        // You can send formData to your API or perform other actions
    };

    return (
        <div className="modal-container">
            <h2 className="modal-title">Create Campaign</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                    <label htmlFor="name">Campaign Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="flightStart">Flight Start:</label>
                    <input
                        type="date"
                        id="flightStart"
                        name="flightStart"
                        value={formData.flightStart}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="flightEnd">Flight End:</label>
                    <input
                        type="date"
                        id="flightEnd"
                        name="flightEnd"
                        value={formData.flightEnd}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="kolType">Type of KOLs:</label>
                    <input
                        type="text"
                        id="kolType"
                        name="kolType"
                        value={formData.kolType}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="businessCategory">Business Category:</label>
                    <input
                        type="text"
                        id="businessCategory"
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="productService">Product or Service:</label>
                    <input
                        type="text"
                        id="productService"
                        name="productService"
                        value={formData.productService}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="modal-button">Create Campaign</button>
            </form>
        </div>
    );
};

export default CreateCampaignForm;
