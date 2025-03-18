interface IconProps {
  width?: number,
  height?: number,
  color?: string,
}

export const NavUpArrowIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 10L8.8125 6L12.8125 10" stroke="#131927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const NavDownArrowIcon = ({ width = 17, height = 16, color = "#131927" }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 6L8.8125 10L12.8125 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const NavLeftArrowIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.8125 4L6.8125 8L10.8125 12" stroke="#131927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const SearchIcon = ({ width = 17, height = 16 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 16" fill="none">
    <path d="M12.146 11.3333L14.8127 13.9999" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.8125 7.33333C2.8125 10.2789 5.20031 12.6667 8.14583 12.6667C9.62114 12.6667 10.9565 12.0676 11.9221 11.0996C12.8843 10.1348 13.4792 8.80354 13.4792 7.33333C13.4792 4.38781 11.0914 2 8.14583 2C5.20031 2 2.8125 4.38781 2.8125 7.33333Z" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const CategoryIcon = ({ width = 16, height = 17 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 17" fill="none">
    <g clipPath="url(#clip0_180_824)">
      <path d="M6 7H6.5V6.5V4.5V4H6H4H3.5V4.5V6.5V7H4H6ZM12 7H12.5V6.5V4.5V4H12H10H9.5V4.5V6.5V7H10H12ZM6 13H6.5V12.5V10.5V10H6H4H3.5V10.5V12.5V13H4H6ZM12 13H12.5V12.5V10.5V10H12H10H9.5V10.5V12.5V13H10H12ZM3.33333 1H12.6667C14.2285 1 15.5 2.27148 15.5 3.83333V13.1667C15.5 14.7285 14.2285 16 12.6667 16H3.33333C1.77148 16 0.5 14.7285 0.5 13.1667V3.83333C0.5 2.27148 1.77148 1 3.33333 1ZM12.6667 15.6667C14.0455 15.6667 15.1667 14.5455 15.1667 13.1667V3.83333C15.1667 2.45452 14.0455 1.33333 12.6667 1.33333H3.33333C1.95452 1.33333 0.833333 2.45452 0.833333 3.83333V13.1667C0.833333 14.5455 1.95452 15.6667 3.33333 15.6667H12.6667ZM3.66667 3.66667H6.33333C6.60852 3.66667 6.83333 3.89148 6.83333 4.16667V6.83333C6.83333 7.10852 6.60852 7.33333 6.33333 7.33333H3.66667C3.39148 7.33333 3.16667 7.10852 3.16667 6.83333V4.16667C3.16667 3.89148 3.39148 3.66667 3.66667 3.66667ZM9.66667 3.66667H12.3333C12.6085 3.66667 12.8333 3.89148 12.8333 4.16667V6.83333C12.8333 7.10852 12.6085 7.33333 12.3333 7.33333H9.66667C9.39148 7.33333 9.16667 7.10852 9.16667 6.83333V4.16667C9.16667 3.89148 9.39148 3.66667 9.66667 3.66667ZM3.66667 9.66667H6.33333C6.60852 9.66667 6.83333 9.89148 6.83333 10.1667V12.8333C6.83333 13.1085 6.60852 13.3333 6.33333 13.3333H3.66667C3.39148 13.3333 3.16667 13.1085 3.16667 12.8333V10.1667C3.16667 9.89148 3.39148 9.66667 3.66667 9.66667ZM9.66667 9.66667H12.3333C12.6085 9.66667 12.8333 9.89148 12.8333 10.1667V12.8333C12.8333 13.1085 12.6085 13.3333 12.3333 13.3333H9.66667C9.39148 13.3333 9.16667 13.1085 9.16667 12.8333V10.1667C9.16667 9.89148 9.39148 9.66667 9.66667 9.66667Z" fill="#363635" stroke="#AEAFAB" />
    </g>
    <defs>
      <clipPath id="clip0_180_824">
        <rect width={width} height={width} fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
}

