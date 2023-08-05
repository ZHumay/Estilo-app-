import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { PostsContextProvider } from './context/PostContext';
import { ActiveUserContextProvider } from './context/activeUserContext';
import { UsersContextProvider } from './context/UserContext';
import { SearchResultContextProvider } from './context/SearchResultContext';
import { CommentsContextProvider } from './context/CommentContext';
import store from './store/rootReducer';
import { Provider } from 'react-redux';
import { BasketContextProvider, BasketProvider } from './context/BasketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PostsContextProvider>
      <ActiveUserContextProvider>
        <UsersContextProvider>
          <SearchResultContextProvider>
            <CommentsContextProvider>
            <BasketContextProvider>
              <Provider store={store}>
               <App />
              </Provider>
              </BasketContextProvider>
            </CommentsContextProvider>
          </SearchResultContextProvider>
        </UsersContextProvider>
      </ActiveUserContextProvider>
    </PostsContextProvider>
  </BrowserRouter>
);
