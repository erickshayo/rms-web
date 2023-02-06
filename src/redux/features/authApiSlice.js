import { apiSlice } from "../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const authRegApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: "/auth/register",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
})


export const {
    useLoginMutation
} = authApiSlice;


export const AddDetailsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addDetails: builder.mutation({
            query: credentials => ({
                url: "/app/addCitizen",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
})


export const {
    useAddDetailsMutation
} = AddDetailsApiSlice;

export const {
    useRegisterMutation
} = authRegApiSlice;


export const getWilayaApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        wilayas: builder.mutation({
            query: credentials => ({
                url: "/app/getWilaya",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
})


export const {
    useWilayasMutation
} = getWilayaApiSlice;