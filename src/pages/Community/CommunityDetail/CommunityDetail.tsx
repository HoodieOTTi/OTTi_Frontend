// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../../libs/AxiosInstance';
// import * as S from './CommunityDetail.Style';
// import CommunityPost from '../../../components/Community/CommunityPost/CommunityPost';
// import AddComment from '../../../components/Community/Comment/AddComment';
// import CommentList from '../../../components/Community/Comment/CommentList';
// import JoinBtn from '../../../components/common/JoinBtn/JoinBtn';
// import NewTopBar from '../../../components/TopBar/NewTopBar';

// interface CommentUserInfo {
//   userName: string;
//   userprofilePhotoUrl: string;
// }

// interface Comment {
//   id: number;
//   text: string;
//   createdDate: string;
//   userInfo: CommentUserInfo;
// }

// interface Post {
//   id: number;
//   username: string;
//   createdAt: string;
//   title: string;
//   content: string;
//   potId: number;
//   comments: Comment[];
// }

// const defaultProfileImage =
//   'https://otti-bucket-2024.s3.ap-northeast-2.amazonaws.com/otti-image/otti.png';

// const CommunityDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [post, setPost] = useState<Post | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const postId = Number(id);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/post/${postId}`);
//         setPost(response.data);
//         setComments(response.data.comments || []);
//       } catch (error) {
//         console.error('Failed to fetch post', error);
//       }
//     };

//     if (postId) {
//       fetchPost();
//     }
//   }, [postId]);

//   const handleAddComment = async (content: string) => {
//     try {
//       const response = await axiosInstance.post('/api/post/comment', {
//         text: content,
//         post: postId,
//       });

//       const newComment: Comment = {
//         id: response.data.id,
//         text: response.data.text,
//         createdDate: response.data.createdDate,
//         userInfo: {
//           userName: response.data.userName.userName,
//           userprofilePhotoUrl:
//             response.data.userName.userprofilePhotoUrl || defaultProfileImage,
//         },
//       };

//       setComments([...comments, newComment]);
//     } catch (error) {
//       console.error('Failed to add comment', error);
//     }
//   };

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <S.Container>
//       <S.TitleWrapper>
//         <NewTopBar title="커뮤니티" />
//       </S.TitleWrapper>
//       <S.PageWrapper>
//         <S.CommunityPostWrapper>
//           <CommunityPost postId={postId} />
//           <JoinBtn potId={post.potId} />
//         </S.CommunityPostWrapper>
//         <CommentList comments={comments} />

//         <AddComment postId={postId} onAddComment={handleAddComment} />
//       </S.PageWrapper>
//     </S.Container>
//   );
// };

// export default CommunityDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../libs/AxiosInstance';
import * as S from './CommunityDetail.Style';
import CommunityPost from '../../../components/Community/CommunityPost/CommunityPost';
import AddComment from '../../../components/Community/Comment/AddComment';
import CommentList from '../../../components/Community/Comment/CommentList';
import JoinBtn from '../../../components/common/JoinBtn/JoinBtn';
import NewTopBar from '../../../components/TopBar/NewTopBar';

interface CommentUserInfo {
  userName: string;
  userprofilePhotoUrl: string;
}

interface Comment {
  id: number;
  text: string;
  createdDate: string;
  userInfo: CommentUserInfo;
}

interface Post {
  id: number;
  username: string;
  createdAt: string;
  title: string;
  content: string;
  potId: number;
  comments: Comment[];
}

const defaultProfileImage =
  'https://otti-bucket-2024.s3.ap-northeast-2.amazonaws.com/otti-image/otti.png';

const CommunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const postId = Number(id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/post/${postId}`);
        console.log('Post data:', response.data);
        setPost(response.data);
        setComments(response.data.comments || []);

        // Log each comment to verify the data
        response.data.comments?.forEach((comment: Comment) => {
          console.log('Comment:', comment);
          console.log('Username:', comment.userInfo.userName);
          console.log('Profile URL:', comment.userInfo.userprofilePhotoUrl);
        });
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleAddComment = async (content: string) => {
    try {
      const response = await axiosInstance.post('/api/post/comment', {
        text: content,
        post: postId,
      });

      const newComment: Comment = {
        id: response.data.id,
        text: response.data.text,
        createdDate: response.data.createdDate,
        userInfo: {
          userName: response.data.userName.userName,
          userprofilePhotoUrl:
            response.data.userName.userprofilePhotoUrl || defaultProfileImage,
        },
      };

      console.log('New Comment:', newComment);
      setComments([...comments, newComment]);

      // Log updated comments array after adding a new comment
      console.log('Updated Comments:', [...comments, newComment]);
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <S.TitleWrapper>
        <NewTopBar title="커뮤니티" />
      </S.TitleWrapper>
      <S.PageWrapper>
        <S.CommunityPostWrapper>
          <CommunityPost postId={postId} />
          <JoinBtn potId={post.potId} />
        </S.CommunityPostWrapper>
        <CommentList comments={comments} />
        <AddComment postId={postId} onAddComment={handleAddComment} />
      </S.PageWrapper>
    </S.Container>
  );
};

export default CommunityDetail;
