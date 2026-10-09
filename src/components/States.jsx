const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <div key={n} className="animate-pulse rounded border p-3">
          <div className="aspect-square bg-gray-200" />
          <div className="mt-3 h-4 w-3/4 bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div role="alert" className="rounded border border-red-300 bg-red-50 p-6 text-center">
      <p className="text-red-800">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded bg-red-700 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}

const Empty = ({ text }) => {
  return <p className="p-10 text-center text-gray-600">{text}</p>;
}

const DetailLoading = () => {
  return (
    <div className="grid animate-pulse gap-8 md:grid-cols-2">
      <div>
        <div className="aspect-square bg-gray-200" />
        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-16 w-16 bg-gray-200" />
          ))}
        </div>
      </div>
      <div>
        <div className="h-8 w-3/4 bg-gray-200" />
        <div className="mt-4 h-6 w-1/4 bg-gray-200" />
        <div className="mt-6 h-4 w-full bg-gray-200" />
        <div className="mt-2 h-4 w-full bg-gray-200" />
        <div className="mt-2 h-4 w-2/3 bg-gray-200" />
      </div>
    </div>
  );
}
export { Loading, ErrorMessage, Empty, DetailLoading };