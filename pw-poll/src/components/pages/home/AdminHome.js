import React from "react";
import Card from "./../../card/Card";

export default function AdminHome() {
  return (
    <div className="page-container">
      <Card title="Welcome">
        Welcome to Poll W! This site allows you to create polls for PW students.
        You can control which class(es) can vote in the poll, when the poll
        starts and ends, and, of course, the questions that are asked.
        <br /> <br />
        As an admin, you can see all of the polls, and edit them on the Polls
        page. Keep reading for information on how to create and edit polls.
      </Card>
      <Card title="Instructions">
        <div className="subtitle">General</div>
        The Polls page is the place to go to create and edit polls and
        questions. You can select a poll on the left by clicking on it. This
        will cause any questions in that poll to show on the right. Questions
        and polls can be edited by clicking on the edit icon or deleted by
        clicking on the X icon. While in editing mode, any changes you make are
        not saved untill you hit the save button, you're also given the option
        to discard your changes in the top right.
        <div className="subtitle">Questions</div>
        There are there separate types of question: Multiple choice, Open Ended,
        and Choose Student. For multiple choice, you're given on option to set
        the number of selections that a student can make. For choose student,
        you need to select the class that students will be choosing from (there
        is no support from choosing one student from two or more different
        classes)
        <br />
        <br />
        Questions may also be re-ordered via drag and drop, just grab onto the
        left side of the card.
      </Card>
      <Card title="Student View">
        The student view is a page that shows you the student home page for each
        class. You can change the class that you're viewing with the bar up top.
        Currently you aren't able to see the polls how student see them, but I'm
        planning on changing that. As an admin you aren't able to vote.
      </Card>
      <Card title="Results">
        The results page gives you a list of the polls and their status. "Open"
        means the poll is still open to students and they are still able to
        cast/change their votes. "Closed" means the poll has never been open to
        students. "Final" means the poll was open, and is now closed, students
        are no longer able to cast new votes or change old ones.
        <br />
        <br />
        Clicking on the results button will take you to a page with each
        question in order with answers in order of most votes. Open ended
        responses are just all listed out in a scrolling container.
      </Card>
      <Card title="Tips">
        <ul>
          <li>
            While adding options for MC questions, you can just hit enter to add
            the option.
          </li>
          <li>
            DO NOT delete the Superlatives Poll, just change the year that can
            vote in it and change all the question years.
          </li>
          <li>
            Deleting a poll also deletes all of it's questions. There is no way
            to get them back.
          </li>
          <li>
            Try and keep the poll titles shorter. If they're too long, they look
            bad on the cards. You can check how they look in the student view.
          </li>
        </ul>
      </Card>
    </div>
  );
}
