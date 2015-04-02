module.exports = [
    { path: '/',         route: require('./home')     },
    { path: '/login',    route: require('./login')    },
    { path: '/q',        route: require('./search')   },
    { path: '/settings', route: require('./settings') },
    { path: '/st',       route: require('./static')   },
    { path: '/t',        route: require('./tags')     },
    { path: '/u',        route: require('./users')    }
];
