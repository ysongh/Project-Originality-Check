import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export const getAttestation = async (eas) => {
  const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";

  const attestation = await eas.getAttestation(uid);

  console.log(attestation);
}

export const createOnchainAttestations = async (eas) => {
  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
  ]);
  
  const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
  
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xaa90e02e88047232288D01Fe04d846e8A4Cc88dd",
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  
  const newAttestationUID = await tx.wait();
  
  console.log("New attestation UID:", newAttestationUID);
}

export const createOffchainAttestations = async (eas, signer) => {
  const offchain = await eas.getOffchain();

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
  ]);
  
  const offchainAttestation = await offchain.signOffchainAttestation({
    recipient: '0xaa90e02e88047232288D01Fe04d846e8A4Cc88dd',
    // Unix timestamp of when attestation expires. (0 for no expiration)
    expirationTime: 0,
    // Unix timestamp of current time
    time: 1671219636,
    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
    version: 1,
    nonce: 0,
    schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
    refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
    data: encodedData,
  }, signer);
  console.log(offchainAttestation);
}