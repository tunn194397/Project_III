// env
export const TEST_ENV = process.env.REACT_APP_DEV_ENV as string;
export const PROD_ENV = process.env.REACT_APP_PROD_ENV as string;

export const SOCKET_URL = 'wss://socket-market.varvn.tech';

export const LOCAL_STORAGE = {
    token: 'token'
};

export const FORMAT_DATE = 'YYYY-MM-DD';

export const COMMON_DATA = {
    listDay: [
        { value: 1, text: 'day' },
        { value: 2, text: 'days' },
        { value: 3, text: 'days' },
        { value: 4, text: 'days' },
        { value: 5, text: 'days' },
        { value: 6, text: 'days' },
        { value: 7, text: 'days' }
    ]
};
