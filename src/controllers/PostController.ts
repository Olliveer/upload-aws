import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import PostRepository from '../repositories/PostRepository';
import postsView from '../views/posts_view';

interface MulterFile {
    key?: string;
    location?: string;
}

class PostController {
    async index(req: Request, res: Response) {
        const postsRepository = getCustomRepository(PostRepository);

        const images = await postsRepository.find();

        res.json(images);
    }

    async store(req: Request & { file: MulterFile }, res: Response) {
        console.log(req.file);
        const { originalname: name, size, key, location: url = '' } = req.file;

        const postsRepository = getCustomRepository(PostRepository);

        // const post = await postsRepository.find();

        // if (post) {
        //     throw new AppError('post already exists');
        // }

        const image = postsRepository.create({ name, size, key, url });

        await postsRepository.save(image);

        res.status(201).json(image)

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
console.log(req.params)
        const postsRepository = getCustomRepository(PostRepository);

        const post = await postsRepository.findOne(id);

        if (!post) {
            throw new AppError('Post does not exists');
        }

        await postsRepository.remove(post);

        return res.json({message: 'Post removed'})
    }
}

export default PostController;