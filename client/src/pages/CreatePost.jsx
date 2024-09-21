import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/GenerateImageForm';
import GeneratedImageCard from '../components/GeneratedImageCard';

const Container = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.bg};
    overflow-y: scroll;
    padding: 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 768px) {
        padding: 6px 10px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
    max-width: 1200px;
    gap: 8%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
`;

function CreatePost() {

  const [generateImgLoading, setGenerateImgLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    author: '',
    prompt: '',
    photo: ''
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm post={post} setPost={setPost} generateImgLoading={generateImgLoading}
          setGenerateImgLoading={setGenerateImgLoading} createPostLoading={createPostLoading}
          setCreatePostLoading={setCreatePostLoading} />
        <GeneratedImageCard src={post.photo} loading={generateImgLoading} />
      </Wrapper>
    </Container>
  )
}

export default CreatePost