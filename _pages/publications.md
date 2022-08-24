---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

## Under preparation

1. <b>AsymQLoss: Controlling overestimation bias in off-policy RL algorithms </b><br/>
  <u><i>collaborators</i></u>: Qinsheng Zhang, Prof. Yongxin Chen, Prof. Sehoon Ha <br/>
  <u><i>contributions</i></u>: design and experimentation of the approach on a wide range of benchmarks

    (<i>plan to submit to ICLR 2023; developed as a part of CS8803-RLR Spring 2022 - awarded best paper in class</i>)

2. <b>Impact of communication and robot skill level on human-robot collaboration for tasks requiring agile behaviors</b> <br/>
    <u><i>collaborators</i></u>: Kin Man Lee, Zulfiqar Zaidi, Prof. Matthew Gombolay <br/>
    <u><i>contributions</i></u>: design for human study and implemented robot controllers for Ping-Pong strokes<br/>

    (<i>plan to submit to HRI 2023; developed during Summer 2022 as GRA</i>)

3. <b>Robotic system for playing Wheelchair Tennis</b><br/>
   <u><i>collaborators</i></u>: CORE Robotics WTR Team, Prof. Matthew Gombolay <br/>
   <u><i>contributions</i></u>: developing swing controllers learned from successful demonstrations of engineered catapult swings <br/>

   (<i>plan to submit to RA-L; worked on during Summer & Fall 2022 as GRA</i>)


{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
