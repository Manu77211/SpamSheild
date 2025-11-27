const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
        <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-xl">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
