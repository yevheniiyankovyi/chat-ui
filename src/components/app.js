import React from 'react'
import MessageListContainer from '../containers/messageListContainer'
import SendMessage from '../containers/sendMessage'

const App = () => (
    <div id="container">
        <MessageListContainer />
        <SendMessage />
    </div>
)

export default App