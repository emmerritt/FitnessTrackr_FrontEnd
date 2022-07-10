

const logout = (setUsername, setAuthToken) => {

    setAuthToken();
    setUsername();
    window.localStorage.clear('ft-token');
    window.localStorage.clear('ft-username');
}

export default logout;