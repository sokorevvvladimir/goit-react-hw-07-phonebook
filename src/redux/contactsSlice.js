import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://626a70a3737b438c1c48572f.mockapi.io/',
  }),
  tagTypes: ['Contact'],
  endpoints: build => ({
    getContactsByName: build.query({
      query: name => `contacts/?name=${name}`,
    }),
    getAllContacts: build.query({
      query: () => 'contacts',
      providesTags: ['Contact'],
    }),
    deleteContact: build.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    createContact: build.mutation({
      query: newContact => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsByNameQuery,
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
} = contactsApi;
