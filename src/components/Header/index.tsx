import { West, HomeOutlined, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Header() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '33%' }}>
        <IconButton disableRipple>
          <West />
        </IconButton>
        <IconButton disableRipple>
          <HomeOutlined />
        </IconButton>
      </div>
      <h4 style={{ width: '33%', textAlign: 'center', whiteSpace: 'nowrap' }}>
        금주의 전단광고
      </h4>
      <IconButton
        disableRipple
        style={{ width: '33%', display: 'flex', justifyContent: 'right' }}
      >
        <Menu />
      </IconButton>
    </nav>
  );
}
