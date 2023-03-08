import { NewBlog as NewBlogEvent } from "../generated/BlogFactory/BlogFactory"
import { NewPost as NewPostEvent } from "../generated/templates/Blog/Blog"
import { NewBlog, NewPost } from "../generated/schema"
import { Blog } from "../generated/Templates"

export function handleNewBlog(event: NewBlogEvent): void {
  let entity = new NewBlog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  Blog.create(event.params.blogAddr);

  entity.owner = event.params.owner
  entity.blogAddr = event.params.blogAddr
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPost(event: NewPostEvent): void {
  let entity = new NewPost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner;
  entity.postAddr = event.params.post;
  entity.URI = event.params.URI;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

