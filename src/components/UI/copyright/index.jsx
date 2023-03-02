import Typography from '@mui/material/Typography';
import Link from 'next/link';

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
            Copyright © <Link href="/">Archivica</Link>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}

export default Copyright;