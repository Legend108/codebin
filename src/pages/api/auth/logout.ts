import { NextApiResponse } from "next";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	req.session.destroy();

	res.redirect(req.headers.referer! || "/login");
};

export default withSession(handler);
