import SvgIcon from '@mui/material/SvgIcon';

export default function SitemarkIcon() {
  return (
    <SvgIcon sx={{ height: 50, width: 100, mr: 2 }}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 200 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <text
          x='0'
          y='70'
          fill='#1e6f2d'
          fontSize='50'
          fontFamily='Open Sans, Arial, sans-serif'
          fontWeight='bold'
        >
          IFPB
        </text>
      </svg>
    </SvgIcon>
  );
}
