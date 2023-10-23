import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import {ListRequest, VerseInsertRequest, VerseUpdateRequest} from "@/app/lib/types/requests"
import {getRuntimeConfig} from "@/app/utils/runtimeConfig"
import {PageFilter, Verse} from "@/app/lib/types/interfaces"

const baseUrl = getRuntimeConfig().HOST

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
        
        const additionalHeaders = {
            accept: 'application/json',
            'content-type': 'application/json',
            // ...(accessToken !== undefined && { Authorization: `Bearer ${accessToken}` }),
        }
        
        Object.entries(additionalHeaders).forEach(([key, value]) => {
            if (value !== undefined) {
                headers.set(key, value)
            }
        })
        
        return headers
    },
})

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions)
    
    if (result.error && result.error.status === 401) {
        console.log('접근 권한 없음')
    }
    
    return result
}

export const verseApi = createApi({
    reducerPath: "verseApi",
    refetchOnFocus: true,
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        list: builder.query<Verse[], ListRequest>({
            query: body => ({
                body,
                method: "POST",
                url: '/listVerse'
            })
        }),
        insert: builder.query<any, VerseInsertRequest>({
            query: body => ({
                body,
                method: "POST",
                url: '/insertVerse'
            })
        }),
        update: builder.query<any, VerseUpdateRequest>({
            query: body => ({
                body,
                method: "POST",
                url: '/updateVerse'
            })
        }),
        delete: builder.query<any, string>({
            query: id => ({
                method: "GET",
                url: `/deleteVerse/${id}`
            })
        }),
        increment: builder.query<Verse, string>({
            query: id => ({
                method: "GET",
                url: `/increment/${id}`,
            })
        })
    }),
});

export const {} = verseApi;
