'use client';

import React, { useState } from 'react';
import './CreateCampaignForm.css'; // Import your CSS for styling
import { createCampaign } from '../api'; // Import the API function

const CreateCampaignForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        flightStart: '',
        flightEnd: '',
        description: '',
        kolType: '',
        businessCategory: '',
        productService: '',
        budget: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCampaign(formData); // Call the API function
            console.log('Campaign created successfully:', response);
            // Optionally, you can reset the form or close the modal here
        } catch (error) {
            console.error('Error creating campaign:', error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
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
                <small className="helper-text">This is the name of your campaign.</small>
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
                <small className="helper-text">Select the start date for the campaign.</small>
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
                <small className="helper-text">Select the end date for the campaign.</small>
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
                <small className="helper-text">Provide a brief description of the campaign.</small>
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
                <small className="helper-text">Specify the type of Key Opinion Leaders.</small>
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
                <small className="helper-text">What category does your business fall under?</small>
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
                <small className="helper-text">What product or service are you promoting?</small>
            </div>

            <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter budget amount"
                />
                <small className="helper-text">Specify the budget for the campaign.</small>
            </div>

            <button type="submit" className="modal-button">Create Campaign</button>
        </form>
    );
};

export default CreateCampaignForm;
