const token = `Bearer ${localStorage.getItem('token')}`;

const jwtHeader = {headers:{Authorization: token}};

export default jwtHeader;