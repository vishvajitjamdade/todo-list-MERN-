export function validateRegister({ name, email, password }) {
    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.email = 'Valid email required';
    if (!password || password.length < 6) errors.password = 'Password min 6 characters';
    return errors;
}


export function validateLogin({ email, password }) {
    const errors = {};
    if (!email) errors.email = 'Email required';
    if (!password) errors.password = 'Password required';
    return errors;
}