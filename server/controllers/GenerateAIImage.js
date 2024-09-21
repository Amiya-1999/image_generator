import * as dotenv from 'dotenv';
import { createError } from '../error.js';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

// Setup OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAI = new OpenAIApi(configuration);

// Controller to generate image
export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const response = await openAI.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const generatedImage = response.data.data[0].b64_json;
        // const generatedImage = 'https://cdnb.artstation.com/p/assets/images/images/010/222/085/large/jia-hao-2017-wateryzard-comp-01.jpg?1523266603';
        return res.status(200).json({
            photo: generatedImage
        });
    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error.message));
    }
}