export const BoardCheck = ({ width = 16, height = 16 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <g clipPath="url(#clip0_180_109)">
      <path d="M5.66669 3.16667H4.66669C3.56212 3.16667 2.66669 4.0621 2.66669 5.16667V13.1667C2.66669 14.2712 3.56212 15.1667 4.66669 15.1667H8.00002" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.3333 3.16667H11.3333C12.4379 3.16667 13.3333 4.0621 13.3333 5.16667V10.5" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.33331 4.70513V3.50001C5.33331 3.31591 5.48255 3.16667 5.66665 3.16667C5.85074 3.16667 6.00279 3.01737 6.03432 2.83599C6.1331 2.26781 6.51597 1.16667 7.99998 1.16667C9.48399 1.16667 9.86686 2.26781 9.96563 2.83599C9.99717 3.01737 10.1492 3.16667 10.3333 3.16667C10.5174 3.16667 10.6666 3.31591 10.6666 3.50001V4.70513C10.6666 4.96003 10.46 5.16667 10.2051 5.16667H5.79485C5.53995 5.16667 5.33331 4.96003 5.33331 4.70513Z" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.3333 14.1667L11.6666 15.5L15 12.1667" stroke="#AEAFAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_180_109">
        <rect width={width} height={height} fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
}

export const DollarIcon = ({ width = 30, height = 30 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 30 30" fill="none">
    <path d="M20.1917 8.94228C19.0061 7.75672 16.9183 6.9321 14.9994 6.88046M9.80713 20.1922C10.9226 21.6795 12.9965 22.5278 14.9994 22.5997M14.9994 6.88046C12.7163 6.81902 10.6725 7.85187 10.6725 10.6731C10.6725 15.8653 20.1917 13.2692 20.1917 18.4615C20.1917 21.4229 17.6582 22.6952 14.9994 22.5997M14.9994 6.88046V3.75M14.9994 22.5997V26.2499" stroke="#2D321A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const NewProductIcon = ({ width = 20, height = 20 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path d="M7.5 10H10M12.5 10H10M10 10V7.5M10 10V12.5" stroke="#65421F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33331 17.7333V2.26666C3.33331 1.93529 3.60194 1.66666 3.93331 1.66666H13.5015C13.6606 1.66666 13.8132 1.72988 13.9257 1.8424L16.4909 4.40759C16.6034 4.52012 16.6666 4.67273 16.6666 4.83186V17.7333C16.6666 18.0647 16.398 18.3333 16.0666 18.3333H3.93331C3.60194 18.3333 3.33331 18.0647 3.33331 17.7333Z" stroke="#65421F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.3333 1.66666V4.4C13.3333 4.73137 13.6019 5 13.9333 5H16.6666" stroke="#65421F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const PlusIcon = ({ width = 20, height = 17 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 17" fill="none">
    <path d="M5 8.94638H10M15 8.94638H10M10 8.94638V4.94638M10 8.94638V12.9464" stroke="#ACBB7C" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
  </svg>
}

export const EditProductIcon = ({ width = 20, height = 20 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path d="M2.5 17.5L10 17.5H17.5" stroke="#ACBB7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.1847 4.85699L12.5417 2.49997L16.6665 6.62476L14.3095 8.98178M10.1847 4.85699L5.56134 9.48034C5.3738 9.66788 5.26845 9.92223 5.26845 10.1874L5.26845 13.898L8.97902 13.898C9.24424 13.898 9.49859 13.7927 9.68613 13.6051L14.3095 8.98178M10.1847 4.85699L14.3095 8.98178" stroke="#ACBB7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const DeleteProductIcon = ({ width = 20, height = 20 }: IconProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path d="M5.63205 14.3689L10.0009 10M14.3698 5.63113L10.0009 10M10.0009 10L5.63205 5.63113M10.0009 10L14.3698 14.3689" stroke="#ACBB7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}
