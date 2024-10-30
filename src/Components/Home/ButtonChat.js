import { useState } from 'react';
import MainChatBot from './MainChatbot';
import '../../Stylesheet/Home/ChatBot.css';

const ButtonChat = () => {
    const [showChatBot, setShowChatBot] = useState(false);

    const toggleChatBot = () => {
        setShowChatBot(!showChatBot);
    }

    return (
        <>
            <button onClick={toggleChatBot} className="chatbot-button">
                <img src="/media/picture/cb.png" alt="Abrir ChatBot" />
            </button>
            {showChatBot && (
                <div className='ChatBot'>
                    <MainChatBot />
                </div>
            )}
        </>
    );
}

export default ButtonChat;