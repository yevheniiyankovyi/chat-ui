import React from 'react';
import { connect } from 'react-redux';
import { sendMessage, changeUserName, changeText, connectToSocket } from '../actions';

class SendMessage extends React.Component
{
    componentWillMount() {
        this.props.dispatch(connectToSocket());
    };

    render () {
        const { dispatch, avatar, userName, text } = this.props;

        return (
            <form onSubmit={ e => { 
                        e.preventDefault();
                        dispatch(sendMessage()); 
                    }}>
                <img src={avatar} alt="Avatar"/>
                <label> 
                    Name:
                    <input type="text" 
                           value={userName || ''} 
                           className={(userName === '') ? "error" : ''} 
                           onChange={ e => { 
                               dispatch(changeUserName(e.target.value)); 
                            }} />
                </label>
                <label> 
                    Text:
                    <input id="text" 
                           type="text" className={(text === '') ? "error" : ''} 
                           value={text || ''} 
                           onChange={e => { 
                               dispatch(changeText(e.target.value)); 
                            }} />
                </label>
                <button type="submit">
                    Send
                </button>
            </form>
        );
    }
}

const mapToProps = (state) => {
    return {    
        avatar: state.avatar,
        userName: state.userName,
        text: state.text
    };
}

export default connect(mapToProps)(SendMessage);