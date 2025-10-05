// Foozi Logo Component - Represents collaboration and open source community
export const FooziLogo = ({
  className = "h-6 w-6",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer circle - community */}
    <circle cx="16" cy="16" r="15" stroke="#000000" strokeWidth="2" />

    {/* Inner connected nodes - representing contributors */}
    <circle cx="16" cy="8" r="2.5" fill="#000000" />
    <circle cx="10" cy="14" r="2.5" fill="#000000" />
    <circle cx="22" cy="14" r="2.5" fill="#000000" />
    <circle cx="13" cy="22" r="2.5" fill="#000000" />
    <circle cx="19" cy="22" r="2.5" fill="#000000" />

    {/* Connecting lines - collaboration */}
    <line x1="16" y1="8" x2="10" y2="14" stroke="#000000" strokeWidth="1.5" />
    <line x1="16" y1="8" x2="22" y2="14" stroke="#000000" strokeWidth="1.5" />
    <line x1="10" y1="14" x2="13" y2="22" stroke="#000000" strokeWidth="1.5" />
    <line x1="22" y1="14" x2="19" y2="22" stroke="#000000" strokeWidth="1.5" />
    <line x1="13" y1="22" x2="19" y2="22" stroke="#000000" strokeWidth="1.5" />
  </svg>
);
