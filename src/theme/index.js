import { createTheme } from '@material-ui/core/styles';
export * from './gradientColor';
export const theme = createTheme({
    palette: {
        primary: {
            main: '#2a348e',
            dark: '#555daa',
            light: '#618cfb',
        },
    },
});
