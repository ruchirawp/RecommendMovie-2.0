import React, { useState } from 'react';
import axios from 'axios';
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { baseUrl } from '../services/baseValues';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatRef = useRef(null);
    const chatEndRef = useRef(null);

    // const sendMessage = async () => {
    //     if (!input.trim()) return;

    //     const newMessages = [...messages, { text: input, sender: "user" }];
    //     setMessages(newMessages);
    //     setInput("");

    //     try {
    //         // const response = await axios.post(`${baseUrl}/chat/message`, { message: input });
    //         const response = await axios.post(`${baseUrl}/chat`, { message: input });
    //         setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    const sendMessage = async () => {
        if (!input.trim()) return;
      
        // Add user's message to local state
        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");
      
        // Prepare OpenAI-compatible message array (without system role)
        const openAIMessages = newMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));
      
        try {
          const response = await axios.post(`${baseUrl}/chat`, {
            messages: openAIMessages,
          });
      
          // Add assistant reply to message history
          setMessages([
            ...newMessages,
            { text: response.data.reply, sender: "bot" }, // or "assistant"
          ]);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      


    useEffect(() => {

        // console.log(chatEndRef.current);
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }    
    }, [messages]);  // Runs whenever messages update

    // Click outside handler
    useEffect(() => {

        const handleClickOutside = (event) => {            
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false); // Minimize chat when clicking outside
            }
        };

        // Attach event listener when chat is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="chat-container">
            {isOpen ? (
                <div ref={chatRef} className="chat-box">
                    <div className="chat-header">
                        <span>Got any movie/tv show questions?</span>
                        <FaTimes onClick={() => setIsOpen(false)} />
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                {msg.text}
                            </div>
                        ))}
                        <div id="invis" ref={chatEndRef} />  {/* Invisible div to auto-scroll */}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            ) : (
                <button className="chat-button" onClick={() => setIsOpen(true)}>
                    <FaCommentDots />
                </button>
            )}
        </div>
    );
};

export default ChatWidget;
