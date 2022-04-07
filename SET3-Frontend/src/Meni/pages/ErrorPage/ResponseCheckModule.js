const ResponseCheckModule = (function () {
    const unauthorizedResponseCheck = (response, navigate) => {
        if (response != null && response.status == 401 || response.status == 403)
            navigate('/unauthorized')
    }

    return {
        unauthorizedResponseCheck: unauthorizedResponseCheck
    }
}())

export default ResponseCheckModule