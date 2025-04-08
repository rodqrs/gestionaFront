export default function InventoryIcon ({ width, height, fill }) {

  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M15 8c0 .5-.5.5-.5.5H13V10s0 .5-.5.5-.5-.5-.5-.5V8.5h-1.5s-.5 0-.5-.5.5-.5.5-.5H12V6s0-.5.5-.5.5.5.5.5v1.5h1.5s.5 0 .5.5ZM3.483 6.5H6l.017-4H3.5l-.017 4Zm-1.5 7H6v-6H1.983v6ZM12.5 12c-.5 0-.5.5-.5.5v1H7V5h2.483S10 5 10 4.5 9.5 4 9.483 4H7V2s0-.5-.517-.5H3s-.5 0-.5.5v4.5h-1S1 6.5 1 7v7c0 .5.5.5.5.5h10.983c.412 0 .517-.088.517-.5v-1.5s0-.5-.5-.5Z"
      clipRule="evenodd"
    />
  </svg>
  )
}