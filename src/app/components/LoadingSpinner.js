export default function LoadingSpinner({ size = 24 }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#e5e7eb"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="#ec4899"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}
