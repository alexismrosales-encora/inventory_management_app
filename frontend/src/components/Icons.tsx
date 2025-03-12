interface IconProps {
  width?: number,
  height?: number,
  color?: string
}

export const NavUpArrowIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 10L8.8125 6L12.8125 10" stroke="#131927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const NavDownArrowIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 6L8.8125 10L12.8125 6" stroke="#131927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const NavLeftArrowIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8125 4L6.8125 8L10.8125 12" stroke="#131927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}
