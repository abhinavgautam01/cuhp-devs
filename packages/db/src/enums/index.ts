export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum SubmissionResult {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  ACCEPTED = "ACCEPTED",
  WRONG_ANSWER = "WRONG_ANSWER",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  COMPILATION_ERROR = "COMPILATION_ERROR",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum ChatRoomName {
  ML = "Machine Learning",
  DL = "Deep Learning",
  DSA = "Data Structures & Algorithms",
  BLOCKCHAIN = "Blockchain",
}

export enum PostType {
  SNIPPET = "Snippet",
  QUESTION = "Question",
  WIN = "Win",
}