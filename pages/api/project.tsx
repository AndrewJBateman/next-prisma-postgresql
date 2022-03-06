import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return;

  const { name, value, country } = req.body;
  if (!name || !value) {
    res.statusCode = 400;
    res.json({
      error: "name & value are required.",
    });
  }

  const project = await prisma.project.create({
    data: {
      // projectId: projectId,
      name: name,
      value: +value,
      country: country,
    },
  });
  res.statusCode = 200;
  res.json({ project: project });
};
