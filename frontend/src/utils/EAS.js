import { SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

const SCHEMA_UID = "0x064eb97ccf6aaf0f29030900e1244d8f04d218107c769627be6c6088a1b17916";

export const getAttestation = async (eas) => {
  const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";

  const attestation = await eas.getAttestation(uid);

  console.log(attestation);
}

export const createOnchainAttestations = async (eas, title, description, url, image_url, tags) => {
  const schemaEncoder = new SchemaEncoder("string title,string description,string url,string image_url,string[] tags,uint248 date_created");
  const encodedData = schemaEncoder.encodeData([
    { name: "title", value: title, type: "string" },
    { name: "description", value: description, type: "string" },
    { name: "url", value: url, type: "string" },
    { name: "image_url", value: image_url, type: "string" },
    { name: "tags", value: tags, type: "string[]" },
    { name: "date_created", value: 1, type: "uint248" },
  ]);
  
  const schemaUID = SCHEMA_UID;
  
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000",
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  
  const newAttestationUID = await tx.wait();
  
  console.log("New attestation UID:", newAttestationUID);
}

export const createOffchainAttestations = async (eas, signer, title, description, url, image_url, tags) => {
  const offchain = await eas.getOffchain();

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("string title,string description,string url,string image_url,string[] tags,uint248 date_created");
  const encodedData = schemaEncoder.encodeData([
    { name: "title", value: title, type: "string" },
    { name: "description", value: description, type: "string" },
    { name: "url", value: url, type: "string" },
    { name: "image_url", value: image_url, type: "string" },
    { name: "tags", value: tags, type: "string[]" },
    { name: "date_created", value: 1, type: "uint248" },
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
    schema: SCHEMA_UID,
    refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
    data: encodedData,
  }, signer);
  console.log(offchainAttestation);
}

export const getSchemaInformation = async (provider) => {
  const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  schemaRegistry.connect(provider);

  const schemaUID = SCHEMA_UID;

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  console.log(schemaRecord);
}