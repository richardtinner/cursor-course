'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';
import Toast from '@/components/dashboard/Toast';
import ApiKeyForm from '@/components/dashboard/ApiKeyForm';
import ApiKeysTable from '@/components/dashboard/ApiKeysTable';
import ContactModal from '@/components/dashboard/ContactModal';
import { apiKeyService } from '@/services/apiKeyService';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    usage: 0
  });
  const [editingKey, setEditingKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (err) {
      setError('Failed to fetch API keys: ' + err.message);
      console.error('Error fetching keys:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!formData.name) return;
    
    try {
      setError(null);
      const data = await apiKeyService.createApiKey(formData);
      setApiKeys(prev => [data, ...prev]);
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to create API key: ' + err.message);
      console.error('Error creating key:', err);
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      setError(null);
      await apiKeyService.deleteApiKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (err) {
      setError('Failed to delete API key: ' + err.message);
      console.error('Error:', err);
    }
  };

  const handleSaveEdit = async () => {
    if (!formData.name) return;

    try {
      setError(null);
      const data = await apiKeyService.updateApiKey(editingKey.id, formData);
      setApiKeys(prev => prev.map(key => 
        key.id === editingKey.id ? data : key
      ));
      resetForm();
      setIsModalOpen(false);
      setModalMode('create');
    } catch (err) {
      setError('Failed to update API key: ' + err.message);
      console.error('Error:', err);
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleEditClick = (key) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      value: key.value,
      usage: key.usage
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      value: '',
      usage: 0
    });
    setEditingKey(null);
    setError(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
    setModalMode('create');
  };

  const handleCreateNewClick = () => {
    setModalMode('create');
    setIsModalOpen(true);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast('Copied API Key to clipboard');
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast(null)}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ApiKeyForm
            modalMode={modalMode}
            formData={formData}
            error={error}
            onInputChange={handleInputChange}
            onSubmit={modalMode === 'create' ? handleCreateKey : handleSaveEdit}
            onClose={handleModalClose}
          />
        </Modal>

        <div className="flex justify-between items-center mb-8 animate-slide-in">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-gray-400">/</span>
              Overview
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
              Operational
            </span>
          </div>
        </div>

        {/* Current Plan Section */}
        <div className="bg-gradient-to-r from-rose-200 via-purple-300 to-blue-300 p-8 rounded-xl mb-8 animate-scale-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
              <h2 className="text-3xl font-bold mb-6">Researcher</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">API Usage</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/30 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-sm">0 / 1,000 Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg transition-colors">
              Manage Plan
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={handleCreateNewClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              + Create New Key
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>

            <ApiKeysTable
              apiKeys={apiKeys}
              visibleKeys={visibleKeys}
              onToggleVisibility={toggleKeyVisibility}
              onCopy={handleCopyToClipboard}
              onEdit={handleEditClick}
              onDelete={handleDeleteKey}
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex justify-between items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <p className="text-gray-600 dark:text-gray-400">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
          >
            Contact us
          </button>
        </div>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    </div>
  );
} 