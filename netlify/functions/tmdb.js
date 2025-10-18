import fetch from 'node-fetch';

export async function handler(event) {
    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'TMDB_API_KEY is missing '})
        }
    }

    const { path = '/movie/popular', ...otherParams } = event.queryStringParameters || {}

    const cleanPath = path.startsWith('/') ? path : `/${path}`

    const urlParams = new URLSearchParams({
        api_key: API_KEY,
        ...otherParams,
    })

    const url = `https://api.themoviedb.org/3${cleanPath}?${urlParams.toString()}`
    
    console.log('TMDB URL: ', url)

    try {
        const response = await fetch(url)
        const data = await response.json()

        console.log('TMDB Request URL: ', url)
        console.log('TMDB Status: ', response.status)
        console.log('TMDB Raw Data: ', data)

        if (!response.ok) {
            console.error('TMDB API Error:', data);
            return {
            statusCode: response.status,
            body: JSON.stringify({
                error: 'TMDB API returned an error',
                details: data,
            }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        console.error('Error fetching TMDB data: ', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching TMDB data', details: error.message })
        }
    }
}