import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box } from '@radix-ui/themes';

const LoadingIssueNewPage = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Skeleton height="20rm" />
        </Box>
    );
};

export default LoadingIssueNewPage;
