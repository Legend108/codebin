import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method == "POST") {
    const body = req.body;

    res.json({
        status: "done"
    });
  }
};

export default handler;
