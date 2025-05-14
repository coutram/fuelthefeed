'use client';

import React, { useState } from 'react';
import './CreateCampaignForm.css'; // Import your CSS for styling
import { useRouter } from 'next/navigation';
import { createCampaign } from '../api';

const helper = {
    name: "Give your campaign a memorable name.",
    flightStart: "When should the campaign begin?",
    flightEnd: "When should the campaign end?",
    description: "Describe your campaign's goals and vision.",
    kolType: "What type of creators are you looking for?",
    businessCategory: "What industry or category does this campaign belong to?",
    productService: "What product or service is being promoted?",
    budget: "Total budget for this campaign.",
};

const businessCategories = [
    { value: '', label: 'Select a business category' },
    { value: 'apparel', label: 'Apparel & Fashion' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'electronics', label: 'Electronics & Gadgets' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'travel', label: 'Travel & Hospitality' },
    { value: 'finance', label: 'Finance & Insurance' },
    { value: 'education', label: 'Education' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'home', label: 'Home & Living' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'entertainment', label: 'Entertainment & Media' },
    { value: 'technology', label: 'Technology & Software' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'nonprofit', label: 'Nonprofit & Social Impact' },
    { value: 'other', label: 'Other' },
];

const CreateCampaignForm = ({ onClose }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.target);
            const campaignData = {
                name: formData.get('name'),
                flightStart: formData.get('flightStart'),
                flightEnd: formData.get('flightEnd'),
                description: formData.get('description'),
                kolType: formData.get('kolType'),
                businessCategory: formData.get('businessCategory'),
                productService: formData.get('productService'),
                budget: parseFloat(formData.get('budget'))
            };

            const data = await createCampaign(campaignData);
            
            if (onClose && typeof onClose === 'function') {
                onClose(); // Close the modal
            }
            router.push(`/campaigns/${data._id}`); // Redirect to campaign details
        } catch (error) {
            console.error('Error creating campaign:', error);
            setError(error.message || 'Failed to create campaign');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6 w-full"
            style={{ minWidth: 350 }}
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create a New Campaign</h2>
            <p className="text-gray-500 text-center mb-6">Fill out the details below to launch your campaign.</p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Campaign Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="e.g. Summer Fashion Launch"
                />
                <p className="text-xs text-gray-400 mt-1">{helper.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="flightStart" className="block text-sm font-semibold text-gray-700 mb-1">
                        Flight Start
                    </label>
                    <input
                        type="date"
                        id="flightStart"
                        name="flightStart"
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    />
                    <p className="text-xs text-gray-400 mt-1">{helper.flightStart}</p>
                </div>
                <div>
                    <label htmlFor="flightEnd" className="block text-sm font-semibold text-gray-700 mb-1">
                        Flight End
                    </label>
                    <input
                        type="date"
                        id="flightEnd"
                        name="flightEnd"
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    />
                    <p className="text-xs text-gray-400 mt-1">{helper.flightEnd}</p>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="Describe your campaign..."
                />
                <p className="text-xs text-gray-400 mt-1">{helper.description}</p>
            </div>

            <div>
                <label htmlFor="kolType" className="block text-sm font-semibold text-gray-700 mb-1">
                    Type of KOLs
                </label>
                <textarea
                    type="text"
                    id="kolType"
                    name="kolType"
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="Description of the type of creators you are looking to attract to post..."
                />
                <p className="text-xs text-gray-400 mt-1">What type of creators are you looking for?</p>
            </div>

            <div>
                <label htmlFor="businessCategory" className="block text-sm font-semibold text-gray-700 mb-1">
                    Business Category
                </label>
                <select
                    id="businessCategory"
                    name="businessCategory"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                >
                    {businessCategories.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">What industry or category does this campaign belong to?</p>
            </div>

            <div>
                <label htmlFor="productService" className="block text-sm font-semibold text-gray-700 mb-1">
                    Product or Service
                </label>
                <select
                    id="productService"
                    name="productService"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                >
                    <option value="">Select one</option>
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Is this campaign for a product or a service?</p>
            </div>

            <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1">
                    Budget
                </label>
                <input
                    type="number"
                    id="budget"
                    name="budget"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="e.g. 5000"
                />
                <p className="text-xs text-gray-400 mt-1">{helper.budget}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center"
                >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    )}
                    {loading ? 'Creating...' : 'Create Campaign'}
                </button>
            </div>
        </form>
    );
};

export default CreateCampaignForm;
