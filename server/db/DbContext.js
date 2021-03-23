import mongoose from 'mongoose'
import PostSchema from '../models/Post'
import CommentSchema from '../models/Comment'
import AccountSchema from '../models/Account'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
