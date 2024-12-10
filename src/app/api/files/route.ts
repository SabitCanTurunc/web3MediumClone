// // pages/api/uploadPinata.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import FormData from 'form-data';
// import fs from 'fs';
// import fetch from 'node-fetch';
// import path from 'path';

// const JWT = process.env.PINATA_JWT || '';  // Use environment variable for the JWT

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const form = new FormData();
//       const file = req.body.file;  // Assuming file is passed correctly (may need to use a package like `formidable` for file parsing)

//       // Add the file and metadata
//       form.append('file', fs.createReadStream(path.join(process.cwd(), 'public', file)));
//       form.append('pinataMetadata', JSON.stringify({
//         name: 'File name',
//       }));
//       form.append('pinataOptions', JSON.stringify({
//         cidVersion: 1,
//       }));

//       const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${JWT}`,
//         },
//         body: form,
//       });

//       if (!response.ok) {
//         throw new Error('Pinata upload failed');
//       }

//       const data = await response.json();
//       return res.status(200).json({ cid: data.IpfsHash }); // Or adjust according to your Pinata API response
//     } catch (error) {
//       return res.status(500).json({ error: 'Failed to upload to Pinata' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
