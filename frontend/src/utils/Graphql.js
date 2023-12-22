export const getLatest25Attestations = () => {
  // Define your GraphQL query
  const query = `
    query Attestations {
      attestations(take: 25, orderBy: {time: desc}) {
        id
        attester
        recipient
        refUID
        revocable
        revocationTime
        expirationTime
        data
      }
    }
  `;

  // Make a POST request to the GraphQL endpoint
  fetch('https://sepolia.easscan.org/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // You may need to include additional headers like authorization token if required
  },
  body: JSON.stringify({ query }),
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    console.log(data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });

}