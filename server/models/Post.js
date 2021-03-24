import { Schema } from 'mongoose'

const Post = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  img: { type: String, required: false },
  creatorId: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Post.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Post
