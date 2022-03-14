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

config['mapKey'] = 'fb10d68786e5060551e53489063e8b34'

export default config
