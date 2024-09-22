import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './button'
import TextInput from './TextInput'
import { AutoAwesomeTwoTone, CreateRounded } from '@mui/icons-material'
import { createPost, generateImage } from '../api'
import { useNavigate } from 'react-router-dom';

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
`;

const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`;

function GenerateImageForm({ post, setPost, generateImgLoading, setGenerateImgLoading,
    createPostLoading, setCreatePostLoading, setIsErrorMsg }) {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const generateImageFunc = async () => {
        setGenerateImgLoading(true);
        await generateImage({ prompt: post.prompt })
        .then((res) => {
            // setTimeout(() => {
            //     setPost({...post, photo: `${res?.data?.photo}`});
            //     setGenerateImgLoading(false);
            // }, 5000);

            setPost({...post, photo: `data:image/jpge;base64, ${res?.data?.photo}`});
            setGenerateImgLoading(false);
        }).catch((error) => {
            const startIndex = error?.response?.data?.indexOf('<pre>');
            const lastIndex = error?.response?.data?.indexOf('</pre>');
            setError(error?.response?.data?.message || error?.response?.data?.slice(startIndex + 5, lastIndex));
            setGenerateImgLoading(false);
            setIsErrorMsg(true);
        });
    }

    const createPostFunc = async () => {
        setCreatePostLoading(true);
        await createPost(post)
        .then((res) => {
            setCreatePostLoading(false);
            navigate('/');
        }).catch((error) => {
            const startIndex = error?.response?.data?.indexOf('<pre>');
            const lastIndex = error?.response?.data?.indexOf('</pre>');
            setError(error?.response?.data?.message || error?.response?.data?.slice(startIndex + 5, lastIndex));
            setCreatePostLoading(false);
            setIsErrorMsg(true);
        });
    }

    const handleChange = (e) => {
        setPost({ ...post, prompt: e.target.value}); 
            if(e.target.value === '') {
                setError('');
                setIsErrorMsg(false);
            }
    }


    return (
        <Form>
            <Top>
                <Title>Generate Image with Prompt</Title>
                <Desc>Write your prompt according to the image you want to generate</Desc>
            </Top>
            <Body>
                <TextInput
                    label='Author'
                    placeholder='Enter Your Name'
                    name='name'
                    value={post.author}
                    handelChange={(e) => setPost({ ...post, author: e.target.value })}
                />
                <TextInput
                    label='Image Prompt'
                    placeholder='Write a detailed prompt about the image . . .'
                    name='prompt'
                    rows='8'
                    textArea
                    value={post.prompt}
                    handelChange={handleChange}
                />
                {(error && post.prompt !== '') && <div style={{color: 'red'}}>
                    <p><em>Sorry! We are not able to generate your requested image at this moment due to the reason below</em></p>
                    <p><strong>{error}</strong></p>
                </div>}
                ** You can post the AI Generated Image to the Community **
            </Body>
            <Actions>
                <Button
                    text='Generate Image'
                    flex
                    leftIcon={<AutoAwesomeTwoTone />}
                    isLoading={generateImgLoading}
                    isDisabled={post.prompt === ''}
                    onClick={() => generateImageFunc()}
                />
                <Button
                    text='Post Image'
                    flex
                    type='secondary'
                    leftIcon={<CreateRounded />}
                    isLoading={createPostLoading}
                    isDisabled={post.author === '' || post.prompt === '' || post.photo === ''}
                    onClick={() => createPostFunc()}
                />
            </Actions>
        </Form>
    )
}

export default GenerateImageForm