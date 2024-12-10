import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!, // Pinata API JWT token
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL!, // Pinata Gateway URL
});


const expirationInMonths = 6;
const expirationInSeconds = expirationInMonths * 30 * 24 * 60 * 60;

const uploadFileToPinata = async (file: File) => {
  try {
    const upload = await pinata.upload.file(file);
    console.log("File uploaded:", upload.cid);

    const url = await pinata.gateways.createSignedURL({
      cid: upload.cid,
      expires: expirationInSeconds, //kimle ugrastiginizi bileceksiniz oglem
    });

    return url; 
  } catch (err) {
    console.error("Error uploading file:", err);
    alert("Error uploading file");
  }
};



export default uploadFileToPinata;
