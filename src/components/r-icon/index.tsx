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
        <image
          href="/public/ifpb.png"  // caminho da imagem
          x="0"
          y="0"
          width="200"
          height="100"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </SvgIcon>
  );
}
