import OpenAI from 'openai'
import 'dotenv/config'

const openai = new OpenAI({apiKey: process.env.OPEN_API_KEY, dangerouslyAllowBrowser: true})
const AI = async(data)=>{
    const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: 'your are an AI answer best as u can' },
        { role: 'user', content: data}
    ],
    })
    return results.choices[0].message;

}

export default AI;


