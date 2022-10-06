import { type Registry } from "../types.ts";
import { MongoDbConnection } from "@hex/data/adapters/mongodb.ts";

interface Comment {
  _id: string;
  comment: string;
  metric_id: string;
  workspace_id: string;
}

const mongoAction = async (r: Registry) => {
  const db = await r.get<MongoDbConnection>("db");

  const commentRepository = db!.repository<Comment>("comments");

  const comments = await commentRepository.getAll();

  return comments;
};

export { mongoAction, mongoAction as default };
