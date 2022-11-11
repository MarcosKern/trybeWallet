import React, { Component } from 'react';
import '../css/infoMenu.css';

const MS_3 = 300;

export default class Infos extends Component {
  state = {
    infosShow: false,
    classEx: 'hidde',
    isHidden: true,
  };

  enterEvent = () => {
    this.setState({
      infosShow: true,
      classEx: 'show',
    }, () => {
      setTimeout(() => this.setState({ isHidden: false }), MS_3);
    });
  };

  outEvent = () => {
    this.setState({
      infosShow: false,
      classEx: 'hidde',
    }, () => {
      setTimeout(() => this.setState({ isHidden: true }), MS_3);
    });
  };

  render() {
    const { infosShow, classEx, isHidden } = this.state;

    return (
      <div
        className={ `infoMenu ${classEx}` }
        onMouseEnter={ this.enterEvent }
        onMouseLeave={ this.outEvent }
      >
        {
          infosShow
            ? (
              <section
                className="infoBanner"
                hidden={ isHidden }
              >
                {/* <img
                  src="https://media-exp1.licdn.com/dms/image/C4D16AQG0AKgsUNx6XA/profile-displaybackgroundimage-shrink_350_1400/0/1655923196585?e=1671667200&v=beta&t=QGXmMqFvWhJm34q6LWxiXUurBfjYtdHEx9EQgLLWqaw"
                  alt="banner"
                  className="lkdBanner"
                />
                <img
                  src="https://media-exp1.licdn.com/dms/image/C4E03AQHnQfKGlgoMUA/profile-displayphoto-shrink_200_200/0/1643077620535?e=1671667200&v=beta&t=HEDC7w8WqPsjhF1bRQcdy3mLMITUuspfnngnGKnzByE"
                  alt="profile"
                  className="lkdPhoto"
                /> */}
              </section>
            )
            : (
              <span
                className="questionMark"
                hidden={ !isHidden }
              >
                ?
              </span>
            )
        }
      </div>
    );
  }
}
