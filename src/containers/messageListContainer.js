import { connect } from 'react-redux'
import MessageList from '../components/messageList'

const mapStateToProps = (state) => {
    return {    
        messages: state.messages,
        userName: state.userName,
        text: state.text,
        own: state.own
    };
}

const MessageListComponent = connect(mapStateToProps)(MessageList)

export default MessageListComponent