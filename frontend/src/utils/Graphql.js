const SCHEMA_UID = "0x064eb97ccf6aaf0f29030900e1244d8f04d218107c769627be6c6088a1b17916";

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
        data,
        schemaId,
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

export const getAttestationsBySchemaId = async () => {
  const query = `
    query Attestations {
      attestations(where: { schemaId: { equals: "${SCHEMA_UID}" } }) {
        id
        attester
        recipient
        refUID
        revocable
        revocationTime
        expirationTime
        data,
        schemaId,
        decodedDataJson,
      }
    }
  `;

  try {
    const response = await fetch('https://sepolia.easscan.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}