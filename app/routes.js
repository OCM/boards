module.exports = [
    { path: '/',         route: require('./routes/home')     },
    { path: '/login',    route: require('./routes/login')    },
    { path: '/q',        route: require('./routes/search')   },
    //{ path: '/settings', route: require('./routes/settings') },
    { path: '/t',        route: require('./routes/tags')     },
    { path: '/u',        route: require('./routes/users')    }
];
