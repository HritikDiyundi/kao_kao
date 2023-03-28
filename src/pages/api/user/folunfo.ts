import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    handlePost(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { followerId, userId } = req.query;
    const response = await axios.put(
      `${process.env.API_LINK}/user/follow/${userId}/${followerId}` as string
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
