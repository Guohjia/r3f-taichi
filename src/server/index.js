import axios from 'axios';

const CLIENT_ID = '9d300717e9196fb7b135';
const CLIENT_SECRET = 'cea73f119e04e009f40f48eb4007b3ac8cddd4bd';

const getAccessToken = (code) => {
    return axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
          `client_id=${CLIENT_ID}&` +
          `client_secret=${CLIENT_SECRET}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json'
        }
      });
};

const getUserInfo = (access_token) => {
    return axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          accept: 'application/json',
          Authorization: `token ${access_token}`
        }
    });
}

export {
    getAccessToken,
    getUserInfo
}
