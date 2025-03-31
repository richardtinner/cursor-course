export default function ApiKeyForm({ 
  modalMode, 
  formData, 
  error, 
  onInputChange, 
  onSubmit, 
  onClose 
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {modalMode === 'create' ? 'Create New API Key' : 'Edit API Key'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-shake">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Key Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter a name for your API key"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key Value {modalMode === 'create' && '(Optional)'}</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={onInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 font-mono"
            placeholder={modalMode === 'create' ? "Leave blank to auto-generate" : "API Key value"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Usage</label>
          <input
            type="number"
            name="usage"
            value={formData.usage}
            onChange={onInputChange}
            min="0"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter usage count"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!formData.name}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {modalMode === 'create' ? 'Create Key' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 