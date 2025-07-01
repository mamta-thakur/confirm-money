import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX,
  Calendar,
  Phone,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { UserData, convertToCSV, downloadCSV, formatCurrency, formatDate } from '../utils/csvExport';
import userService from '../services/userService';
import toast from 'react-hot-toast';

const AdminManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await userService.fetchUsersFromAPI();
      setUsers(userData);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.mobile.includes(searchTerm) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.pan?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'verified' ? user.isAuthenticated : !user.isAuthenticated
      );
    }

    setFilteredUsers(filtered);
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const response = await api.get('/user/downalduser', {
        responseType: 'blob', // Important for file downloads
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      link.setAttribute('download', `users_export_${timestamp}.csv`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    //   const exportData = await userService.exportUsersData();
    //   const csvContent = convertToCSV(exportData);
    //   const timestamp = new Date().toISOString().split('T')[0];
    //   downloadCSV(csvContent, `users_export_${timestamp}.csv`);
    //   toast.success('Users data exported successfully!');

    } catch (error) {
      toast.error('Failed to export data');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="mr-3 text-blue-600" />
                Admin Management
              </h1>
              <p className="mt-1 text-gray-600">Manage and export user data</p>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
            >
              <Download className="w-5 h-5 mr-2" />
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.mobile}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.gender || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.dob ? formatDate(selectedUser.dob) : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAN</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.pan || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhar</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.aadhar ? `****-****-${selectedUser.aadhar.slice(-4)}` : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              {(selectedUser.profession || selectedUser.income) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                    Professional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profession</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.profession || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.income ? formatCurrency(selectedUser.income) : 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Information */}
              {(selectedUser.loanType || selectedUser.loanAmount) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                    Loan Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Loan Type</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.loanType || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Loan Purpose</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.loanPurpose || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.loanAmount ? formatCurrency(selectedUser.loanAmount) : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tenure</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.tenure ? `${selectedUser.tenure} months` : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Status */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Account Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedUser.isAuthenticated 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedUser.isAuthenticated ? 'Verified' : 'Pending Verification'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.registrationDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;