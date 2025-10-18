import fetch from 'node-fetch';

export async function handler(event) {
    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'TMDB_API_KEY is missing '})
        }
    }

    const params = event.queryStringParameters
    const path = params.path || '/movie/popular'
    const language = params.language || 'en-US'

    const url = `https://api.themoviedb.org/3${path}?api_key=${API_KEY}&language=${language}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching TMDB data' })
        }
    }
}