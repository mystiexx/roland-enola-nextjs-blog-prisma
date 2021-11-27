import { Post } from '.prisma/client';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle( req: any, res: any  ) {

  const { title, content } = req.body;

  const session = await getSession( { req } );

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
}