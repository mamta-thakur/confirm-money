import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Search, 
  DollarSign, 
  Percent, 
  Calendar, 
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  X,
  ExternalLink,
  TrendingUp,
  CreditCard,
  Building,
  Star,
  FileText,
  Upload,
  Camera
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { tr } from 'framer-motion/client';

interface Document {
  title: string;
  examples: string[];
}

interface Offer {
  id?: number;
  logo: string | null;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  tenure: string;
  link: string;
  description?: string | null;
  recommended?: string | null;
  create_date?: string;
  documents?: Document[];
}

interface FormData {
  logo: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  tenure: string;
  link: string;
  description: string;
  recommended: boolean;
  documents: Document[] | null;
}

const OffersManagement: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    logo: '',
    loanAmount: '',
    interestRate: '',
    processingFee: '',
    tenure: '',
    link: '',
    description: '',
    recommended: false,
    documents: null
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/offer-list');
      console.log('API Response:', response.data);
      
      if (response.data.success && response.data.offers) {
        setOffers(response.data.offers);
      } else {
        setOffers([]);
        toast.error('No offers found');
      }
    } catch (error) {
      toast.error('Failed to fetch offers');
      console.error('Fetch error:', error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter(offer => 
        offer.loanAmount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.interestRate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.tenure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (offer.description && offer.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredOffers(filtered);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOffer = async () => {
    try {
      if (!formData.loanAmount || !formData.interestRate || 
          !formData.processingFee || !formData.tenure || !formData.link) {
        toast.error('Please fill in all required fields');
        return;
      }

      setSubmitting(true);

      // Create FormData for multipart/form-data
      const apiFormData = new FormData();
      
      // Add logo file if selected, otherwise add logo URL
      if (logoFile) {
        apiFormData.append('logo', logoFile);
      } else if (formData.logo) {
        apiFormData.append('logo', formData.logo);
      }

      // Add other form fields
      apiFormData.append('loanAmount', formData.loanAmount);
      apiFormData.append('interestRate', formData.interestRate);
      apiFormData.append('processingFee', formData.processingFee);
      apiFormData.append('tenure', formData.tenure);
      apiFormData.append('link', formData.link);
      apiFormData.append('description', formData.description || '');
      apiFormData.append('recommended', formData.recommended.toString());
      
      if (formData.documents) {
        apiFormData.append('documents', JSON.stringify(formData.documents));
      }

      const response = await api.post('/user/add-offers', apiFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Add response:', response.data);
      
      toast.success('Offer added successfully!');
      setShowAddModal(false);
      resetForm();
      fetchOffers();
    } catch (error) {
      toast.error('Failed to add offer');
      console.error('Add error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditOffer = async () => {
    try {
      if (!selectedOffer) return;

      setSubmitting(true);

      // Create FormData for multipart/form-data
      const apiFormData = new FormData();
      
      // Add ID for update
      apiFormData.append('id', selectedOffer.id!.toString());
      
      // Add logo file if selected, otherwise add logo URL
      if (logoFile) {
        apiFormData.append('logo', logoFile);
      } else if (formData.logo) {
        apiFormData.append('logo', formData.logo);
      }

      // Add other form fields
      apiFormData.append('loanAmount', formData.loanAmount);
      apiFormData.append('interestRate', formData.interestRate);
      apiFormData.append('processingFee', formData.processingFee);
      apiFormData.append('tenure', formData.tenure);
      apiFormData.append('link', formData.link);
      apiFormData.append('description', formData.description || '');
      apiFormData.append('recommended', formData.recommended.toString());
      
      if (formData.documents) {
        apiFormData.append('documents', JSON.stringify(formData.documents));
      }

      const response = await api.post('/user/update-offers', apiFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Update response:', response.data);
      
      toast.success('Offer updated successfully!');
      setShowEditModal(false);
      resetForm();
      fetchOffers();
    } catch (error) {
      toast.error('Failed to update offer');
      console.error('Update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOffer = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;

    try {
      const response = await api.delete(`/user/delete-offer/${id}`);
      console.log('Delete response:', response.data);
      
      toast.success('Offer deleted successfully!');
      fetchOffers();
    } catch (error) {
      toast.error('Failed to delete offer');
      console.error('Delete error:', error);
    }
  };

  const handleViewOffer = async (offer: Offer) => {
    try {
      if (offer.id) {
        const response = await api.get(`/user/get-offer?id=${offer.id}`);
        console.log('Get offer response:', response.data);
        
        if (response.data.success && response.data.offer) {
          setSelectedOffer(response.data.offer);
        } else {
          setSelectedOffer(offer);
        }
      } else {
        setSelectedOffer(offer);
      }
      setShowViewModal(true);
    } catch (error) {
      toast.error('Failed to fetch offer details');
      console.error('View error:', error);
      setSelectedOffer(offer);
      setShowViewModal(true);
    }
  };

  const openEditModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setFormData({
      logo: offer.logo || '',
      loanAmount: offer.loanAmount,
      interestRate: offer.interestRate,
      processingFee: offer.processingFee,
      tenure: offer.tenure,
      link: offer.link,
      description: offer.description || '',
      recommended: offer.recommended === "1" || offer.recommended === 1 || offer.recommended === true,
      documents: offer.documents || null
    });
    setLogoPreview('https://confirmmoney-nodejs.ckeoo6.easypanel.host' + offer.logo || '');
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      logo: '',
      loanAmount: '',
      interestRate: '',
      processingFee: '',
      tenure: '',
      link: '',
      description: '',
      recommended: false,
      documents: null
    });
    setSelectedOffer(null);
    setLogoPreview('');
    setLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeLogo = () => {
    setLogoPreview('');
    setLogoFile(null);
    setFormData({ ...formData, logo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount.replace(/[^\d]/g, ''));
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const isRecommended = (offer: Offer) => {
    return offer.recommended === "1" || offer.recommended === 1 || offer.recommended === true;

  };

  const LogoUploadSection = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Logo
      </label>
      
      {/* Logo Preview */}
      {logoPreview && (
        <div className="mb-3 relative inline-block">
          <img 
            src={logoPreview} 
            alt="Logo Preview" 
            className="w-20 h-20 object-contain border border-gray-300 rounded-lg bg-gray-50"
          />
          <button
            type="button"
            onClick={removeLogo}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload Options */}
      <div className="space-y-3">
        {/* File Upload */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={submitting}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Browse & Upload Logo
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Supported: JPG, PNG, GIF (Max 5MB)
          </p>
        </div>

        {/* URL Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="url"
            value={formData.logo}
            onChange={(e) => {
              setFormData({ ...formData, logo: e.target.value });
              if (e.target.value && !logoFile) {
                setLogoPreview(e.target.value);
              }
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Or paste logo URL"
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <CreditCard className="mr-3 text-green-600" />
                Offers Management
              </h1>
              <p className="mt-1 text-gray-600">Manage loan offers and lending partners</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Offer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Offers</p>
                <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recommended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.filter(offer => isRecommended(offer)).length}
                </p>
              </div>
            </div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">With Logos</p>
                <p className="text-2xl font-bold text-gray-900">{offers.filter(o => o.logo).length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Interest</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.length > 0 ? 
                    Math.round(offers.reduce((acc, offer) => {
                      const rate = parseFloat(offer.interestRate.replace(/[^\d.]/g, ''));
                      return acc + (isNaN(rate) ? 0 : rate);
                    }, 0) / offers.length) + '%' : '0%'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search offers by amount, interest rate, tenure, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg flex items-center justify-center">
                      {offer.logo ? (
                        <img 
                          src={'https://confirmmoney-nodejs.ckeoo6.easypanel.host' + offer.logo} 
                          alt="Lender Logo" 
                          className="w-8 h-8 object-contain rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <ImageIcon className={`w-6 h-6 text-gray-600 ${offer.logo ? 'hidden' : ''}`} />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">
                        {offer.description || 'Loan Offer'}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {offer.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {isRecommended(offer) && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1" />
                        Recommended
                      </span>
                    )}
                    {offer.create_date && (
                      <span className="text-xs text-gray-400">
                        {formatDate(offer.create_date)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="font-semibold">
                      {formatCurrency(offer.loanAmount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <span className="font-semibold">{offer.interestRate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Processing Fee</span>
                    <span className="font-semibold">{offer.processingFee}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tenure</span>
                    <span className="font-semibold">{offer.tenure}</span>
                  </div>

                  {offer.documents && offer.documents.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documents</span>
                      <span className="font-semibold text-gray-600 flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {offer.documents.length} types
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleViewOffer(offer)}
                    className="flex items-center text-green-600 hover:text-green-800 transition"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(offer)}
                      className="flex items-center text-green-600 hover:text-green-800 transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    
                    {/* {offer.id && (
                      <button
                        onClick={() => handleDeleteOffer(offer.id!)}
                        className="flex items-center text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOffers.length === 0 && !loading && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No offers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new offer.'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Offer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Offer Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Add New Offer</h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Personal Loan, Business Loan, etc."
                  />
                </div>

                <LogoUploadSection />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount *
                  </label>
                  <input
                    type="text"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="100000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate *
                  </label>
                  <input
                    type="text"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="10% p.a."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fees *
                  </label>
                  <input
                    type="text"
                    value={formData.processingFee}
                    onChange={(e) => setFormData({ ...formData, processingFee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="1% of loan amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure *
                  </label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="12-60 months"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Link *
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://your-loan-offer-link.com"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recommended"
                    checked={formData.recommended}
                    onChange={(e) => setFormData({ ...formData, recommended: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="recommended" className="ml-2 block text-sm text-gray-700">
                    Mark as recommended offer
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddOffer}
                    disabled={submitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? 'Adding...' : 'Add Offer'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Offer Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Edit Offer</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Personal Loan, Business Loan, etc."
                  />
                </div>

                <LogoUploadSection />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount *
                  </label>
                  <input
                    type="text"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="100000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate *
                  </label>
                  <input
                    type="text"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="10% p.a."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fees *
                  </label>
                  <input
                    type="text"
                    value={formData.processingFee}
                    onChange={(e) => setFormData({ ...formData, processingFee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="1% of loan amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure *
                  </label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="12-60 months"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Link *
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://your-loan-offer-link.com"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recommended-edit"
                    checked={formData.recommended}
                    onChange={(e) => setFormData({ ...formData, recommended: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="recommended-edit" className="ml-2 block text-sm text-gray-700">
                    Mark as recommended offer
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditOffer}
                    disabled={submitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? 'Updating...' : 'Update Offer'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Offer Modal */}
      <AnimatePresence>
        {showViewModal && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Offer Details</h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {selectedOffer.logo ? (
                      <img 
                        src={'https://confirmmoney-nodejs.ckeoo6.easypanel.host' + selectedOffer.logo} 
                        alt="Lender Logo" 
                        className="w-12 h-12 object-contain rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <ImageIcon className={`w-8 h-8 text-gray-600 ${selectedOffer.logo ? 'hidden' : ''}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedOffer.description || `Loan Offer #${selectedOffer.id}`}
                  </h4>
                  {isRecommended(selectedOffer) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mt-2">
                      <Star className="w-4 h-4 mr-1" />
                      Recommended Offer
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 rounded-lg py-1 px-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Loan Amount</span>
                    </div>
                    <p className="text-xl">
                      {formatCurrency(selectedOffer.loanAmount)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg py-1 px-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Interest Rate</span>
                    </div>
                    <p className="text-xl">{selectedOffer.interestRate}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg py-1 px-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Processing Fees</span>
                    </div>
                    <p className="text-xl">{selectedOffer.processingFee}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg py-1 px-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Tenure</span>
                    </div>
                    <p className="text-xl">{selectedOffer.tenure}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg py-1 px-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">Offer Link</span>
                    </div>
                    <a
                      href={selectedOffer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 flex items-center break-all"
                    >
                      <span className="truncate">{selectedOffer.link}</span>
                      <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                    </a>
                  </div>

                  {selectedOffer.documents && selectedOffer.documents.length > 0 && (
                    <div className="bg-gray-50 rounded-lg py-1 px-4">
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-700">Required Documents</span>
                      </div>
                      <div className="space-y-2">
                        {selectedOffer.documents.map((doc, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-3">
                            <p className="font-medium text-gray-800 text-sm">{doc.title}</p>
                            <p className="text-xs text-gray-600">
                              Examples: {doc.examples.join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOffer.create_date && (
                    <div className="bg-gray-50 rounded-lg py-1 px-4">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700">Created Date</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-600">
                        {formatDate(selectedOffer.create_date)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffersManagement;