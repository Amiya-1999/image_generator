import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../Components/GenerateImageForm';
import GeneratedImageCard from '../Components/GeneratedImageCard';

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
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const [post, setPost] = useState({
    author: '',
    prompt: '',
    photo: ''
  });

  useEffect(() => {
    const wrapper = document.getElementById('error');
    if(wrapper) {
      if(isErrorMsg)
        wrapper.classList.add('error');
      else
        wrapper.classList.remove('error');
    }
  }, [isErrorMsg]);

  return (
    <Container>
      <Wrapper id='error'>
        <GenerateImageForm post={post} setPost={setPost} generateImgLoading={generateImgLoading}
          setGenerateImgLoading={setGenerateImgLoading} createPostLoading={createPostLoading}
          setCreatePostLoading={setCreatePostLoading} setIsErrorMsg={setIsErrorMsg} />
        <GeneratedImageCard src={post.photo} loading={generateImgLoading} />
      </Wrapper>
    </Container>
  )
}

export default CreatePost