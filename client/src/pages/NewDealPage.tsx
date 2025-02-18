import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeenIcon, Toast } from '@/components';

const NewDealPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    currency: 'USD',
    expectedCloseDate: '',
    stage: 'Discovery',
    owner: '',
    company: {
      name: '',
      website: '',
      industry: '',
      size: '',
    },
  });

  // Helper function to format currency
  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters except decimal point
    const numberValue = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = numberValue.split('.');
    if (parts.length > 2) return formData.value;
    
    // Format with commas and limit decimal places
    try {
      const number = Number(numberValue);
      if (isNaN(number)) return '';
      
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: parts.length > 1 ? parts[1].length : 0,
        maximumFractionDigits: 2,
      }).format(number);
    } catch {
      return numberValue;
    }
  };

  // Helper function to unformat currency for storage
  const unformatCurrency = (value: string): string => {
    return value.replace(/[^\d.]/g, '');
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'value') {
      // Store unformatted value but display formatted
      setFormData(prev => ({
        ...prev,
        value: unformatCurrency(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: section === 'company'
          ? { ...prev[section], [field]: value }
          : value
      }));
    }
  };

  const handleCreateDeal = async () => {
    try {
      // TODO: Add your API call here
      
      // Show success screen immediately
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating deal:', error);
      // Handle error case
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6">Basic Deal Information</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Deal Name</label>
                <input
                  type="text"
                  className="form-control w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', '', e.target.value)}
                  placeholder="Enter deal name"
                />
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Deal Value</label>
                <div className="flex gap-2">
                  <select 
                    className="form-select w-28 bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', '', e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    type="text"
                    className="form-control flex-1 bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                    value={formatCurrency(formData.value)}
                    onChange={(e) => handleInputChange('value', '', e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Deal Owner</label>
                <select 
                  className="form-select w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.owner}
                  onChange={(e) => handleInputChange('owner', '', e.target.value)}
                >
                  <option value="">Select owner</option>
                  <option value="current_user">Me</option>
                </select>
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Expected Close Date</label>
                <input
                  type="date"
                  className="form-control w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.expectedCloseDate}
                  onChange={(e) => handleInputChange('expectedCloseDate', '', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Stage</label>
                <select 
                  className="form-select w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.stage}
                  onChange={(e) => handleInputChange('stage', '', e.target.value)}
                >
                  <option value="Discovery">Discovery</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closing">Closing</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6">Company Information</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Company Name</label>
                <input
                  type="text"
                  className="form-control w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.company.name}
                  onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Website</label>
                <input
                  type="url"
                  className="form-control w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.company.website}
                  onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                  placeholder="Enter company website"
                />
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Industry</label>
                <input
                  type="text"
                  className="form-control w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.company.industry}
                  onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                  placeholder="Enter industry"
                />
              </div>
              <div>
                <label className="text-[15px] text-gray-600 font-medium block mb-2">Company Size</label>
                <select 
                  className="form-select w-full bg-white border border-gray-200 rounded-[8px] py-[10px] px-4 text-[15px]"
                  value={formData.company.size}
                  onChange={(e) => handleInputChange('company', 'size', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* Keep the header consistent but without text */}
        <div className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto py-6 px-8">
            <div className="flex items-center gap-4">
              {/* Header text removed for success screen */}
            </div>
          </div>
        </div>

        {/* Success content */}
        <div className="max-w-3xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="size-48 mx-auto mb-8 text-success">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <circle cx="12" cy="12" r="11" className="fill-success/10" />
                <path 
                  d="M8 13l2.5 2.5L16 9" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Option 3: Different icon (uncomment to use)
            <div className="size-48 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <KeenIcon icon="verify" className="size-32 text-success" />
            </div>
            */}

            <h2 className="text-3xl font-bold mb-4">Deal Created Successfully!</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
              Your new deal has been created and saved to the system. You can now view and manage it from the deals dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-primary px-8 py-3 rounded-lg text-[15px]"
                onClick={() => navigate('/deals', { 
                  state: { 
                    showToast: true,
                    toastMessage: 'Deal created successfully!' 
                  }
                })}
              >
                View All Deals
              </button>
              <button
                className="btn btn-light px-8 py-3 rounded-lg text-[15px]"
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    value: '',
                    currency: 'USD',
                    expectedCloseDate: '',
                    stage: 'Discovery',
                    owner: '',
                    company: {
                      name: '',
                      website: '',
                      industry: '',
                      size: '',
                    }
                  });
                }}
              >
                Create Another Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto py-6 px-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/deals')}
            >
              <KeenIcon icon="arrow-left" className="size-4" />
            </button>
            <h1 className="text-2xl font-bold">Create New Deal</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            {[1, 2].map((step) => (
              <div
                key={step}
                className="flex items-center"
              >
                <div className={`
                  size-8 rounded-full flex items-center justify-center font-medium
                  ${currentStep === step 
                    ? 'bg-primary text-white' 
                    : currentStep > step 
                      ? 'bg-success text-white'
                      : 'bg-gray-100 text-gray-500'
                  }
                `}>
                  {currentStep > step ? (
                    <KeenIcon icon="check" className="size-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 2 && (
                  <div className={`w-24 h-1 mx-2 ${
                    currentStep > step ? 'bg-success' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-8 px-8">
        {renderStepContent()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-8 py-4 flex justify-end gap-3">
          {currentStep > 1 && (
            <button
              className="btn btn-light px-6 py-2.5 rounded-lg"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < 2 ? (
            <button
              className="btn btn-primary px-6 py-2.5 rounded-lg"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary px-6 py-2.5 rounded-lg"
              onClick={handleCreateDeal}
            >
              Create Deal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { NewDealPage };