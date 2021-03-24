import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'

class CommentsService {
  async getComments(query) {
    return await dbContext.Comments.find(query).populate('creator', 'name id')
  }

  async createComment(body) {
    return await dbContext.Comments.create(body)
  }

  async editComment(body) {
    const newComment = await dbContext.Comments.findByIdAndUpdate({ id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!newComment) {
      throw new BadRequest('This is NOT your Note or this is an invalid Id')
    }
    return newComment
  }

  async deleteComment(id) {
    const comment = await dbContext.Comments.findByIdAndDelete(id)
    // @ts-ignore
    if (!comment) {
      throw new UnAuthorized('Cannot delete another persons comment')
    }
    return 'Deleted Comment Successfully'
  }
}

export const commentsService = new CommentsService()
