const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow rounded-lg p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-700">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default EmptyState;