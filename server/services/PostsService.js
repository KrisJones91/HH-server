/* eslint-disable eqeqeq */
import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'
class PostsServie {
  async getAll(query = {}) {
    return await dbContext.Posts.find(query).populate('creator', 'name id')
  }

  async getOne(id) {
    const Post = await dbContext.Posts.findById(id).populate('creator', 'name id')
    if (!Post) {
      throw new BadRequest('Sorry, post not found with that id')
    }
    return Post
  }

  async createPost(body) {
    return await dbContext.Posts.create(body)
  }

  async editPost(body) {
    const updated = await dbContext.Posts.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body)
    if (!updated) {
      throw new BadRequest('Invalid Id')
    }
    return updated
  }

  async deletePost(id, email) {
    const post = await this.getOne(id)
    // @ts-ignore
    if (post.creatorEmail != email) {
      throw new UnAuthorized('Cannot delete another persons post')
    }
    await dbContext.Posts.findByIdAndDelete(id)
    return 'Deleted Post Successfully'
  }
}

export const postsService = new PostsServie()
