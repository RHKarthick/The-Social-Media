import Post from "../models/posts.js";

//CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await Post.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePAth: user.picturePath,
      picturePAth,
      likes:{},
      comments: []
    })
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//READ
export const getFeedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.findById(userId);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//UPDATE
export const likePost = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;
    const post = await Post.findById(id);
    const isLiked = await post.likes.get(userId);
    if(isLiked){
      post.likes.get(userId);
    }else{
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {likes: post.likes},
      {new: true}
    )
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
