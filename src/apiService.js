import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const generateGetQuery = (baseUrl, filters) => {
    const queryParams = Object.keys(filters)
        .map((key) => {
            const value = filters[key];
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            return `${['page', 'limit', 'sort', 'fields', 'search'].includes(key) ? key : `filters[${encodedKey}]`
                }=${encodedValue}`;
        })
        .join('&');

    if (!queryParams) {
        return baseUrl;
    } else {
        return `${baseUrl}?${queryParams}`;
    }
};

export const showErrorToast = (error, options = {}) => {
    let errorMessage = 'An error occurred';

    if (error && error?.message) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        ...options,
    });
};

export const showSuccessToast = (error, options = {}) => {
    let errorMessage = 'An error occurred';

    if (error && error?.message) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    toast.success(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        ...options,
    });
};

export const get = async (url, filters = {}) => {
    url = generateGetQuery(url, filters);
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw 'An unexpected error has occurred. Please try again later.';
                }
            })
            .then((data) => {
                if (data?.success == false || data?.error)
                    throw data?.message || data?.msg
                        ? data?.message || data?.msg
                        : 'An unexpected error has occurred. Please try again later.';
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                showErrorToast(error);
                reject(error);
            });
    });
};

export const post = async (url, _body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(_body),
        })
        .then(async (res) => {
            if (res.ok) {
                return res.json();
            } else {
                const error = await res.json();
                if (error && (error.message || error.msg)) {
                    throw new Error(error.message || error.msg);
                } else {
                    throw new Error('An unexpected error has occurred. Please try again later.');
                }
            }
        })
        .then((data) => {
            if (data?.success === false || data?.error) {
                throw new Error(data?.message || data?.msg || 'An unexpected error has occurred. Please try again later.');
            }
            showSuccessToast(data.message);
            resolve(data);
        })
        .catch((error) => {
            console.error(error);
            showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
            reject(error.message || 'An unexpected error has occurred. Please try again later.');
        });
    });
};

export const postWithFormData = async (url, body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body,
        })
        .then(async (res) => {
            if (res.ok || res.status === 400) {
                return res.json();
            } else {
                const error = await res.json();
                if (error && (error.message || error.msg)) {
                    throw new Error(error.message || error.msg);
                } else {
                    throw new Error('An unexpected error has occurred. Please try again later.');
                }
            }
        })
        .then((data) => {
            if (data?.success === false || data?.error) {
                throw new Error(data?.message || data?.msg || 'An unexpected error has occurred. Please try again later.');
            }
            showSuccessToast(data.message);
            resolve(data);
        })
        .catch((error) => {
            console.error(error);
            showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
            reject(error.message || 'An unexpected error has occurred. Please try again later.');
        });
    });
};

export const patch = async (url, _body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(_body),
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
            })
            .then((data) => {
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};

export const patchWithFormData = async (url, body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body,
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
            })
            .then((data) => {
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};

export const put = async (url, _body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(_body),
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
            })
            .then((data) => {
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};


export const putWithFormData = async (url, body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body,
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
            })
            .then((data) => {
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};

export const Delete = async (url, id) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + (url.endsWith('/') ? url : url + '/') + id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    return { message: 'Delete successful', id: id };
                } else {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
            })
            .then((data) => {
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error.message || 'An unexpected error has occurred. Please try again later.');
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};

export const postWithoutToken = async (url, _body) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_BASEURL + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_body),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    if (error && error.message) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unexpected error has occurred. Please try again later.');
                    }
                }
                return res.json();
            })
            .then((data) => {
                if (data.success === false || data.error) {
                    throw new Error(data.message || data.msg || 'An unexpected error has occurred. Please try again later.');
                }
                showSuccessToast(data.message);
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                showErrorToast(error);
                reject(error.message || 'An unexpected error has occurred. Please try again later.');
            });
    });
};