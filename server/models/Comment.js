import { Schema } from 'mongoose'

const Comment = new Schema({
  body: { type: String, required: true },
  creatorId: { type: String, required: true },
  postId: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('post', {
  localField: 'psotId',
  ref: 'Post',
  foreignField: '_id',
  justOne: 'true'
})

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Comment
