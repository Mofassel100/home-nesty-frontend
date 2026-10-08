
export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-label="Home Nesty logo"
      role="img"
    >
      <defs>
        <linearGradient
          id="home-nesty-gradient"
          x1="8"
          y1="5"
          x2="33"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75D8FC" />
          <stop offset="1" stopColor="#0072E5" />
        </linearGradient>
      </defs>

      {/* House */}
      <path
        d="M5 18.5L20 6L35 18.5V33C35 34.1 34.1 35 33 35H7C5.9 35 5 34.1 5 33V18.5Z"
        fill="url(#home-nesty-gradient)"
      />

      {/* Roof */}
      <path
        d="M3 19L20 4L37 19"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Door */}
      <path
        d="M16 35V24C16 22.9 16.9 22 18 22H22C23.1 22 24 22.9 24 24V35"
        fill="white"
      />

      {/* Door handle */}
      <circle
        cx="21.5"
        cy="28.5"
        r="1"
        fill="#0072E5"
      />

      {/* Windows */}
      <rect
        x="9"
        y="21"
        width="5"
        height="5"
        rx="1"
        fill="white"
      />

      <rect
        x="26"
        y="21"
        width="5"
        height="5"
        rx="1"
        fill="white"
      />
    </svg>
  );
}
