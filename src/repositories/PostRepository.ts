
import { EntityRepository, Repository } from "typeorm";
import Post from "../models/Post";

@EntityRepository(Post)
class PostRepository extends Repository<Post> { }

export default PostRepository;
