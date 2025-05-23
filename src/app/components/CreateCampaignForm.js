'use client';

import React, { useState } from 'react';
import './CreateCampaignForm.css'; // Import your CSS for styling
import { useRouter } from 'next/navigation';
import { createCampaign, updateCampaign } from '../api';
import Image from 'next/image';

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
    const [currentStep, setCurrentStep] = useState(1);
    const [campaignId, setCampaignId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        flightStart: '',
        flightEnd: '',
        description: '',
        kolType: '',
        businessCategory: '',
        productService: '',
        budget: '',
        icon: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                icon: file
            }));
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleStep1Submit = () => {
        // Just validate and move to next step
        if (!formData.name || !formData.flightStart || !formData.flightEnd || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }
        setCurrentStep(2);
    };

    const handleStep2Submit = async () => {
        setLoading(true);
        setError(null);
        try {
            // Create campaign with all required fields
            const campaignData = {
                name: formData.name,
                flightStart: formData.flightStart,
                flightEnd: formData.flightEnd,
                description: formData.description,
                kolType: formData.kolType,
                businessCategory: formData.businessCategory,
                productService: formData.productService,
                budget: formData.budget
            };
            const data = await createCampaign(campaignData);
            setCampaignId(data._id);
            setCurrentStep(3);
        } catch (error) {
            console.error('Error creating campaign:', error);
            setError(error.message || 'Failed to create campaign');
        } finally {
            setLoading(false);
        }
    };

    const handleStep3Submit = async () => {
        setLoading(true);
        setError(null);
        try {
            if (formData.icon) {
                const uploadData = new FormData();
                uploadData.append('icon', formData.icon);
                await updateCampaign(campaignId, uploadData);
            }
            
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
            router.push(`/campaigns/${campaignId}`);
        } catch (error) {
            console.error('Error updating campaign:', error);
            setError(error.message || 'Failed to update campaign');
        } finally {
            setLoading(false);
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
            case 3:
                await handleStep3Submit();
                break;
            default:
                break;
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                        {step}
                    </div>
                    {step < 3 && (
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

    const renderStep3 = () => (
        <div className="space-y-6">
            <div>
                <label htmlFor="icon" className="block text-sm font-semibold text-gray-700 mb-1">
                    Campaign Icon
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                        {previewUrl ? (
                            <div className="mb-4">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                                    width={128}
                                    height={128}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewUrl(null);
                                        setFormData(prev => ({ ...prev, icon: null }));
                                    }}
                                    className="mt-2 text-sm text-red-600 hover:text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="icon"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    id="icon"
                                    name="icon"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleStepSubmit();
            }}
            className="p-8 space-y-6 w-full"
            style={{ minWidth: 350 }}
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create a New Campaign</h2>
            <p className="text-gray-500 text-center mb-6">Fill out the details below to launch your campaign.</p>

            {renderStepIndicator()}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Previous
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center ${
                        currentStep === 3 ? 'w-full' : ''
                    }`}
                >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    )}
                    {loading ? 'Saving...' : currentStep === 3 ? 'Complete Campaign' : 'Next'}
                </button>
            </div>
        </form>
    );
};

export default CreateCampaignForm;
