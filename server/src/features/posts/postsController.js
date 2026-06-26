import { createPost, findAllPosts, findPostById } from "./postsModels.js";

const parsePostId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const validatePost = (body) => {
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();

    if (!title) return { error: "Post title is required" };
    if (title.length > 150) return { error: "Post title must be 150 characters or fewer" };
    if (!content) return { error: "Post content is required" };
    if (content.length > 10000) return { error: "Post content must be 10000 characters or fewer" };

    return {
        post: {
            title,
            content,
        },
    };
};

export const getPosts = async (_req, res) => {
    try {
        const posts = await findAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const id = parsePostId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await findPostById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addPost = async (req, res) => {
    try {
        const { post, error } = validatePost(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        const createdPost = await createPost({
            userId: req.auth.userId,
            ...post,
        });

        res.status(201).json({
            message: "Post created successfully",
            post: createdPost,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
