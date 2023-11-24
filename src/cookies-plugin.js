import Cookies from 'js-cookie';

const CookiesPlugin = {
    install(app) {
        app.config.globalProperties.$Cookies = Cookies;
    }
};

export default CookiesPlugin;