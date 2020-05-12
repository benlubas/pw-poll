import React from "react";

import { useParams, Link } from "react-router-dom";
import { titlecase } from "./../../../pipes";
import NotFound from "./../notFound/NotFound";
import PageHead from "../../PageHead";

export default function InfoPage() {
  const { label } = useParams();
  const existing = [
    "polls",
    "student view",
    "tips",
    "control panel",
    "results",
  ];
  return (
    <div className={existing.includes(label) ? "page-container" : ""}>
      {existing.includes(label) ? <PageHead title={titlecase(label)} /> : null}
      <section>
        {label === "polls" ? (
          <p>
            The Polls page is the place to go to create and edit polls. You can
            select a poll on the left by clicking on it. This will cause any
            questions in that poll to show on the right. Questions and polls can
            be edited by clicking on the <i className="fas fa-edit"></i> or
            deleted by clicking on the <i className="fas fa-times-circle"></i>.
            While in editing mode, any changes you make are not saved until you
            hit the save button. You are also given the option to discard your
            changes in the top right.
            <br />
            <br />
            There are three different types of question: Multiple choice, Open
            Ended, and Choose Student. For multiple choice and choose student,
            you're given an option to set the number of answers a student can
            choose. For choose student, you need to select the class that
            students will be choosing from.
            <br />
            <br />
            Questions may also be re-ordered via drag and drop, just grab onto
            the left side of the card and move them up or down.
          </p>
        ) : label === "student view" ? (
          <p>
            Student view is a page that shows you the student home page for each
            class. You can change the class that you're viewing with the bar up
            top. You can check to make sure polls are availible to students this
            way. It's also a way to see what your polls look like.
          </p>
        ) : label === "results" ? (
          <p>
            The results page gives you a list of the polls and their status.
            "Open" means the poll is still open to students and they are still
            able to cast/change their votes. "Closed" means the poll has never
            been open to students (and there will be no votes). "Final" means
            students have had an opportunity to vote but can no longer
            cast/change votes.
            <br />
            <br />
            Clicking on the results button will take you to a page with each
            question in the order they were asked in and answers in order of
            most votes. Open ended responses are just all listed out in a
            scrolling container.
          </p>
        ) : label === "tips" ? (
          <div>
            While adding options for MC questions, you can just hit enter to add
            the option.
            <br />
            <br />
            Deleting a poll also deletes all of it's questions. There is no way
            to get them back.
            <br />
            <br />
            Try and keep the poll titles shorter. If they're too long, they look
            bad on the cards. You can check how they look in the{" "}
            <Link
              to={"/studentView/" + new Date().getFullYear()}
              className="link"
            >
              student view
            </Link>
            .
          </div>
        ) : label === "control panel" ? (
          <p>
            The control panel is where you do administrative things. You can
            add/edit admins on this page. Read more about that on that page.
            <br />
            <br />
            This is also the page that lets you push polls forward. "Pushing a
            poll forward" is like updating it from one year to the next. It
            changes who can vote in the poll and it changes questions of type
            choose student, specifically the class that serves as the options.
            <br />
            <br />
            Cloning polls is also possible via the Control Panel just select the
            poll to clone, give it a new name and hit the button. Make sure the
            poll cloned correctly on the polls page.
            <br />
            <br />
            After conducting a poll and tallying the results you can clear the
            votes via this page. Again, select the poll hit the button. BE
            ABSOLUTELY SURE that you don't need those votes any more, there is
            no way to recover them. If you need to keep the votes for your
            records or for whatever reason export them to a CSV first.
            <br />
            <br />
            Exporting to CSV creates a file that just dumps all of the votes on
            each question.
          </p>
        ) : (
          <NotFound />
        )}
      </section>
    </div>
  );
}
