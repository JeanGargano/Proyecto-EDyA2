import PostModel from '../../models/PostModel.js';
import InfoModel from '../../models/InfoModel.js';

// Función para obtener posts junto con la foto de perfil de cada usuario, comentario y respuesta
export const getPostsWithUserProfilePictures = async () => {
    try {
        // Obtener todos los posts con los comentarios y respuestas
        const posts = await PostModel.find().sort({ createdAt: -1 }).lean();

        // Obtener todos los firebaseUids de los usuarios que han hecho posts, comentarios y respuestas
        const userIds = new Set();
        posts.forEach(post => {
            userIds.add(post.user); // autor del post
            post.comments.forEach(comment => {
                userIds.add(comment.user); // autor del comentario
                comment.replies.forEach(reply => {
                    userIds.add(reply.user); // autor de la respuesta
                });
            });
        });

        // Convertir el Set a un array y buscar los UserInfo
        const userInfoArray = await InfoModel.find({ firebaseUid: { $in: Array.from(userIds) } });
        const userInfoMap = userInfoArray.reduce((acc, userInfo) => {
            acc[userInfo.firebaseUid] = userInfo.userProfilePath;
            return acc;
        }, {});

        // Asignar las fotos de perfil a los posts, comentarios y respuestas
        for (const post of posts) {
            post.userProfilePath = userInfoMap[post.user] || null; // foto de perfil del autor del post

            for (const comment of post.comments) {
                comment.userProfilePath = userInfoMap[comment.user] || null; // foto de perfil del autor del comentario

                for (const reply of comment.replies) {
                    reply.userProfilePath = userInfoMap[reply.user] || null; // foto de perfil del autor de la respuesta
                }
            }
        }

        return posts;
    } catch (error) {
        throw new Error("No se pudo obtener la información de los posts.");
    }
};
