import axios from 'axios';

const getTest = () => {
    return axios.get('http://localhost:8080/test-entry', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
};

export default {
    getTest
}
