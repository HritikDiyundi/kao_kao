import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    handlePut(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { tweetId } = req.query;
  const { userId } = req.body;
  try {
    const response = await axios.post(
      `${process.env.API_LINK}/tweet/like/${tweetId}` as string,
      userId
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
