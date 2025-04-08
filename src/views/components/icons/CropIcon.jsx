export default function CropIcon ({ width, height, stroke }){

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 17 17"
    >
      <path
        stroke={stroke}
        strokeWidth={1.2}
        d="M8.241 16.5V8.224m0 .517v3.104m0-3.104a4.138 4.138 0 0 0-4.138-4.138H1v3.104a4.138 4.138 0 0 0 4.138 4.138H8.24m0-3.104h3.104a4.138 4.138 0 0 0 4.138-4.138V1.5h-3.104a4.138 4.138 0 0 0-4.138 4.138V8.74Zm0 0 4.138-4.138m-4.138 7.242L4.103 7.707"
      />
    </svg>
  )
}