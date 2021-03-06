import React from "react";
import PageHead from "../PageHead";

export default function DevInfo() {
  return (
    <div className="page-container">
      <PageHead title="Dev Info" />
      <section>
        My name is Ben Lubas, I'm currently a senior in the class of 2020. This
        site was developed as a part of an independent study called Advanced Web
        Development. I developed the site using a MERN stack. That's{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/MongoDB"
        >
          MongoDB
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Express.js"
        >
          Express
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/React_(web_framework)"
        >
          React
        </a>
        , and{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Node.js"
        >
          Node
        </a>
        .
        <br />
        <br />
        You can read up on those things on their respective Wiki pages, but the
        important thing to note is that we don't learn any of it in the CS
        curriculum at PW (at least not now, idk how long this site will be used
        for). I taught myself all of those things. YouTube was a major resource,
        but I also just read a lot of documentation. Luckily, most of the
        documentation for the things I used was very dev friendly (except React,
        their documentation sucks).
        <br />
        <br />
        All of the code for all of this is on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/benlubas/PW_Poll"
        >
          GitHub
        </a>{" "}
        if you ever want to check it out. All the CSS is custom, although the
        form inputs are largely inspired by Material UI.
        <br />
        All in all, it was a great learning experience. I would highly recomend
        doing something like this if you have an interest in web development and
        you're out of 'core' CS classes to take.
        <br />
        <br />
        There is something to be said for learning how to do something on your
        own, with only the internet to help you (I say only, but the internet is
        a massive resource). If you choose to follow in my footsteps I have a
        few recomendations. These might get outdated as time passes but the
        principles remain the same:
        <ol>
          <li>
            Use a versioning software and develop locally. Use an IDE like VS
            Code (what I use) or maybe Theia will become popular. Either way,
            locally is the way to go, don't use AWS or whatever Engel uses with
            his classes. As far as versioning software goes, learn Git, it's not
            hard, and I used GitHub, but I'm sure GitLab would have worked fine,
            GitHub is just more common.
          </li>
          <li>
            Configure your editor with ES Lint and/or Prettier for auto
            formatting and linting. If you don't know what that means, look it
            up, find a guide on Medium.com or something and follow it.
          </li>
          <li>
            Plan your stuff out. I didn't do this very well and I ended up
            re-writting soooooo much code b/c of it. This was partially b/c I
            didn't know React that well, but a lot of it had to do with a lack
            of planning.
          </li>
          <li>
            If you're choosing between React, Angular and Vue, I'll save you
            some time, pick the one with the coolest name, they all do the same
            thing, just in different ways. They're all very capable.
          </li>
        </ol>
        Deploying something like this is not as straight forward as a PHP
        project, but it's not dificult by any means. It's very easy to find
        guides on the internet. Firstly, the Node server, I followed{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/"
        >
          this
        </a>
        . Maybe slightly daunting, but it's not bad. Secondly, the React app. I
        followed{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dev.to/crishanks/deploy-host-your-react-app-with-cpanel-in-under-5-minutes-4mf6"
        >
          this
        </a>
        . Using a different web framework would mean you need to google
        "deploying Vue app on cPanel" or something.
        <br />
        <br />
        Thanks for reading, if you're doing something like this and have
        questions feel free to bother me in college, benmlubas@gmail.com.
      </section>
    </div>
  );
}
