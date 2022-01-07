var config = null

if (process.env.NODE_ENV !== 'product') {
    config = {
        backBaseUrl: 'http://127.0.0.1:8081',
        imageBaseUrl: 'http://127.0.0.1:8082'
    }
}
else {
    config = {
        backBaseUrl: '',
        imageBaseUrl: ''
    }
}

export default config
