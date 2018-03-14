import React from 'react';
import Message from './message';

export default class MessageList extends React.PureComponent {
    componentDidUpdate(prevProps, prevState) 
    {
        if (this.props.messages.size > prevProps.messages.size) {
            this.container.scrollTop = this.container.scrollHeight;
        }
    };

    render() {
        const { messages } = this.props;

        return (
            <div className="chatArea" ref={e => this.container = e}>
                <ul className="messages">
                    {messages && messages.map(message => 
                        <Message key={message.id} {...message} />
                    )}
                </ul>
            </div>
        );
    }
}