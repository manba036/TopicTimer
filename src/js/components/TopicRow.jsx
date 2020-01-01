import React from "react";
import PropTypes from "prop-types";
import TopicConstants from "../constants/TopicConstants";
import Controller from "./Controller.jsx";
import Topic from "../utils/topic";

class TopicRow extends React.Component {
  render() {
    var topic = this.props.topic;
    var over = topic && topic.remain.isOver() ? "over" : "";
    return (
      <tr className="topic">
        <td>
          <Controller
            topic={topic}
            total={this.props.topics.find(
              topic => topic.description === TopicConstants.total_label
            )}
          />
        </td>
        <td className="time" onClick={this.props.edit}>
          {topic.entire.toString()}/
          <span className={over}>
            {topic.elapsed.toString()}/{topic.remain.toString()}
          </span>
        </td>
        <td className="description" onClick={this.props.edit}>
          <span className={over}>{topic.description}</span>
        </td>
      </tr>
    );
  }
}

TopicRow.propTypes = {
  topic: PropTypes.instanceOf(Topic).isRequired,
  topics: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired
};

export default TopicRow;
