import React from 'react'

export default class Message extends React.PureComponent {
    render() {
      const { avatar, userName, text, own } = this.props;

        return (
            <li >
                <div >
                    <img src={avatar} alt="Avatar" height="64" width="64"/>
                    <div className="messageContent">
                        <span className="name">{userName}: </span> <br />
                        <span id="message" className={own ? "own" : ""}>{text} </span>
                    </div>
                </div>
            </li>
          );
    }
  }