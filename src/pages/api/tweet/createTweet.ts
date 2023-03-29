import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    handlePost(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { reference, author } = req.body;
  try {
    const response = await axios.post(
      `${process.env.API_LINK}/tweet/add` as string,
      {
        reference,
        author,
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
