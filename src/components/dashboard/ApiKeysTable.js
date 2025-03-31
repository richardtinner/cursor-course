export default function ApiKeysTable({ 
  apiKeys, 
  visibleKeys, 
  onToggleVisibility, 
  onCopy, 
  onEdit, 
  onDelete 
}) {
  const maskApiKey = (key) => {
    return '*'.repeat(Math.min(40, key.length));
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm border-b border-gray-200 dark:border-gray-700">
          <th className="pb-3 font-medium">NAME</th>
          <th className="pb-3 font-medium">USAGE</th>
          <th className="pb-3 font-medium">KEY</th>
          <th className="pb-3 font-medium text-right">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.map((key, index) => (
          <tr 
            key={key.id} 
            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <td className="py-4">{key.name}</td>
            <td className="py-4">{key.usage}</td>
            <td className="py-4 font-mono text-sm">
              <span>{visibleKeys.has(key.id) ? key.value : maskApiKey(key.value)}</span>
            </td>
            <td className="py-4">
              <div className="flex gap-3 justify-end">
                <button
                  className={`text-gray-500 hover:text-gray-700 transition-colors duration-200 ${visibleKeys.has(key.id) ? 'text-blue-500' : ''}`}
                  onClick={() => onToggleVisibility(key.id)}
                  title={visibleKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {visibleKeys.has(key.id) ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 transform hover:scale-110"
                  onClick={() => onCopy(key.value)}
                  title="Copy API Key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 transform hover:scale-110"
                  onClick={() => onEdit(key)}
                  title="Edit API Key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 transform hover:scale-110"
                  onClick={() => onDelete(key.id)}
                  title="Delete API Key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
        {apiKeys.length === 0 && (
          <tr>
            <td colSpan="4" className="py-4 text-center text-gray-500 animate-pulse-soft">
              No API keys found. Create one using the button above.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
} 