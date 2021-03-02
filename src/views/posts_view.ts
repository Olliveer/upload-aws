import Post from "../models/Post";

export default {
    //   render(user: User) {
    //     return {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email
    //     };
    //   },

    renderMany(posts: Post[]) {
        return posts.map((post) => this.render(post));
    },
};
