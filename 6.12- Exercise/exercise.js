async function launchProcess() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    const movies = await getTopMovies();
    console.log('Top movies: ', movies);
    const response = await sendEmail('hb@test.com', );
    console.log(`Email sent... ${response}`);
  } catch (error) {
      console.log('Error', error.message);
  }
}

launchProcess();

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email'
      });
    }, 4000);
  });
}

function getTopMovies(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('OK');
    }, 4000);
  });

}