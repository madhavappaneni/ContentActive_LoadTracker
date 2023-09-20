import { formatDistance } from 'date-fns';

export const calculateTimeAgo = (prevTimeStamp) => {
    return formatDistance(new Date(Date.parse(prevTimeStamp)), new Date(), { addSuffix: true });
};
