'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCampaignById, updateCampaign } from '../api';
import './CreateCampaignForm.css';

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

const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
};

const EditCampaignForm = ({ campaignId, onClose }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        flightStart: '',
        flightEnd: '',
        description: '',
        kolType: '',
        businessCategory: '',
        productService: '',
        budget: ''
    });

    useEffect(() => {
        async function fetchCampaign() {
            setLoading(true);
            try {
                const res = await getCampaignById(campaignId);
                const data = await res.json();
                console.log('Fetched campaign:', data);
                console.log('flightStart:', data.flightStart, 'flightEnd:', data.flightEnd);
                setFormData({
                    name: data.name,
                    flightStart: formatDateForInput(data.flightStart),
                    flightEnd: formatDateForInput(data.flightEnd),
                    description: data.description,
                    kolType: data.kolType,
                    businessCategory: data.businessCategory,
                    productService: data.productService,
                    budget: data.budget
                });
            } catch (e) {
                console.error('Error fetching campaign:', e);
                setError('Failed to load campaign');
            } finally {
                setLoading(false);
            }
        }
        fetchCampaign();
    }, [campaignId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStep1Submit = () => {
        if (!formData.name || !formData.flightStart || !formData.flightEnd || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }
        setCurrentStep(2);
    };

    const handleStep2Submit = async () => {
        setSaving(true);
        setError(null);
        try {
            const campaignData = {
                name: formData.name,
                flightStart: new Date(formData.flightStart).toISOString(),
                flightEnd: new Date(formData.flightEnd).toISOString(),
                description: formData.description,
                kolType: formData.kolType,
                businessCategory: formData.businessCategory,
                productService: formData.productService,
                budget: Number(formData.budget)
            };
            await updateCampaign(campaignId, campaignData);
            
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
            router.push(`/campaigns/${campaignId}`);
        } catch (error) {
            console.error('Error updating campaign:', error);
            setError(error.message || 'Failed to update campaign');
        } finally {
            setSaving(false);
        }
    };

    const handleStepSubmit = async () => {
        switch (currentStep) {
            case 1:
                handleStep1Submit();
                break;
            case 2:
                await handleStep2Submit();
                break;
            default:
                break;
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                        {step}
                    </div>
                    {step < 2 && (
                        <div className={`w-16 h-1 ${
                            currentStep > step ? 'bg-pink-500' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Campaign Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                        value={formData.flightStart}
                        onChange={handleInputChange}
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
                        value={formData.flightEnd}
                        onChange={handleInputChange}
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
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="Describe your campaign..."
                />
                <p className="text-xs text-gray-400 mt-1">{helper.description}</p>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <label htmlFor="kolType" className="block text-sm font-semibold text-gray-700 mb-1">
                    Type of KOLs
                </label>
                <textarea
                    type="text"
                    id="kolType"
                    name="kolType"
                    value={formData.kolType}
                    onChange={handleInputChange}
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
                    value={formData.businessCategory}
                    onChange={handleInputChange}
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
                    value={formData.productService}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                >
                    <option value="">Select one</option>
                    <option value="Token">Token Launch</option>
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
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
                    placeholder="e.g. 5000"
                />
                <p className="text-xs text-gray-400 mt-1">{helper.budget}</p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleStepSubmit();
            }}
            className="p-8 space-y-6 w-full"
            style={{ minWidth: 350 }}
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Edit Campaign</h2>
            <p className="text-gray-500 text-center mb-6">Update your campaign details below.</p>

            {renderStepIndicator()}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}

            <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Previous
                    </button>
                )}
                <button
                    type="submit"
                    disabled={saving}
                    className={`ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center ${
                        currentStep === 2 ? 'w-full' : ''
                    }`}
                >
                    {saving && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    )}
                    {saving ? 'Saving...' : currentStep === 2 ? 'Save Changes' : 'Next'}
                </button>
            </div>
        </form>
    );
};

export default EditCampaignForm; 