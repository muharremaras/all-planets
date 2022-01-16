import axios from 'axios';

test('api health check', async () => {
  await axios
    .get('https://www.swapi.tech/api')
    .then(function (response) {
      if (response.data.message !== 'ok') throw new Error('server error');
    })
    .catch(function (error) {
      throw new Error('server error');
    });
});
