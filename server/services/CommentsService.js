import { dbContext } from '../db/DbContext'

class CommentsService {
  async getComments(query) {
    return await dbContext.Comments.find(query).populate('creator', 'name id')
  }
}

export const commentsService = new CommentsService()
