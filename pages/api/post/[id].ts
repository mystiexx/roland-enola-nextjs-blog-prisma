import { Post } from '.prisma/client';
import prisma from '../../../lib/prisma'

export default async function handle(req: { query: { id: any; }; method: string; }, res: { json: (arg0: Post) => void; } ) {
    const postId = req.query.id;
    if ( req.method === 'DELETE') {
        const post = await prisma.post.delete({
            where: {
                id: Number(postId)
            },
        })
        res.json(post)
    } else {
        throw new Error (
            `The HTTP ${req.method} method is not supported by this route.`
        )
    }
}