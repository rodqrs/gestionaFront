export default function ProductionIcon ({ width, height, stroke }){

  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
  >
    <g
      stroke={stroke}
      strokeMiterlimit={10}
      strokeWidth={1.1}
      clipPath="url(#a)"
    >
      <path d="m1.108 7.063 6.875-5.625 6.875 5.625" />
      <path d="M12.983 5.188v9.375h-10V5.187M14.233 14.563h-12.5" />
      <path d="M4.858 7.063h.481a2.644 2.644 0 0 1 2.644 2.643v.482h-.481a2.644 2.644 0 0 1-2.644-2.644v-.481ZM8.464 10.813h-.481v-.482a2.644 2.644 0 0 1 2.644-2.643h.48v.48a2.644 2.644 0 0 1-2.643 2.645ZM7.983 13.938V9.561" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.483.5h15v15h-15z" />
      </clipPath>
    </defs>
  </svg>
  )
}