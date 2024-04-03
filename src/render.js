import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {addPost} from "./redux/state";

const root = ReactDOM.createRoot(document.getElementById('root'));
export function rendApp(state){
    root.render(
        <React.StrictMode>
            <App appState={state} addPost={addPost}/>
        </React.StrictMode>
    );
}