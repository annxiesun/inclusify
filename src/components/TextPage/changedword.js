import React, { Component } from "react";
import "./textpage.css";
import Popover from "@material-ui/core/Popover";

class ChangedWord extends React.Component {
  constructor() {
    super();
    //props: original_word, synonym list

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.changeWord = this.changeWord.bind(this);

    this.state = {
      menuOpen: false,
      selected: -1,
      anchorEl: null,
    };
  }

  openMenu(e) {
    this.setState({ menuOpen: true, anchorEl: e.target });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // changes display of word and the raw value of the text in TextPage
  changeWord(e) {
    this.setState({ selected: e.target.value });
    this.props.replaceWord(
      this.props.index,
      this.props.synonyms[e.target.value]
    );
  }

  render() {
    let word;
    
    if (this.state.selected == -1) {
      word = this.props.original_word;
    } else {
      word = this.props.synonyms[this.state.selected];
    }

    let synonym_buttons = [];

    if (this.props.synonyms.length == 0) {
      synonym_buttons.push(
        <p style={{ maxWidth: "150px", marginBlockEnd: "0px" }}>
          This word may be inappropriate or insensitive.
        </p>
      );
    } else {
      for (let i = 0; i < this.props.synonyms.length; i++) {
        synonym_buttons.push(
          <button className="choose-btn" onClick={this.changeWord} value={i}>
            {this.props.synonyms[i]}
          </button>
        );
      }
    }
    
    // console.log("synoym length:" ,synonym_buttons.length);
    // console.log(synonym_buttons[0].props.children)

    return (
      <span>
        <Popover
          onClose={this.closeMenu}
          open={this.state.menuOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <div className="word-menu">
            {synonym_buttons.length == 0 ? (
              <span className="warning">Sensitive word no alternative</span>
            ) : (
              <div className="btn-con">{synonym_buttons}</div>
            )}
            {(synonym_buttons[0].props.children !== "This word may be inappropriate or insensitive.") && <button
              className="choose-btn revert-btn"
              onClick={() => {
                this.setState({ selected: -1 });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </button>}
          </div>
        </Popover>
        <button
          onClick={this.openMenu}
          className={
            this.state.selected == -1
              ? "word-btn original-word"
              : "word-btn changed-word"
          }
        >
          {word}
        </button>
      </span>
    );
  }
}

export default ChangedWord;
