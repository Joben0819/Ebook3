// import { Domain, gameapp, platform } from "@/game-99-interface/api";
// import { TFooterMenuItem } from "@/game-99-interface/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const footerApi = createApi({
  reducerPath: "footerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8000/`,
  }),
  endpoints: (builder) => ({
    getData: builder.mutation<any, any>({
      query: (body) => ({
        url: "get_data",
        headers: { token: localStorage.getItem("token")?.toString() },
        method: "Get",
        body,
      }),
    }),
  }),
});
export const { useGetDataMutation } = footerApi;
