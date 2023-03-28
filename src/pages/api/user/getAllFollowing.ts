import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  try {
    const response = await axios.get(
      `${process.env.API_LINK}/user/followings/${email}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
