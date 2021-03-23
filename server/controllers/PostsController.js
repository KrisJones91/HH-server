import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { commentsService } from '../services/CommentsService'
export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('/', this.getAllPosts)
      .get('/:id/comments')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .post('/', this.createPost)
      .put('/:id', this.editPost)
      .delete('/:id', this.deletePost)
  }

  async getAllPosts(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const posts = await postsService.getAll()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await postsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      return res.send(await commentsService.getComments({ postId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await postsService.createPost(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await postsService.editPost(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      await postsService.deletePost(req.params.id, req.userInfo.email)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
