import { Server, Socket } from "socket.io";
import { Post } from "@repo/db";

export const registerPostEvents = (io: Server, socket: Socket) => {
    // Only one change stream listener is needed per server instance, 
    // but here we keep it simple or check if it's already listening.
    // For a cleaner implementation, this might live in a separate service.
};

// Singleton change stream listener
let changeStreamActive = false;

export const initPostChangeStream = (io: Server) => {
    if (changeStreamActive) return;

    console.log("Initializing Post Change Stream...");

    try {
        // Watch the Post collection
        const changeStream = Post.watch();

        changeStream.on("change", async (change) => {
            if (change.operationType === "insert") {
                try {
                    const postId = change.fullDocument._id;

                    // Populate author fields just like in the API
                    const populatedPost = await Post.findById(postId)
                        .populate("author", "fullName email studentId");

                    if (populatedPost) {
                        console.log("Broadcasting new post:", postId);
                        io.emit("new-post", populatedPost);
                    }
                } catch (error) {
                    console.error("Error in Post change stream:", error);
                }
            }
        });

        changeStreamActive = true;
    } catch (error) {
        console.error("Post change stream disabled:", error);
    }
};
